import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verify } from 'jsonwebtoken'

async function verifyAdmin(token?: string) {
  if (!token) return null

  try {
    const decoded = verify(token, process.env.JWT_SECRET!) as { 
      userId: string 
      role?: string 
    }
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    })

    if (!user || !['ADMIN', 'SUPER_ADMIN'].includes(user.adminRole)) {
      return null
    }

    return user
  } catch {
    return null
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('resumint_session')?.value
    const admin = await verifyAdmin(token)

    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const feedback = await prisma.feedback.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(feedback)
  } catch (error) {
    console.error('Feedback fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch feedback' },
      { status: 500 }
    )
  }
}
