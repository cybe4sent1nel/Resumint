import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verify } from 'jsonwebtoken'
import { TOTP } from 'otpauth'

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('resumint_session')?.value
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const decoded = verify(token, process.env.JWT_SECRET!) as { userId: string }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Generate 2FA secret
    const totp = new TOTP({
      issuer: 'Resumint',
      label: user.email,
      algorithm: 'SHA1',
      digits: 6,
      period: 30,
    })

    const secret = totp.secret
    const qrCode = totp.toString()

    return NextResponse.json({
      secret,
      qrCode,
      manualEntryKey: secret.slice(0, 4) + ' ' + secret.slice(4, 8) + ' ' + secret.slice(8, 12) + ' ' + secret.slice(12),
    })
  } catch (error) {
    console.error('2FA setup error:', error)
    return NextResponse.json({ error: 'Failed to setup 2FA' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const token = request.cookies.get('resumint_session')?.value
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const decoded = verify(token, process.env.JWT_SECRET!) as { userId: string }
    const { secret, code } = await request.json()

    if (!secret || !code) {
      return NextResponse.json({ error: 'Missing secret or code' }, { status: 400 })
    }

    // Verify the code matches the secret
    const totp = new TOTP({
      issuer: 'Resumint',
      algorithm: 'SHA1',
      digits: 6,
      period: 30,
      secret,
    })

    const isValid = totp.validate({ code, window: 1 })

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid verification code' }, { status: 400 })
    }

    // Save secret to user
    await prisma.user.update({
      where: { id: decoded.userId },
      data: {
        twoFASecret: secret,
        twoFAEnabled: true,
      },
    })

    return NextResponse.json({ success: true, message: '2FA enabled successfully' })
  } catch (error) {
    console.error('2FA enable error:', error)
    return NextResponse.json({ error: 'Failed to enable 2FA' }, { status: 500 })
  }
}
