import bcrypt from 'bcryptjs'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { prisma } from './prisma'
import zxcvbn from 'zxcvbn'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET)
const SESSION_COOKIE = process.env.SESSION_COOKIE_NAME || 'resumint_session'
const SESSION_MAX_AGE = parseInt(process.env.SESSION_MAX_AGE || '604800') // 7 days

export interface PasswordStrength {
  score: number // 0-4
  feedback: string[]
  isStrong: boolean
}

/**
 * Hash password
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

/**
 * Verify password
 */
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

/**
 * Check password strength
 */
export function checkPasswordStrength(password: string): PasswordStrength {
  const result = zxcvbn(password)
  
  const feedback: string[] = []
  
  if (password.length < 8) {
    feedback.push('Password must be at least 8 characters long')
  }
  if (!/[A-Z]/.test(password)) {
    feedback.push('Include at least one uppercase letter')
  }
  if (!/[a-z]/.test(password)) {
    feedback.push('Include at least one lowercase letter')
  }
  if (!/[0-9]/.test(password)) {
    feedback.push('Include at least one number')
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    feedback.push('Include at least one special character')
  }
  
  if (result.feedback.suggestions) {
    feedback.push(...result.feedback.suggestions)
  }
  
  return {
    score: result.score,
    feedback,
    isStrong: result.score >= 3 && feedback.length === 0,
  }
}

/**
 * Generate JWT token
 */
export async function generateToken(userId: string): Promise<string> {
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(process.env.JWT_EXPIRES_IN || '7d')
    .sign(JWT_SECRET)
  
  return token
}

/**
 * Verify JWT token
 */
export async function verifyToken(token: string): Promise<{ userId: string } | null> {
  try {
    const verified = await jwtVerify(token, JWT_SECRET)
    return verified.payload as { userId: string }
  } catch (error) {
    return null
  }
}

/**
 * Create session
 */
export async function createSession(userId: string, ipAddress?: string, userAgent?: string) {
  const token = await generateToken(userId)
  const expiresAt = new Date(Date.now() + SESSION_MAX_AGE * 1000)
  
  // Store session in database
  await prisma.session.create({
    data: {
      userId,
      token,
      expiresAt,
      ipAddress,
      userAgent,
    },
  })
  
  // Set cookie
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_MAX_AGE,
    path: '/',
  })
  
  // Update last login
  await prisma.user.update({
    where: { id: userId },
    data: { lastLoginAt: new Date() },
  })
  
  return token
}

/**
 * Get current session
 */
export async function getCurrentSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value
  
  if (!token) return null
  
  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: true },
  })
  
  if (!session || session.expiresAt < new Date()) {
    return null
  }
  
  return session
}

/**
 * Get current user
 */
export async function getCurrentUser() {
  const session = await getCurrentSession()
  return session?.user || null
}

/**
 * Destroy session
 */
export async function destroySession() {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value
  
  if (token) {
    await prisma.session.deleteMany({
      where: { token },
    })
  }
  
  cookieStore.delete(SESSION_COOKIE)
}

/**
 * Generate random token for email verification, password reset
 */
export function generateRandomToken(): string {
  return crypto.randomUUID() + '-' + Date.now()
}

/**
 * Check if user is admin
 */
export async function isAdmin(userId: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { adminRole: true },
  })
  
  return user?.adminRole !== 'NONE' || false
}

/**
 * Check if user has admin role
 */
export async function hasAdminRole(
  userId: string,
  minRole: 'MODERATOR' | 'ADMIN' | 'SUPER_ADMIN' = 'MODERATOR'
): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { adminRole: true },
  })
  
  if (!user) return false
  
  const roleHierarchy = {
    NONE: 0,
    MODERATOR: 1,
    ADMIN: 2,
    SUPER_ADMIN: 3,
  }
  
  return roleHierarchy[user.adminRole as keyof typeof roleHierarchy] >= roleHierarchy[minRole]
}

/**
 * Initialize admin user (resumint.info@gmail.com)
 */
export async function initializeAdminUser() {
  const adminEmail = process.env.ADMIN_EMAIL
  if (!adminEmail) return
  
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  })
  
  if (!existingAdmin) {
    console.log('ℹ️ Admin user not found. Please create account first.')
  } else if (existingAdmin.adminRole === 'NONE') {
    // Make admin
    await prisma.user.update({
      where: { email: adminEmail },
      data: {
        adminRole: 'SUPER_ADMIN',
        plan: 'ENTERPRISE',
        credits: 999999,
        emailVerified: true,
      },
    })
    console.log('✅ Admin privileges granted to:', adminEmail)
  }
}
