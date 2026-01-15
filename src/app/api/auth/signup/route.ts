import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword, generateRandomToken, checkPasswordStrength } from '@/lib/auth'
import { sendVerificationEmail } from '@/lib/email'

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json()

    // Validate input
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Check password strength
    const passwordCheck = checkPasswordStrength(password)
    if (!passwordCheck.isStrong) {
      return NextResponse.json(
        { 
          error: 'Password is too weak', 
          feedback: passwordCheck.feedback,
          score: passwordCheck.score 
        },
        { status: 400 }
      )
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Generate verification token
    const verificationToken = generateRandomToken()
    const tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    // Check if admin email
    const isAdminEmail = email.toLowerCase() === process.env.ADMIN_EMAIL?.toLowerCase()

    // Create user
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        name,
        verificationToken,
        resetTokenExpiry: tokenExpiry,
        emailVerified: isAdminEmail, // Auto-verify admin
        adminRole: isAdminEmail ? 'SUPER_ADMIN' : 'NONE',
        plan: isAdminEmail ? 'ENTERPRISE' : 'FREE',
        credits: isAdminEmail ? 999999 : 50,
      },
      select: {
        id: true,
        email: true,
        name: true,
        emailVerified: true,
      },
    })

    // Send verification email (skip for admin)
    if (!isAdminEmail) {
      await sendVerificationEmail(email, name, verificationToken)
    }

    return NextResponse.json({
      success: true,
      user,
      message: isAdminEmail 
        ? 'Admin account created successfully' 
        : 'Account created! Please check your email to verify.',
    })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Failed to create account' },
      { status: 500 }
    )
  }
}
