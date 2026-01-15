import nodemailer from 'nodemailer'
import { 
  generateSubscriptionEmail,
  generateApiPurchaseEmail,
  generateCreditsPurchaseEmail
} from '@/lib/emails/purchase-confirmation'

// Create nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

interface SendPurchaseEmailParams {
  to: string
  userName: string
  purchaseType: 'subscription' | 'api' | 'credits'
  planName: string
  amount: number
  orderId: string
  credits?: number
  features?: string[]
  billingPeriod?: 'monthly' | 'yearly'
}

export async function sendPurchaseConfirmationEmail(params: SendPurchaseEmailParams) {
  try {
    const {
      to,
      userName,
      purchaseType,
      planName,
      amount,
      orderId,
      credits,
      features,
      billingPeriod
    } = params

    const fromEmail = process.env.SMTP_FROM_EMAIL || 'noreply@resumint.com'
    const appName = process.env.NEXT_PUBLIC_APP_NAME || 'ResumINT'

    let subject = ''
    let html = ''

    const emailData = {
      userName,
      userEmail: to,
      planName,
      amount,
      orderId,
      credits,
      features: features || [],
      billingPeriod
    }

    switch (purchaseType) {
      case 'subscription':
        subject = `🎉 Welcome to ${planName} - ${appName}`
        html = generateSubscriptionEmail({ ...emailData, features: features! })
        break
      case 'api':
        subject = `⚡ API Access Activated - ${planName}`
        html = generateApiPurchaseEmail({ ...emailData, features: features! })
        break
      case 'credits':
        subject = `✨ ${credits} Credits Added to Your Account`
        html = generateCreditsPurchaseEmail({ ...emailData, credits: credits! })
        break
    }

    const result = await transporter.sendMail({
      from: `${appName} <${fromEmail}>`,
      to,
      subject,
      html
    })

    console.log('✅ Purchase confirmation email sent:', result.messageId)
    return { data: { id: result.messageId } }
  } catch (error) {
    console.error('❌ Error sending purchase confirmation email:', error)
    throw error
  }
}

export async function sendWelcomeEmail(to: string, userName: string, plan: string) {
  const features = plan === 'PRO' 
    ? [
        'Unlimited AI-powered resume generation',
        'All premium templates',
        'Export to PDF & DOCX',
        'LinkedIn profile import',
        'Priority email support',
        'Advanced portfolio builder'
      ]
    : plan === 'ENTERPRISE'
    ? [
        'Everything in Pro',
        'API access',
        'White-label solution',
        'Custom branding',
        'Dedicated support',
        'Custom integrations',
        'Team collaboration',
        'Analytics dashboard'
      ]
    : []

  return sendPurchaseConfirmationEmail({
    to,
    userName,
    purchaseType: 'subscription',
    planName: plan,
    amount: 0,
    orderId: 'WELCOME',
    features,
    billingPeriod: 'monthly'
  })
}
