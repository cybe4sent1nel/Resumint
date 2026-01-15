import { NextRequest, NextResponse } from "next/server"
import { analyzeResume } from "@/lib/ai/resume-analyzer"

export async function POST(request: NextRequest) {
  try {
    const { resumeText } = await request.json()

    if (!resumeText) {
      return NextResponse.json({ error: "Resume text is required" }, { status: 400 })
    }

    if (resumeText.length < 50) {
      return NextResponse.json(
        { error: "Resume text is too short (minimum 50 characters)" },
        { status: 400 }
      )
    }

    // Analyze the resume
    const analysis = await analyzeResume(resumeText)

    return NextResponse.json({
      success: true,
      analysis
    })
  } catch (error) {
    console.error("Analysis error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to analyze resume"
      },
      { status: 500 }
    )
  }
}
