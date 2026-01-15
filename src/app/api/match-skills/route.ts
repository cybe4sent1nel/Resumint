import { NextRequest, NextResponse } from "next/server"
import { matchSkills } from "@/lib/web-scraper"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { skills, jobKeywords } = body

    if (!Array.isArray(skills) || !Array.isArray(jobKeywords)) {
      return NextResponse.json(
        {
          success: false,
          error: "Both 'skills' and 'jobKeywords' must be arrays"
        },
        { status: 400 }
      )
    }

    if (skills.length === 0 || jobKeywords.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Both skills and jobKeywords must have at least one item"
        },
        { status: 400 }
      )
    }

    const result = matchSkills(skills, jobKeywords)

    return NextResponse.json({
      success: true,
      data: {
        matched: result.matched,
        missing: result.missing,
        matchScore: result.matchScore,
        summary: {
          total: jobKeywords.length,
          matched: result.matched.length,
          missing: result.missing.length,
          percentage: `${result.matchScore}%`
        }
      }
    })
  } catch (error) {
    console.error("Match skills error:", error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to match skills"
      },
      { status: 500 }
    )
  }
}
