import axios from "axios"
import * as cheerio from "cheerio"

export interface ScrapedProfile {
  name?: string
  email?: string
  phone?: string
  headline?: string
  summary?: string
  experience?: string
  education?: string
  location?: string
  skills?: string[]
  socialLinks?: string[]
  [key: string]: any
}

// Rotating user agents to avoid detection
const userAgents = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15"
]

function getRandomUserAgent(): string {
  return userAgents[Math.floor(Math.random() * userAgents.length)]
}

const axiosInstance = axios.create({
  timeout: 15000,
  maxRedirects: 5,
  validateStatus: function (status) {
    // Don't throw on any status code - we'll handle them manually
    return true
  }
})

// Add interceptors for better request handling
axiosInstance.interceptors.request.use((config) => {
  config.headers["User-Agent"] = getRandomUserAgent()
  config.headers["Accept"] = "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8"
  config.headers["Accept-Language"] = "en-US,en;q=0.9,en;q=0.8"
  config.headers["Accept-Encoding"] = "gzip, deflate, br"
  config.headers["DNT"] = "1"
  config.headers["Connection"] = "keep-alive"
  config.headers["Upgrade-Insecure-Requests"] = "1"
  config.headers["Sec-Fetch-Dest"] = "document"
  config.headers["Sec-Fetch-Mode"] = "navigate"
  config.headers["Sec-Fetch-Site"] = "none"
  config.headers["Cache-Control"] = "max-age=0"
  return config
})

/**
 * Sleep for a given number of milliseconds
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Fetch HTML content from a URL with retry logic
 */
export async function fetchHtml(url: string, retries = 2): Promise<string> {
  let lastError: Error | null = null

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await axiosInstance.get(url)

      // FAIL FAST: 999 = Website blocking bot - don't retry
      if (response.status === 999) {
        throw new Error(`Access denied (999) - Website blocked automated requests`)
      }

      // FAIL FAST: 401 = Authentication required - don't retry
      if (response.status === 401) {
        throw new Error(`Authentication required (401)`)
      }

      // FAIL FAST: 403 = Forbidden - don't retry
      if (response.status === 403) {
        throw new Error(`Access forbidden (403) - Website blocks automation`)
      }

      // Other 4xx errors
      if (response.status >= 400) {
        throw new Error(`HTTP Error ${response.status}`)
      }

      // Check we got content
      if (!response.data || typeof response.data !== "string") {
        throw new Error("No HTML content received")
      }

      return response.data
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error))

      // Known permanent errors - don't retry
      if (lastError.message.includes("999") || 
          lastError.message.includes("401") ||
          lastError.message.includes("403") ||
          lastError.message.includes("404") ||
          lastError.message.includes("ENOTFOUND") ||
          lastError.message.includes("Invalid URL")) {
        throw lastError
      }

      // Connection errors - only retry once
      if (lastError.message.includes("ECONNREFUSED")) {
        if (attempt < retries) {
          console.log(`Connection refused. Retrying...`)
          await sleep(500)
          continue
        }
        throw new Error("Connection refused - Server not accessible")
      }

      // Timeout - only retry once
      if (lastError.message.includes("ETIMEDOUT")) {
        if (attempt < retries) {
          console.log(`Request timeout. Retrying...`)
          await sleep(500)
          continue
        }
        throw new Error("Request timeout - Website not responding")
      }

      // Generic error - retry once
      if (attempt < retries) {
        console.log(`Attempt ${attempt} failed. Retrying...`)
        await sleep(500)
        continue
      }
    }
  }

  throw lastError || new Error("Failed to fetch URL")
}

/**
 * Extract text content from HTML
 */
export function extractText($: cheerio.CheerioAPI): string {
  return $("body")
    .text()
    .replace(/\s+/g, " ")
    .trim()
}

/**
 * Extract profile data from HTML
 */
export function parseProfile(html: string): ScrapedProfile {
  const $ = cheerio.load(html)
  const profile: ScrapedProfile = {}
  const bodyText = extractText($)

  // Extract name
  const h1 = $("h1").first().text().trim()
  if (h1) {
    profile.name = h1
  } else {
    const titleText = $("title").text().trim()
    if (titleText) {
      profile.name = titleText.split("|")[0].split("-")[0].trim()
    }
  }

  // Extract email
  const emailMatch = bodyText.match(/([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i)
  if (emailMatch) {
    profile.email = emailMatch[1]
  }

  // Extract phone
  const phoneMatch = bodyText.match(/\+?1?\s?[\(\.\-]?([0-9]{3})[\)\.\-\s]?([0-9]{3})[\.\-\s]?([0-9]{4,5})/g)
  if (phoneMatch) {
    profile.phone = phoneMatch[0]
  }

  // Extract location
  const locationMatch = bodyText.match(/(?:location|based in|from):\s*([^,\n]+)/i)
  if (locationMatch) {
    profile.location = locationMatch[1].trim()
  }

  // Extract headline/title
  const metaDescription = $('meta[name="description"]').attr("content")
  if (metaDescription) {
    profile.headline = metaDescription.substring(0, 200)
  } else {
    // Try common selectors for headline
    const headline = $(".headline, [class*='headline'], h2").first().text().trim()
    if (headline) {
      profile.headline = headline.substring(0, 200)
    }
  }

  // Extract summary/bio
  const summaryText = $(
    ".summary, .bio, [class*='about'], [class*='summary'], [class*='bio']"
  )
    .first()
    .text()
    .trim()
  if (summaryText) {
    profile.summary = summaryText.substring(0, 500)
  }

  // Extract experience
  const experienceText = $(
    ".experience, .work, [class*='experience'], [class*='employment']"
  )
    .first()
    .text()
    .trim()
  if (experienceText) {
    profile.experience = experienceText.substring(0, 1000)
  }

  // Extract education
  const educationText = $(
    ".education, [class*='education'], [class*='school']"
  )
    .first()
    .text()
    .trim()
  if (educationText) {
    profile.education = educationText.substring(0, 300)
  }

  // Extract skills
  profile.skills = extractSkills($, bodyText)

  // Extract social links
  profile.socialLinks = extractSocialLinks($)

  return profile
}

/**
 * Extract skills from various sources
 */
function extractSkills($: cheerio.CheerioAPI, bodyText?: string): string[] {
  if (!bodyText) bodyText = ""
  const skills: Set<string> = new Set()

  // Method 1: From skills section
  const skillsSection = $(
    ".skills, [class*='skill'], [class*='expertise'], [class*='technical']"
  )
    .first()
    .text()

  if (skillsSection) {
    skillsSection
      .split(/[,\n•\|]/g)
      .map((s) => s.trim())
      .filter((s) => s.length > 0 && s.length < 50)
      .forEach((s) => skills.add(s))
  }

  // Method 2: From skill pattern matching
  const skillMatches = bodyText.match(
    /(?:skills?|expertise|technical|proficiencies?):\s*([^\n.]+)/gi
  )
  if (skillMatches) {
    skillMatches.forEach((match) => {
      const skillList = match
        .replace(/^[^:]+:\s*/i, "")
        .split(/[,\n•\|]/)
        .map((s) => s.trim())
        .filter((s) => s.length > 0 && s.length < 50)
      skillList.forEach((s) => skills.add(s))
    })
  }

  return Array.from(skills).slice(0, 25)
}

/**
 * Extract social media links
 */
function extractSocialLinks($: cheerio.CheerioAPI): string[] {
  const socialLinks: string[] = []
  const commonSocialDomains = [
    "linkedin.com",
    "github.com",
    "twitter.com",
    "facebook.com",
    "instagram.com",
    "portfolio",
    "website"
  ]

  $("a").each((_, el) => {
    const href = $(el).attr("href") || ""
    const text = $(el).text().toLowerCase()

    const isSocialLink = commonSocialDomains.some(
      (domain) =>
        href.toLowerCase().includes(domain) || text.includes(domain.split(".")[0])
    )

    if (isSocialLink && !socialLinks.includes(href)) {
      socialLinks.push(href)
    }
  })

  return socialLinks.slice(0, 10)
}

/**
 * Scrape and parse a profile from a URL
 */
export async function scrapeProfile(url: string): Promise<ScrapedProfile> {
  try {
    // Normalize URL
    let finalUrl = url.trim()
    if (!finalUrl.startsWith("http://") && !finalUrl.startsWith("https://")) {
      finalUrl = "https://" + finalUrl
    }

    // Fetch HTML
    const html = await fetchHtml(finalUrl)

    if (!html || html.length === 0) {
      throw new Error("No content received from URL")
    }

    // Parse profile
    const profile = parseProfile(html)

    return profile
  } catch (error) {
    console.error("Profile scraping error:", error)
    throw error
  }
}

/**
 * Match job keywords with scraped skills
 */
export function matchSkills(scrapedSkills: string[], jobKeywords: string[]): {
  matched: string[]
  missing: string[]
  matchScore: number
} {
  const matched: string[] = []
  const missing: string[] = []

  const normalizedScrapedSkills = scrapedSkills.map((s) => s.toLowerCase())

  jobKeywords.forEach((keyword) => {
    const isMatched = normalizedScrapedSkills.some(
      (skill) =>
        skill.includes(keyword.toLowerCase()) ||
        keyword.toLowerCase().includes(skill)
    )

    if (isMatched) {
      matched.push(keyword)
    } else {
      missing.push(keyword)
    }
  })

  const matchScore = Math.round((matched.length / Math.max(jobKeywords.length, 1)) * 100)

  return { matched, missing, matchScore }
}
