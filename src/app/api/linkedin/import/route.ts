import { NextResponse } from 'next/server'
import { callAI } from '@/lib/ai/free-models'
import { parseLinkedInOAuth, parseLinkedInExport, parseLinkedInHTML, mergeLinkedInProfiles, linkedInToResume } from '@/lib/linkedin/parser'

/**
 * LinkedIn Profile Import API
 * POST /api/linkedin/import
 * 
 * Handles 3 import methods:
 * 1. OAuth token (from LinkedIn Sign In)
 * 2. File upload (LinkedIn data export)
 * 3. Manual paste (HTML/text from profile page)
 */

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { method, data } = body

    let profile: any = null

    // Method 1: OAuth API
    if (method === 'oauth' && data.oauthToken) {
      const oauthProfile = await fetchLinkedInProfile(data.oauthToken)
      profile = parseLinkedInOAuth(oauthProfile)
    }

    // Method 2: File Upload
    if (method === 'file-upload' && data.exportData) {
      profile = parseLinkedInExport(data.exportData)
    }

    // Method 3: Manual Paste
    if (method === 'manual-paste' && data.htmlContent) {
      profile = parseLinkedInHTML(data.htmlContent)
    }

    // Method 4: Merge all available data
    if (method === 'merge' && data.profiles) {
      profile = mergeLinkedInProfiles(...data.profiles)
    }

    if (!profile) {
      return NextResponse.json(
        { error: 'Invalid import method or missing data' },
        { status: 400 }
      )
    }

    // Convert to resume format
    const resume = linkedInToResume(profile)

    // AI Enhancement: Improve resume with AI
    if (data.enhanceWithAI) {
      // Enhance summary
      if (resume.summary) {
        const enhancedSummary = await callAI(
          'resume-writing',
          `Improve this professional summary for a resume (make it ATS-friendly and impactful):\n\n${resume.summary}`
        )
        resume.summary = enhancedSummary
      }

      // Enhance experience descriptions
      for (const exp of resume.experience) {
        if (exp.description && exp.description.length > 50) {
          const enhancedDesc = await callAI(
            'bullet-points',
            `Convert this job description into 3-5 impactful bullet points:\n\n${exp.description}`
          )
          exp.description = enhancedDesc
        }
      }

      // Extract skills from experience if missing
      if (!resume.skills || resume.skills.length < 5) {
        const experienceText = resume.experience.map((e: any) => e.description).join('\n')
        const extractedSkills = await callAI(
          'skill-extraction',
          `Extract technical skills from this work experience:\n\n${experienceText}`
        )
        resume.skills = extractedSkills.split(',').map((s: string) => s.trim())
      }
    }

    return NextResponse.json({
      success: true,
      profile,
      resume,
      source: profile.source,
    })

  } catch (error: any) {
    console.error('LinkedIn import error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to import LinkedIn profile' },
      { status: 500 }
    )
  }
}

/**
 * Fetch LinkedIn profile using OAuth token
 */
async function fetchLinkedInProfile(accessToken: string) {
  // Basic profile
  const profileResponse = await fetch('https://api.linkedin.com/v2/me', {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  })

  const profile = await profileResponse.json()

  // Email address
  const emailResponse = await fetch(
    'https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))',
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    }
  )

  const emailData = await emailResponse.json()
  profile.emailAddress = emailData.elements?.[0]?.['handle~']?.emailAddress

  // Profile picture
  const pictureResponse = await fetch(
    'https://api.linkedin.com/v2/me?projection=(id,profilePicture(displayImage~:playableStreams))',
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    }
  )

  const pictureData = await pictureResponse.json()
  profile.profilePicture = pictureData.profilePicture

  return profile
}
