// Cashfree Payment Integration (Simplified)
import { prisma } from './prisma'

const CASHFREE_BASE_URL = process.env.CASHFREE_MODE === 'production'
  ? 'https://api.cashfree.com/pg'
  : 'https://sandbox.cashfree.com/pg'

const headers = {
  'x-client-id': process.env.CASHFREE_APP_ID!,
  'x-client-secret': process.env.CASHFREE_SECRET_KEY!,
  'x-api-version': '2023-08-01',
  'Content-Type': 'application/json',
}

export interface PaymentOrderRequest {
  orderId: string
  orderAmount: number
  orderCurrency: string
  customerDetails: {
    customerId: string
    customerEmail: string
    customerPhone: string
    customerName: string
  }
  orderMeta?: {
    returnUrl: string
    notifyUrl?: string
  }
}

export interface SubscriptionPlan {
  planId: string
  planName: string
  amount: number
  interval: 'MONTHLY' | 'YEARLY'
  credits: number
}

/**
 * Create a payment order
 */
export async function createPaymentOrder(request: PaymentOrderRequest) {
  try {
    const response = await fetch(`${CASHFREE_BASE_URL}/orders`, {
      method: 'POST',
      headers,
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`Cashfree error: ${error.message}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Payment order creation failed:', error)
    throw error
  }
}

/**
 * Verify payment status
 */
export async function verifyPayment(orderId: string) {
  try {
    const response = await fetch(`${CASHFREE_BASE_URL}/orders/${orderId}`, {
      method: 'GET',
      headers,
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`Cashfree error: ${error.message}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Payment verification failed:', error)
    throw error
  }
}

/**
 * Process credit purchase
 */
export async function processCreditPurchase(
  userId: string,
  credits: number,
  amount: number,
  orderId: string
) {
  try {
    await prisma.creditTransaction.create({
      data: {
        userId,
        amount: credits,
        type: 'PURCHASE',
        description: `Purchased ${credits} credits`,
        orderId,
      },
    })

    await prisma.user.update({
      where: { id: userId },
      data: {
        credits: {
          increment: credits,
        },
      },
    })

    return true
  } catch (error) {
    console.error('Credit purchase processing failed:', error)
    throw error
  }
}
