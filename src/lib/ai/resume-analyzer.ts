// AI Resume Analyzer - Scores and provides improvement suggestions

export interface ResumeAnalysis {
  overallScore: number
  atsScore: number
  readabilityScore: number
  sections: SectionAnalysis[]
  improvements: Improvement[]
  strengths: string[]
  warnings: string[]
}

export interface SectionAnalysis {
  section: string
  score: number
  feedback: string
}

export interface Improvement {
  priority: "high" | "medium" | "low"
  category: string
  suggestion: string
  impact: string
}

export async function analyzeResume(resumeText: string): Promise<ResumeAnalysis> {
  try {
    // Parse resume sections
    const sections = parseResumeSections(resumeText)

    // Calculate scores
    const atsScore = calculateATSScore(resumeText, sections)
    const readabilityScore = calculateReadability(resumeText)
    const overallScore = (atsScore + readabilityScore) / 2

    // Analyze each section
    const sectionAnalyses = Object.entries(sections).map(([section, content]) => ({
      section,
      score: analyzeSection(section, content),
      feedback: getSectionFeedback(section, content)
    }))

    // Generate improvements
    const improvements = generateImprovements(resumeText, sections, atsScore, readabilityScore)
    const strengths = identifyStrengths(resumeText, sections)
    const warnings = identifyWarnings(resumeText, sections)

    return {
      overallScore: Math.round(overallScore),
      atsScore,
      readabilityScore,
      sections: sectionAnalyses,
      improvements,
      strengths,
      warnings
    }
  } catch (error) {
    console.error("Error analyzing resume:", error)
    throw error
  }
}

function parseResumeSections(resumeText: string) {
  const sections: Record<string, string> = {}
  const patterns = {
    contact: /contact|email|phone|linkedin|github/i,
    summary: /professional summary|objective|summary/i,
    experience: /work experience|employment|experience/i,
    education: /education|degree|university|college/i,
    skills: /skills|technical skills|core competencies/i,
    projects: /projects|portfolio|achievements/i,
    certifications: /certifications|licenses|awards/i
  }

  Object.entries(patterns).forEach(([key, pattern]) => {
    const lines = resumeText.split("\n")
    let sectionContent = ""
    let inSection = false

    lines.forEach((line) => {
      if (pattern.test(line)) {
        inSection = true
      } else if (inSection && /^[A-Z]/.test(line) && line.length > 3) {
        inSection = false
      }
      if (inSection) sectionContent += line + "\n"
    })
    sections[key] = sectionContent
  })

  return sections
}

function calculateATSScore(resumeText: string, sections: Record<string, string>): number {
  let score = 0

  // Check for key sections
  const hasSummary = sections.summary && sections.summary.length > 20
  const hasExperience = sections.experience && sections.experience.length > 20
  const hasEducation = sections.education && sections.education.length > 20
  const hasSkills = sections.skills && sections.skills.length > 20

  if (hasSummary) score += 15
  if (hasExperience) score += 25
  if (hasEducation) score += 20
  if (hasSkills) score += 20

  // Check for ATS-unfriendly content
  if (!/^[a-zA-Z0-9\s\n,.-]*$/.test(resumeText)) {
    // Contains non-standard characters
    score -= 10
  }

  // Check for keywords
  const commonKeywords = [
    "leadership",
    "teamwork",
    "communication",
    "analytical",
    "problem-solving",
    "technical"
  ]
  const keywordMatches = commonKeywords.filter((kw) =>
    resumeText.toLowerCase().includes(kw)
  ).length
  score += keywordMatches * 2

  return Math.min(99, Math.max(0, score))
}

function calculateReadability(resumeText: string): number {
  let score = 50

  // Check length (optimal: 500-800 words)
  const wordCount = resumeText.split(/\s+/).length
  if (wordCount >= 400 && wordCount <= 800) score += 20
  else if (wordCount > 800) score -= 10

  // Check for bullet points
  const bulletCount = (resumeText.match(/^[-•*]\s/gm) || []).length
  if (bulletCount > 5) score += 15

  // Check for short paragraphs
  const paragraphs = resumeText.split(/\n\n+/).filter((p) => p.trim().length > 0)
  if (paragraphs.length > 0) {
    const avgParagraphLength = resumeText.length / paragraphs.length
    if (avgParagraphLength < 200) score += 10
  }

  return Math.min(99, Math.max(0, score))
}

function analyzeSection(section: string, content: string): number {
  if (!content || content.length < 10) return 20
  if (content.length < 50) return 40
  if (content.length < 100) return 60
  if (content.length < 200) return 80
  return 95
}

function getSectionFeedback(section: string, content: string): string {
  const length = content.trim().length

  if (length === 0) return `Add content to ${section} section`
  if (length < 50) return `${section} section could be more detailed`
  if (length > 300) return `Consider condensing ${section} for better readability`
  return `${section} section looks good`
}

function generateImprovements(
  resumeText: string,
  sections: Record<string, string>,
  atsScore: number,
  readabilityScore: number
): Improvement[] {
  const improvements: Improvement[] = []

  // ATS improvements
  if (atsScore < 80) {
    improvements.push({
      priority: "high",
      category: "ATS Optimization",
      suggestion: "Use standard section headings (Experience, Education, Skills)",
      impact: "Improve ATS parsing by 10-15%"
    })
  }

  // Missing sections
  if (!sections.skills || sections.skills.length < 20) {
    improvements.push({
      priority: "high",
      category: "Content",
      suggestion: "Add a dedicated Skills section with key competencies",
      impact: "Better match with job descriptions"
    })
  }

  if (!sections.summary || sections.summary.length < 30) {
    improvements.push({
      priority: "medium",
      category: "Content",
      suggestion: "Add a professional summary or objective",
      impact: "Help recruiters understand your value proposition"
    })
  }

  // Readability improvements
  if (readabilityScore < 70) {
    improvements.push({
      priority: "high",
      category: "Readability",
      suggestion: "Use more bullet points to break up text",
      impact: "Improve visual hierarchy and scanning"
    })
  }

  // Length optimization
  const wordCount = resumeText.split(/\s+/).length
  if (wordCount > 900) {
    improvements.push({
      priority: "medium",
      category: "Length",
      suggestion: "Reduce resume length to one page (500-800 words)",
      impact: "Increase chance of being fully read"
    })
  }

  // Quantification
  const hasNumbers = /\d+%|\d+\s*(k|m|b|employees|projects|clients)/i.test(resumeText)
  if (!hasNumbers) {
    improvements.push({
      priority: "medium",
      category: "Impact",
      suggestion: "Add quantifiable metrics to your achievements (%, numbers, money)",
      impact: "Better demonstrate your impact"
    })
  }

  return improvements
}

function identifyStrengths(resumeText: string, sections: Record<string, string>): string[] {
  const strengths: string[] = []

  if (sections.experience && sections.experience.length > 100) {
    strengths.push("Strong work experience section with good detail")
  }

  if (/leadership|manage|direct|lead/i.test(resumeText)) {
    strengths.push("Demonstrates leadership experience")
  }

  if (/achievement|award|recognition|certified/i.test(resumeText)) {
    strengths.push("Includes achievements and certifications")
  }

  if (/\d+%|\d+k|\d+m/.test(resumeText)) {
    strengths.push("Uses quantifiable metrics effectively")
  }

  if ((resumeText.match(/^[-•*]\s/gm) || []).length > 10) {
    strengths.push("Well-structured with bullet points")
  }

  return strengths.slice(0, 3)
}

function identifyWarnings(resumeText: string, sections: Record<string, string>): string[] {
  const warnings: string[] = []

  // Check for personal info that shouldn't be there
  if (/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/.test(resumeText) && sections.contact) {
    warnings.push("Consider hiding phone number in print version for privacy")
  }

  // Check for dates issues
  const currentYear = new Date().getFullYear()
  const hasOldDates = /\b(19[0-9]{2}|200[0-5])\b/.test(resumeText)
  if (hasOldDates) {
    warnings.push("Contains dates from long ago - focus on recent experience")
  }

  // Check for weak action verbs
  if (!/achieved|built|created|designed|developed|improved|increased|led|managed/i.test(resumeText)) {
    warnings.push("Use strong action verbs like 'Led', 'Built', 'Improved'")
  }

  return warnings
}

export async function scrapeLinkedInProfile(linkedinUrl: string): Promise<Record<string, string>> {
  // This would require a server-side LinkedIn scraper API
  // For now, return a structure that would be filled by the backend
  return {
    fullName: "",
    headline: "",
    summary: "",
    experience: "",
    education: "",
    skills: "",
    contact: ""
  }
}

export async function scrapeWebsite(url: string): Promise<Record<string, string>> {
  // This would require a server-side web scraper
  // Returns extracted content structured by section
  return {
    name: "",
    title: "",
    summary: "",
    skills: "",
    experience: "",
    education: ""
  }
}
