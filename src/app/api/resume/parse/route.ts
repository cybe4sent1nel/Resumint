import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { parseResumeFromText } from '@/lib/ai/openrouter'
import { hasEnoughCredits, deductCredits } from '@/lib/credits'

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

    const { pdfText } = await req.json()
    
    if (!pdfText) {
      return NextResponse.json(
        { error: 'PDF text is required' },
        { status: 400 }
      )
    }

    // Parse resume using AI
    const resumeData = await parseResumeFromText(pdfText)

    // Deduct credits
    await deductCredits({
      userId,
      amount: 1,
      description: 'Resume parsing',
      metadata: {
        action: 'resume_parse',
        textLength: pdfText.length,
      },
    })

    return NextResponse.json({ data: resumeData })
  } catch (error) {
    console.error('Resume parse error:', error)
    return NextResponse.json(
      { error: 'Failed to parse resume' },
      { status: 500 }
    )
  }
}
