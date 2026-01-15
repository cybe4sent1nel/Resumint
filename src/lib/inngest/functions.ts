import { Inngest } from 'inngest'

export const inngest = new Inngest({
  id: 'resumint',
  eventKey: process.env.INNGEST_EVENT_KEY,
})

/**
 * Send email function (scheduled via Inngest)
 */
export const sendEmailFunction = inngest.createFunction(
  { id: 'send-email' },
  { event: 'email/send' },
  async ({ event, step }) => {
    const { to, subject, template, variables } = event.data
    
    const { sendEmail } = await import('@/lib/email')
    
    await step.run('send-email', async () => {
      return await sendEmail({ to, subject, template, variables })
    })
  }
)

/**
 * Send scheduled email
 */
export const sendScheduledEmailFunction = inngest.createFunction(
  { id: 'send-scheduled-email' },
  { event: 'email/scheduled' },
  async ({ event, step }) => {
    const { to, subject, template, variables, sendAt } = event.data
    
    // Wait until scheduled time
    await step.sleepUntil('wait-until-send-time', new Date(sendAt))
    
    const { sendEmail } = await import('@/lib/email')
    
    await step.run('send-scheduled-email', async () => {
      return await sendEmail({ to, subject, template, variables })
    })
  }
)

/**
 * Credit low warning cron (daily)
 */
export const checkLowCreditsCron = inngest.createFunction(
  { id: 'check-low-credits' },
  { cron: '0 9 * * *' }, // Every day at 9 AM
  async ({ step }) => {
    await step.run('check-and-notify-low-credits', async () => {
      const { prisma } = await import('@/lib/prisma')
      const { sendLowCreditsEmail } = await import('@/lib/email')
      
      // Find users with low credits (< 5) who haven't been notified recently
      const usersWithLowCredits = await prisma.user.findMany({
        where: {
          credits: { lt: 5 },
          plan: 'FREE',
          emailVerified: true,
        },
      })
      
      for (const user of usersWithLowCredits) {
        if (user.email && user.name) {
          await sendLowCreditsEmail(user.email, user.name, user.credits)
        }
      }
      
      return { notified: usersWithLowCredits.length }
    })
  }
)

/**
 * Cleanup expired sessions cron (daily)
 */
export const cleanupExpiredSessionsCron = inngest.createFunction(
  { id: 'cleanup-expired-sessions' },
  { cron: '0 0 * * *' }, // Every day at midnight
  async ({ step }) => {
    await step.run('delete-expired-sessions', async () => {
      const { prisma } = await import('@/lib/prisma')
      
      const deleted = await prisma.session.deleteMany({
        where: {
          expiresAt: { lt: new Date() },
        },
      })
      
      return { deleted: deleted.count }
    })
  }
)

/**
 * Cleanup expired tokens cron (daily)
 */
export const cleanupExpiredTokensCron = inngest.createFunction(
  { id: 'cleanup-expired-tokens' },
  { cron: '0 1 * * *' }, // Every day at 1 AM
  async ({ step }) => {
    await step.run('delete-expired-tokens', async () => {
      const { prisma } = await import('@/lib/prisma')
      
      const now = new Date()
      
      const users = await prisma.user.updateMany({
        where: {
          OR: [
            { resetTokenExpiry: { lt: now } },
            { resetTokenExpiry: { lt: now } },
          ],
        },
        data: {
          verificationToken: null,
          resetToken: null,
          resetTokenExpiry: null,
        },
      })
      
      return { updated: users.count }
    })
  }
)

// Export all functions
export const inngestFunctions = [
  sendEmailFunction,
  sendScheduledEmailFunction,
  checkLowCreditsCron,
  cleanupExpiredSessionsCron,
  cleanupExpiredTokensCron,
]
