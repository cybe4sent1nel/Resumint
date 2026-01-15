import { prisma } from './prisma'

export interface CreditUsage {
  userId: string
  amount: number
  description: string
  metadata?: any
}

/**
 * Deduct credits from user account
 */
export async function useCredits(usage: CreditUsage): Promise<boolean> {
  const { userId, amount, description } = usage

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user || user.credits < amount) {
      return false
    }

    await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: { credits: { decrement: amount } },
      }),
      prisma.creditTransaction.create({
        data: {
          userId,
          amount: -amount,
          type: 'USAGE',
          description,
        },
      }),
    ])

    return true
  } catch (error) {
    console.error('Failed to use credits:', error)
    return false
  }
}

/**
 * Add credits to user account
 */
export async function addCredits(
  userId: string,
  amount: number,
  description: string,
  orderId?: string
): Promise<boolean> {
  try {
    await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: { credits: { increment: amount } },
      }),
      prisma.creditTransaction.create({
        data: {
          userId,
          amount,
          type: 'PURCHASE',
          description,
          orderId,
        },
      }),
    ])

    return true
  } catch (error) {
    console.error('Failed to add credits:', error)
    return false
  }
}

/**
 * Check if user has enough credits
 */
export async function hasEnoughCredits(userId: string, amount: number): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  })
  return (user?.credits || 0) >= amount
}

/**
 * Deduct credits (alias for useCredits)
 */
export async function deductCredits(usage: CreditUsage): Promise<boolean> {
  return useCredits(usage)
}

/**
 * Get user's credit balance
 */
export async function getCreditBalance(userId: string): Promise<number> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  })

  return user?.credits || 0
}

/**
 * Get credit transaction history
 */
export async function getCreditHistory(userId: string, limit = 10) {
  return prisma.creditTransaction.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: limit,
  })
}
