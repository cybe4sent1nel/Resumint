import { NextResponse } from 'next/server'
import { getCurrentUser, hasAdminRole } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser()
    
    if (!user || user.adminRole === 'NONE') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Only SUPER_ADMIN can make others admin
    const canMakeAdmin = await hasAdminRole(user.id, 'SUPER_ADMIN')
    if (!canMakeAdmin) {
      return NextResponse.json(
        { error: 'Only super admins can grant admin privileges' },
        { status: 403 }
      )
    }

    const { userId, role } = await req.json()

    if (!userId || !role) {
      return NextResponse.json(
        { error: 'User ID and role are required' },
        { status: 400 }
      )
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        adminRole: role,
      },
      select: {
        id: true,
        name: true,
        email: true,
        adminRole: true,
      },
    })

    // Log admin action
    await prisma.adminAction.create({
      data: {
        userId: user.id,
        action: 'grant_admin',
        targetType: 'user',
        targetId: userId,
        metadata: {
          role,
          grantedBy: user.email,
        },
      },
    })

    return NextResponse.json({
      success: true,
      user: updatedUser,
    })
  } catch (error) {
    console.error('Grant admin error:', error)
    return NextResponse.json(
      { error: 'Failed to grant admin privileges' },
      { status: 500 }
    )
  }
}
