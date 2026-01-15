import { NextRequest, NextResponse } from 'next/server'
import { scrapeLinkedInProfile } from '@/lib/linkedin-puppeteer'

/**
 * ⚠️ WARNING: LinkedIn Scraping Endpoint
 * 
 * This endpoint uses Puppeteer to automate LinkedIn login and scraping.
 * 
 * LEGAL & SECURITY WARNING:
 * - Violates LinkedIn's Terms of Service
 * - LinkedIn account WILL be detected and banned
 * - Violates CFAA in some jurisdictions
 * - Use dummy account only
 * 
 * RISKS:
 * ✗ Account permanent ban
 * ✗ Legal action from LinkedIn
 * ✗ IP blocking
 * ✗ Detection and 2FA challenges
 * 
 * USE AT YOUR OWN RISK
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { profileUrl, email, password } = body

    // Validation
    if (!profileUrl || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: profileUrl, email, password'
        },
        { status: 400 }
      )
    }

    // Validate URL
    try {
      new URL(profileUrl)
      if (!profileUrl.includes('linkedin.com')) {
        throw new Error('Not a LinkedIn URL')
      }
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid LinkedIn URL'
        },
        { status: 400 }
      )
    }

    console.log(`[LinkedIn Scraper] Starting scrape for: ${profileUrl}`)
    console.log('[LinkedIn Scraper] ⚠️  This violates LinkedIn ToS - account will likely be banned')

    // Scrape the profile
    const profile = await scrapeLinkedInProfile(profileUrl, email, password)

    if (!profile || Object.keys(profile).length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Could not extract profile data',
          hint: 'LinkedIn may have blocked access or requires 2FA'
        },
        { status: 400 }
      )
    }

    console.log('[LinkedIn Scraper] ✅ Profile scraped successfully')

    return NextResponse.json({
      success: true,
      data: profile,
      warning: 'This data was scraped in violation of LinkedIn ToS. Use with caution.',
      message: 'Profile scraped successfully (⚠️ Account may be banned)'
    })
  } catch (error) {
    console.error('[LinkedIn Scraper] Error:', error)

    let errorMessage = 'Failed to scrape LinkedIn profile'
    let statusCode = 500

    if (error instanceof Error) {
      const msg = error.message

      if (msg.includes('2FA')) {
        statusCode = 403
        errorMessage = 'LinkedIn requires 2FA verification - cannot proceed automatically'
      } else if (msg.includes('invalid credentials') || msg.includes('password')) {
        statusCode = 401
        errorMessage = 'Invalid LinkedIn credentials'
      } else if (msg.includes('Account')) {
        statusCode = 429
        errorMessage = 'LinkedIn account is locked or banned'
      } else if (msg.includes('timeout')) {
        statusCode = 408
        errorMessage = 'LinkedIn scraping timed out'
      } else {
        errorMessage = msg
      }
    }

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        warning: 'LinkedIn is actively blocking automated access'
      },
      { status: statusCode }
    )
  }
}
