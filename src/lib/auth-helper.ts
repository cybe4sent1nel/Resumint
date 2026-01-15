import { cookies } from 'next/headers'
import { verify } from 'jsonwebtoken'
import { prisma } from './prisma'

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('resumint_session')?.value

    if (!token) {
      return null
    }

    const decoded = verify(token, process.env.JWT_SECRET!) as { userId: string }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true,
        plan: true,
        credits: true,
        emailVerified: true,
        adminRole: true,
      },
    })

    return user
  } catch {
    return null
  }
}

export async function isAdmin(user?: any) {
  if (!user) {
    user = await getCurrentUser()
  }

  if (!user) return false

  return ['ADMIN', 'SUPER_ADMIN'].includes(user.adminRole)
}

export async function isSuperAdmin(user?: any) {
  if (!user) {
    user = await getCurrentUser()
  }

  if (!user) return false

  return user.adminRole === 'SUPER_ADMIN'
}
