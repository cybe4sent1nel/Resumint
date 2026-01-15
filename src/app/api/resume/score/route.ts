import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { scoreResume } from '@/lib/ai/openrouter'
import { hasEnoughCredits, deductCredits } from '@/lib/credits'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check credits (cost: 1 credit)
    const hasCredits = await hasEnoughCredits(userId, 1)
    if (!hasCredits) {
      return NextResponse.json(
        { error: 'Insufficient credits' },
        { status: 402 }
      )
    }

    const { resumeId, resumeData } = await req.json()
    
    if (!resumeData) {
      return NextResponse.json(
        { error: 'Resume data is required' },
        { status: 400 }
      )
    }

    // Score resume using AI
    const scoreResult = await scoreResume(resumeData)

    // Update resume with score
    if (resumeId) {
      await prisma.resume.update({
        where: { id: resumeId },
        data: {
          data: {
            ...resumeData,
            aiScore: scoreResult.totalScore,
          },
        },
      })
    }

    // Deduct credits
    await deductCredits({
      userId,
      amount: 1,
      description: 'Resume scoring',
      metadata: { 
        resumeId,
        action: 'ai_score',
        score: scoreResult.totalScore,
      },
    })

    return NextResponse.json({ data: scoreResult })
  } catch (error) {
    console.error('Resume score error:', error)
    return NextResponse.json(
      { error: 'Failed to score resume' },
      { status: 500 }
    )
  }
}
