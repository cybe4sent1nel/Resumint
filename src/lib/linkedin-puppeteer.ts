import puppeteer, { Browser, Page } from 'puppeteer'

export interface LinkedInProfile {
  name?: string
  headline?: string
  email?: string
  phone?: string
  location?: string
  about?: string
  experience?: Array<{
    title: string
    company: string
    duration: string
    description?: string
  }>
  education?: Array<{
    school: string
    degree: string
    field: string
    duration?: string
  }>
  skills?: string[]
  socialLinks?: string[]
}

interface LinkedInCredentials {
  email: string
  password: string
}

/**
 * LinkedIn Scraper using Puppeteer
 * ⚠️ WARNING: This violates LinkedIn's Terms of Service
 * Use at your own risk - account will likely be banned
 */
export class LinkedInScraper {
  private browser: Browser | null = null
  private page: Page | null = null

  /**
   * Initialize browser
   */
  async initialize(): Promise<void> {
    this.browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage'
      ]
    })
  }

  /**
   * Close browser
   */
  async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close()
    }
  }

  /**
   * Login to LinkedIn
   */
  private async login(credentials: LinkedInCredentials): Promise<void> {
    if (!this.browser) {
      throw new Error('Browser not initialized')
    }

    this.page = await this.browser.newPage()

    // Set user agent to appear as real browser
    await this.page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    )

    console.log('Navigating to LinkedIn...')
    await this.page.goto('https://www.linkedin.com/login', {
      waitUntil: 'networkidle2'
    })

    // Enter email
    console.log('Entering email...')
    await this.page.type('input[name="session_key"]', credentials.email, { delay: 50 })

    // Enter password
    console.log('Entering password...')
    await this.page.type('input[name="session_password"]', credentials.password, { delay: 50 })

    // Click login button
    console.log('Clicking login button...')
    await this.page.click('button[type="submit"]')

    // Wait for navigation - might show 2FA
    try {
      await this.page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 15000 })
    } catch (e) {
      console.warn('Navigation timeout - might be 2FA challenge')
      // Check if we're at 2FA page
      const is2FA = await this.page.evaluate(() => {
        return document.body.innerText.includes('verification code') ||
               document.body.innerText.includes('confirm your identity')
      })

      if (is2FA) {
        throw new Error('2FA detected - LinkedIn requires phone verification. Cannot proceed automatically.')
      }
    }

    // Check if login was successful
    const loginFailed = await this.page.evaluate(() => {
      return document.body.innerText.includes("Hmm, that's not the right password") ||
             document.body.innerText.includes('Sign in unsuccessful')
    })

    if (loginFailed) {
      throw new Error('Login failed - invalid credentials')
    }

    console.log('Login successful')
    // Wait a bit to avoid detection
    await new Promise(r => setTimeout(r, 2000))
  }

  /**
   * Scrape a LinkedIn profile
   */
  async scrapeProfile(profileUrl: string, credentials: LinkedInCredentials): Promise<LinkedInProfile> {
    try {
      // Initialize browser
      await this.initialize()

      // Login
      await this.login(credentials)

      if (!this.page) {
        throw new Error('Page not initialized')
      }

      // Navigate to profile
      console.log(`Navigating to profile: ${profileUrl}`)
      await this.page.goto(profileUrl, { waitUntil: 'networkidle2' })

      // Wait for profile to load
      await new Promise(r => setTimeout(r, 2000))

      // Extract profile data
      const profile = await this.page.evaluate(() => {
        const data: LinkedInProfile = {}

        // Get name
        const nameElement = document.querySelector('h1') as HTMLElement
        if (nameElement) {
          data.name = nameElement.innerText?.trim()
        }

        // Get headline
        const headlineElement = document.querySelector('.text-body-medium') as HTMLElement
        if (headlineElement) {
          data.headline = headlineElement.innerText?.trim()
        }

        // Get about section
        const aboutSection = document.querySelector('[data-section="summary"]') as HTMLElement
        if (aboutSection) {
          data.about = aboutSection.innerText?.trim().substring(0, 500)
        }

        // Get location
        const locationElement = document.querySelector('.text-body-small.inline') as HTMLElement
        if (locationElement) {
          data.location = locationElement.innerText?.trim()
        }

        // Get experience
        data.experience = []
        const experienceItems = document.querySelectorAll('[data-section="experience"] .pvs-list__paged-list-item')
        experienceItems.forEach((item) => {
          const titleEl = item.querySelector('.interpreter--visuallyHidden') as HTMLElement
          const companyEl = item.querySelector('.mr1') as HTMLElement
          const durationEl = item.querySelector('.t-14') as HTMLElement
          
          const title = titleEl?.innerText || 'Unknown'
          const company = companyEl?.innerText || 'Unknown'
          const duration = durationEl?.innerText || 'Unknown'
          data.experience?.push({ title, company, duration })
        })

        // Get education
        data.education = []
        const educationItems = document.querySelectorAll('[data-section="education"] .pvs-list__paged-list-item')
        educationItems.forEach((item) => {
          const schoolEl = item.querySelector('.interpreter--visuallyHidden') as HTMLElement
          const school = schoolEl?.innerText || 'Unknown'
          data.education?.push({ school, degree: '', field: '' })
        })

        // Get skills
        data.skills = []
        const skillElements = document.querySelectorAll('[data-section="skills"] .pvs-list__item')
        skillElements.forEach((item) => {
          const skillEl = item as HTMLElement
          const skillText = skillEl?.innerText?.trim() || ''
          if (skillText && data.skills!.length < 20) {
            data.skills!.push(skillText)
          }
        })

        return data
      })

      return profile
    } catch (error) {
      console.error('Scraping error:', error)
      throw error
    } finally {
      await this.close()
    }
  }
}

/**
 * Scrape LinkedIn profile with credentials
 */
export async function scrapeLinkedInProfile(
  profileUrl: string,
  email: string,
  password: string
): Promise<LinkedInProfile> {
  const scraper = new LinkedInScraper()

  try {
    const profile = await scraper.scrapeProfile(profileUrl, { email, password })
    return profile
  } finally {
    await scraper.close()
  }
}
