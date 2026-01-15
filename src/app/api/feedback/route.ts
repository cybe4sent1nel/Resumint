import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verify } from 'jsonwebtoken'

export async function POST(request: NextRequest) {
  try {
    // Get token from cookies
    const token = request.cookies.get('resumint_session')?.value
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const decoded = verify(token, process.env.JWT_SECRET!) as { userId: string }

    const { rating, comment } = await request.json()

    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Invalid rating' },
        { status: 400 }
      )
    }

    const feedback = await prisma.feedback.create({
      data: {
        userId: decoded.userId,
        rating,
        comment: comment || `${rating} star${rating !== 1 ? 's' : ''}`,
        isDisplayed: false,
      },
    })

    return NextResponse.json({ success: true, feedback }, { status: 201 })
  } catch (error) {
    console.error('Feedback submission error:', error)
    return NextResponse.json(
      { error: 'Failed to submit feedback' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const feedback = await prisma.feedback.findMany({
      where: { isDisplayed: true },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
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
