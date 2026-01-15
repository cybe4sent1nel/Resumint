import nodemailer from 'nodemailer'
import Handlebars from './handlebars'
import fs from 'fs'
import path from 'path'

// Create transporter
export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

// Verify connection
transporter.verify((error) => {
  if (error) {
    console.error('❌ Email transporter error:', error)
  } else {
    console.log('✅ Email server ready')
  }
})

// Email template types
export type EmailTemplate = 
  | 'welcome'
  | 'verification'
  | 'password-reset'
  | 'subscription-success'
  | 'subscription-cancelled'
  | 'credit-low'
  | 'resume-ready'
  | 'admin-notification'

interface EmailData {
  to: string
  subject: string
  template: EmailTemplate
  variables: Record<string, any>
}

/**
 * Send email using template
 */
export async function sendEmail({
  to,
  subject,
  template,
  variables,
}: EmailData) {
  try {
    // Load template
    const templatePath = path.join(
      process.cwd(),
      'src',
      'lib',
      'email',
      'templates',
      `${template}.hbs`
    )
    const templateSource = fs.readFileSync(templatePath, 'utf-8')
    const compiledTemplate = Handlebars.compile(templateSource)
    
    // Compile with variables
    const html = compiledTemplate({
      ...variables,
      appName: 'Resumint',
      appUrl: process.env.NEXT_PUBLIC_APP_URL,
      currentYear: new Date().getFullYear(),
    })

    // Send email
    const info = await transporter.sendMail({
      from: `${process.env.SMTP_FROM_NAME || 'Resumint'} <${process.env.SMTP_FROM_EMAIL || 'noreply@resumint.com'}>`,
      to,
      subject,
      html,
    })

    console.log('✅ Email sent:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('❌ Email send error:', error)
    throw error
  }
}

/**
 * Send verification email
 */
export async function sendVerificationEmail(
  email: string,
  name: string,
  token: string
) {
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`
  
  return sendEmail({
    to: email,
    subject: 'Verify your Resumint account',
    template: 'verification',
    variables: {
      name,
      verificationUrl,
    },
  })
}

/**
 * Send welcome email
 */
export async function sendWelcomeEmail(email: string, name: string) {
  return sendEmail({
    to: email,
    subject: 'Welcome to Resumint! 🎉',
    template: 'welcome',
    variables: {
      name,
      dashboardUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
    },
  })
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(
  email: string,
  name: string,
  token: string
) {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`
  
  return sendEmail({
    to: email,
    subject: 'Reset your Resumint password',
    template: 'password-reset',
    variables: {
      name,
      resetUrl,
      expiryHours: 1,
    },
  })
}

/**
 * Send subscription success email
 */
export async function sendSubscriptionSuccessEmail(
  email: string,
  name: string,
  plan: string,
  credits: number
) {
  return sendEmail({
    to: email,
    subject: `Welcome to Resumint ${plan}! 🚀`,
    template: 'subscription-success',
    variables: {
      name,
      plan,
      credits,
      dashboardUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
    },
  })
}

/**
 * Send low credits warning
 */
export async function sendLowCreditsEmail(
  email: string,
  name: string,
  remainingCredits: number
) {
  return sendEmail({
    to: email,
    subject: 'Your Resumint credits are running low',
    template: 'credit-low',
    variables: {
      name,
      remainingCredits,
      upgradeUrl: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
    },
  })
}

/**
 * Send admin notification
 */
export async function sendAdminNotification(
  subject: string,
  message: string,
  data?: Record<string, any>
) {
  const adminEmail = process.env.ADMIN_EMAIL
  if (!adminEmail) return

  return sendEmail({
    to: adminEmail,
    subject: `[Admin] ${subject}`,
    template: 'admin-notification',
    variables: {
      subject,
      message,
      data,
      timestamp: new Date().toISOString(),
    },
  })
}
