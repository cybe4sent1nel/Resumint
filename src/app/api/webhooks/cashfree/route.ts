import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { prisma } from '@/lib/prisma'
import { sendPurchaseConfirmationEmail } from '@/lib/email-service'

// Verify Cashfree webhook signature
function verifyCashfreeSignature(
  payload: string,
  signature: string,
  timestamp: string
): boolean {
  const secretKey = process.env.CASHFREE_SECRET_KEY!
  const signatureData = timestamp + payload
  const expectedSignature = crypto
    .createHmac('sha256', secretKey)
    .update(signatureData)
    .digest('base64')

  return expectedSignature === signature
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const signature = req.headers.get('x-cashfree-signature') || ''
    const timestamp = req.headers.get('x-cashfree-timestamp') || ''

    // Verify signature
    if (!verifyCashfreeSignature(body, signature, timestamp)) {
      console.error('Invalid Cashfree signature')
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const event = JSON.parse(body)

    console.log('Cashfree webhook event:', event.type)

    switch (event.type) {
      case 'PAYMENT_SUCCESS_WEBHOOK':
        await handlePaymentSuccess(event.data)
        break
      case 'PAYMENT_FAILED_WEBHOOK':
        await handlePaymentFailed(event.data)
        break
      case 'PAYMENT_USER_DROPPED_WEBHOOK':
        await handlePaymentDropped(event.data)
        break
      default:
        console.log('Unhandled webhook event:', event.type)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Error processing Cashfree webhook:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

async function handlePaymentSuccess(data: any) {
  const {
    order_id,
    order_amount,
    order_currency,
    payment_time,
    customer_email,
    customer_phone,
    order_meta
  } = data

  try {
    // Parse order metadata
    const metadata = order_meta ? JSON.parse(order_meta) : {}
    const userId = metadata.userId
    const purchaseType = metadata.type // 'subscription', 'api', 'credits'
    const planId = metadata.planId

    if (!userId) {
      console.error('User ID not found in order metadata')
      return
    }

    // Get user details
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { name: true, email: true, credits: true, plan: true }
    })

    if (!user) {
      console.error('User not found:', userId)
      return
    }

    // Process based on purchase type
    let emailParams: any = {
      to: user.email,
      userName: user.name || 'Customer',
      amount: parseFloat(order_amount),
      orderId: order_id
    }

    if (purchaseType === 'subscription') {
      // Update user subscription
      const pricing = await prisma.subscriptionPricing.findUnique({
        where: { id: planId }
      })

      if (pricing) {
        await prisma.user.update({
          where: { id: userId },
          data: {
            plan: pricing.plan,
            credits: { increment: pricing.credits }
          }
        })

        emailParams = {
          ...emailParams,
          purchaseType: 'subscription',
          planName: pricing.name,
          features: pricing.features as string[],
          billingPeriod: metadata.billingPeriod || 'monthly'
        }

        // Send email
        await sendPurchaseConfirmationEmail(emailParams)
      }
    } else if (purchaseType === 'api') {
      // Handle API purchase
      const pricing = await prisma.apiPricing.findUnique({
        where: { id: planId }
      })

      if (pricing) {
        // TODO: Create API key for user
        emailParams = {
          ...emailParams,
          purchaseType: 'api',
          planName: pricing.name,
          features: pricing.features as string[]
        }

        // Send email
        await sendPurchaseConfirmationEmail(emailParams)
      }
    } else if (purchaseType === 'credits') {
      // Add credits to user account
      const creditsToAdd = metadata.credits || 100

      await prisma.user.update({
        where: { id: userId },
        data: {
          credits: { increment: creditsToAdd }
        }
      })

      emailParams = {
        ...emailParams,
        purchaseType: 'credits',
        planName: `${creditsToAdd} Credits`,
        credits: creditsToAdd
      }

      // Send email
      await sendPurchaseConfirmationEmail(emailParams)
    }

    // Create transaction record
    await prisma.creditTransaction.create({
      data: {
        userId,
        amount: purchaseType === 'credits' ? metadata.credits : 0,
        type: 'PURCHASE',
        description: `${purchaseType === 'subscription' ? 'Subscription' : purchaseType === 'api' ? 'API' : 'Credits'} purchase via Cashfree`,
        orderId: order_id
      }
    })

    console.log('✅ Payment processed successfully for order:', order_id)
  } catch (error) {
    console.error('Error handling payment success:', error)
    throw error
  }
}

async function handlePaymentFailed(data: any) {
  console.log('Payment failed:', data.order_id)
  // TODO: Notify user of failed payment
}

async function handlePaymentDropped(data: any) {
  console.log('Payment dropped by user:', data.order_id)
  // TODO: Send reminder email
}
