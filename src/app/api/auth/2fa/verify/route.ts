import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { TOTP } from 'otpauth'

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json()

    if (!email || !code) {
      return NextResponse.json({ error: 'Email and code required' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    })

    if (!user || !user.twoFAEnabled || !user.twoFASecret) {
      return NextResponse.json({ error: 'Invalid 2FA setup' }, { status: 400 })
    }

    // Verify the code
    const totp = new TOTP({
      issuer: 'Resumint',
      algorithm: 'SHA1',
      digits: 6,
      period: 30,
      secret: user.twoFASecret,
    })

    const isValid = totp.validate({ token: code, window: 1 })

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid verification code' }, { status: 400 })
    }

    return NextResponse.json({ success: true, userId: user.id })
  } catch (error) {
    console.error('2FA verify error:', error)
    return NextResponse.json({ error: 'Failed to verify 2FA' }, { status: 500 })
  }
}
