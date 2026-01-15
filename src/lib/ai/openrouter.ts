import OpenAI from 'openai'

const openrouter = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL,
    'X-Title': process.env.NEXT_PUBLIC_APP_NAME || 'ResumeForge',
  },
})

export interface ResumeData {
  personalInfo: {
    name: string
    email: string
    phone?: string
    location?: string
    linkedin?: string
    github?: string
    website?: string
    summary?: string
    expectedSalary?: string
  }
  experience: Array<{
    company: string
    position: string
    location?: string
    startDate: string
    endDate?: string
    current?: boolean
    description: string[]
  }>
  education: Array<{
    institution: string
    degree: string
    field?: string
    location?: string
    startDate?: string
    endDate?: string
    gpa?: string
  }>
  skills: string[]
  projects?: Array<{
    name: string
    description: string
    technologies?: string[]
    url?: string
  }>
  certifications?: Array<{
    name: string
    issuer: string
    date?: string
    url?: string
  }>
  languages?: Array<{
    language: string
    proficiency: string
  }>
  awards?: Array<{
    title: string
    issuer: string
    date: string
    description?: string
  }>
}

/**
 * Parse a resume from PDF text using AI
 */
export async function parseResumeFromText(
  pdfText: string
): Promise<ResumeData> {
  const response = await openrouter.chat.completions.create({
    model: 'anthropic/claude-3.5-sonnet',
    messages: [
      {
        role: 'system',
        content: `You are an expert resume parser. Extract structured information from resume text.
Return ONLY valid JSON following this exact structure:
{
  "personalInfo": {
    "name": string,
    "email": string,
    "phone": string (optional),
    "location": string (optional),
    "linkedin": string (optional),
    "website": string (optional),
    "summary": string (optional)
  },
  "experience": [{
    "company": string,
    "position": string,
    "location": string (optional),
    "startDate": string (YYYY-MM format),
    "endDate": string (YYYY-MM format, optional),
    "current": boolean,
    "description": string[] (bullet points)
  }],
  "education": [{
    "institution": string,
    "degree": string,
    "field": string (optional),
    "location": string (optional),
    "startDate": string (optional),
    "endDate": string (optional),
    "gpa": string (optional)
  }],
  "skills": string[],
  "projects": [{
    "name": string,
    "description": string,
    "technologies": string[] (optional),
    "url": string (optional)
  }] (optional),
  "certifications": [{
    "name": string,
    "issuer": string,
    "date": string (optional),
    "url": string (optional)
  }] (optional)
}`,
      },
      {
        role: 'user',
        content: `Parse this resume:\n\n${pdfText}`,
      },
    ],
    temperature: 0.1,
  })

  const content = response.choices[0]?.message?.content
  if (!content) throw new Error('No response from AI')

  return JSON.parse(content)
}

/**
 * Score a resume on multiple criteria
 */
export async function scoreResume(resumeData: ResumeData): Promise<{
  totalScore: number
  breakdown: {
    atsCompatibility: { score: number; feedback: string }
    keywordOptimization: { score: number; feedback: string }
    formatting: { score: number; feedback: string }
    contentQuality: { score: number; feedback: string }
    grammar: { score: number; feedback: string }
    actionVerbs: { score: number; feedback: string }
  }
  suggestions: string[]
}> {
  const response = await openrouter.chat.completions.create({
    model: 'anthropic/claude-3.5-sonnet',
    messages: [
      {
        role: 'system',
        content: `You are an expert resume reviewer and ATS (Applicant Tracking System) specialist.
Score the resume on these criteria (0-100 each):
1. ATS Compatibility (20 points max)
2. Keyword Optimization (20 points max)
3. Formatting & Structure (15 points max)
4. Content Quality (20 points max)
5. Grammar & Spelling (10 points max)
6. Action Verbs Usage (15 points max)

Return ONLY valid JSON with this structure:
{
  "totalScore": number (0-100),
  "breakdown": {
    "atsCompatibility": {"score": number, "feedback": string},
    "keywordOptimization": {"score": number, "feedback": string},
    "formatting": {"score": number, "feedback": string},
    "contentQuality": {"score": number, "feedback": string},
    "grammar": {"score": number, "feedback": string},
    "actionVerbs": {"score": number, "feedback": string}
  },
  "suggestions": string[] (top 5 actionable improvements)
}`,
      },
      {
        role: 'user',
        content: `Score this resume:\n\n${JSON.stringify(resumeData, null, 2)}`,
      },
    ],
    temperature: 0.2,
  })

  const content = response.choices[0]?.message?.content
  if (!content) throw new Error('No response from AI')

  return JSON.parse(content)
}

/**
 * Enhance resume content (rewrite descriptions)
 */
export async function enhanceResumeContent(
  experienceDescription: string,
  jobTitle: string
): Promise<string[]> {
  const response = await openrouter.chat.completions.create({
    model: 'anthropic/claude-3.5-sonnet',
    messages: [
      {
        role: 'system',
        content: `You are a professional resume writer. Rewrite job descriptions to be:
- Action-oriented (start with strong verbs)
- Quantified (add metrics when possible)
- Achievement-focused (not just responsibilities)
- ATS-friendly (use industry keywords)

Return 3-5 bullet points as a JSON array of strings.`,
      },
      {
        role: 'user',
        content: `Job Title: ${jobTitle}\nDescription: ${experienceDescription}`,
      },
    ],
    temperature: 0.7,
  })

  const content = response.choices[0]?.message?.content
  if (!content) throw new Error('No response from AI')

  return JSON.parse(content)
}

/**
 * Generate a professional summary
 */
export async function generateSummary(
  resumeData: Partial<ResumeData>
): Promise<string> {
  const response = await openrouter.chat.completions.create({
    model: 'anthropic/claude-3.5-sonnet',
    messages: [
      {
        role: 'system',
        content: `You are a professional resume writer. Create a compelling professional summary (2-3 sentences) based on the candidate's experience and skills. Focus on:
- Years of experience
- Key skills and expertise
- Career achievements
- Value proposition

Return ONLY the summary text, no JSON.`,
      },
      {
        role: 'user',
        content: JSON.stringify(resumeData, null, 2),
      },
    ],
    temperature: 0.8,
    max_tokens: 150,
  })

  return response.choices[0]?.message?.content || ''
}

export { openrouter }
