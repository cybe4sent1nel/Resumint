import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser, hasAdminRole } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    
    if (!user || !(await hasAdminRole(user.id))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const emails = await prisma.emailQueue.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
    })

    return NextResponse.json({ emails })
  } catch (error) {
    console.error('Error fetching emails:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
