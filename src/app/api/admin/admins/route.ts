import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser, hasAdminRole } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    
    if (!user || !hasAdminRole(user)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const admins = await prisma.user.findMany({
      where: {
        adminRole: {
          not: 'NONE'
        }
      },
      select: {
        id: true,
        name: true,
        email: true,
        adminRole: true,
        emailVerified: true,
        createdAt: true,
        lastLoginAt: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ admins })
  } catch (error) {
    console.error('Error fetching admin users:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
