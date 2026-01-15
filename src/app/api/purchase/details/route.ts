import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const orderId = searchParams.get('orderId')

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID required' }, { status: 400 })
    }

    // Fetch transaction details
    const transaction = await prisma.creditTransaction.findFirst({
      where: { orderId },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            plan: true
          }
        }
      }
    })

    if (!transaction) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    // Verify the transaction belongs to the current user
    if (transaction.userId !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    return NextResponse.json({
      orderId: transaction.orderId,
      amount: transaction.amount,
      type: transaction.type,
      description: transaction.description,
      createdAt: transaction.createdAt,
      user: transaction.user
    })
  } catch (error) {
    console.error('Error fetching purchase details:', error)
    return NextResponse.json(
      { error: 'Failed to fetch purchase details' },
      { status: 500 }
    )
  }
}
