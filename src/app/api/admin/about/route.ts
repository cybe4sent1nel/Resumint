import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser, hasAdminRole } from '@/lib/auth'

export async function GET() {
  try {
    const user = await getCurrentUser()
    if (!user || !(await hasAdminRole(user.id, 'ADMIN'))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const content = await prisma.aboutContent.findFirst({
      orderBy: { updatedAt: 'desc' }
    })

    return NextResponse.json({ content })
  } catch (error) {
    console.error('Failed to load about content:', error)
    return NextResponse.json({ error: 'Failed to load content' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user || !(await hasAdminRole(user.id, 'ADMIN'))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { vision, howItWorks, features, faqs, developer } = body

    const content = await prisma.aboutContent.create({
      data: {
        vision,
        howItWorks,
        features,
        faqs,
        developer,
        updatedBy: user.id
      }
    })

    // Log admin action
    await prisma.adminAction.create({
      data: {
        userId: user.id,
        action: 'UPDATE_ABOUT_PAGE',
        targetType: 'AboutContent',
        targetId: content.id
      }
    })

    return NextResponse.json({ success: true, content })
  } catch (error) {
    console.error('Failed to update about content:', error)
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 })
  }
}
