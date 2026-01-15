import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser, hasAdminRole } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    
    if (!user || !(await hasAdminRole(user.id))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const portfolios = await prisma.portfolio.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        isPublic: true,
        aiGenerated: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            name: true,
            email: true,
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 100,
    })

    return NextResponse.json({ portfolios })
  } catch (error) {
    console.error('Error fetching portfolios:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
