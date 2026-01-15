/**
 * LinkedIn Profile Parser
 * Combines 3 approaches: OAuth API, File Upload, Manual Paste
 */

export interface LinkedInProfile {
  // Basic Info
  firstName: string
  lastName: string
  headline: string
  summary: string
  email?: string
  phone?: string
  location?: string
  profilePicture?: string
  linkedinUrl?: string

  // Experience
  experience: Array<{
    company: string
    title: string
    location?: string
    startDate: string
    endDate?: string
    current: boolean
    description: string
    skills?: string[]
  }>

  // Education
  education: Array<{
    school: string
    degree: string
    field: string
    startDate: string
    endDate?: string
    grade?: string
    activities?: string
  }>

  // Skills
  skills: Array<{
    name: string
    endorsements?: number
  }>

  // Certifications
  certifications: Array<{
    name: string
    organization: string
    issueDate: string
    expiryDate?: string
    credentialId?: string
    url?: string
  }>

  // Projects
  projects: Array<{
    name: string
    description: string
    url?: string
    startDate: string
    endDate?: string
  }>

  // Languages
  languages: Array<{
    name: string
    proficiency?: string
  }>

  // Source of data
  source: 'oauth' | 'file-upload' | 'manual-paste' | 'merged'
}

/**
 * Approach 1: Parse LinkedIn OAuth API Response
 */
export function parseLinkedInOAuth(oauthData: any): Partial<LinkedInProfile> {
  return {
    firstName: oauthData.localizedFirstName || '',
    lastName: oauthData.localizedLastName || '',
    email: oauthData.emailAddress || '',
    profilePicture: oauthData.profilePicture?.['displayImage~']?.elements?.[0]?.identifiers?.[0]?.identifier || '',
    linkedinUrl: `https://www.linkedin.com/in/${oauthData.id || ''}`,
    source: 'oauth',
  }
}

/**
 * Approach 2: Parse LinkedIn Data Export (ZIP file)
 * User downloads from: Settings → Get a copy of your data
 */
export function parseLinkedInExport(exportData: any): Partial<LinkedInProfile> {
  const profile = exportData.Profile || exportData
  const positions = exportData.Positions || []
  const education = exportData.Education || []
  const skills = exportData.Skills || []
  const certifications = exportData.Certifications || []

  return {
    firstName: profile['First Name'] || profile.firstName || '',
    lastName: profile['Last Name'] || profile.lastName || '',
    headline: profile.Headline || profile.headline || '',
    summary: profile.Summary || profile.summary || '',
    email: profile['Email Address'] || profile.email || '',
    location: profile.Location || profile.location || '',
    
    experience: positions.map((pos: any) => ({
      company: pos['Company Name'] || pos.companyName || '',
      title: pos.Title || pos.title || '',
      location: pos.Location || pos.location || '',
      startDate: pos['Started On'] || pos.startDate || '',
      endDate: pos['Finished On'] || pos.endDate || '',
      current: !pos['Finished On'] && !pos.endDate,
      description: pos.Description || pos.description || '',
    })),

    education: education.map((edu: any) => ({
      school: edu['School Name'] || edu.school || '',
      degree: edu['Degree Name'] || edu.degree || '',
      field: edu['Notes'] || edu.field || '',
      startDate: edu['Start Date'] || edu.startDate || '',
      endDate: edu['End Date'] || edu.endDate || '',
    })),

    skills: skills.map((skill: any) => ({
      name: skill.Name || skill.name || '',
      endorsements: 0,
    })),

    certifications: certifications.map((cert: any) => ({
      name: cert.Name || cert.name || '',
      organization: cert.Authority || cert.organization || '',
      issueDate: cert['Started On'] || cert.issueDate || '',
      url: cert.Url || cert.url || '',
    })),

    source: 'file-upload',
  }
}

/**
 * Approach 3: Parse Manual LinkedIn Profile Copy-Paste
 * User copies HTML/text from LinkedIn profile page
 */
export function parseLinkedInHTML(htmlContent: string): Partial<LinkedInProfile> {
  // Create DOM parser
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlContent, 'text/html')

  // Extract basic info
  const nameElement = doc.querySelector('.text-heading-xlarge, .pv-text-details__left-panel h1')
  const headlineElement = doc.querySelector('.text-body-medium, .pv-text-details__left-panel .text-body-medium')
  const locationElement = doc.querySelector('.text-body-small.inline, .pv-text-details__left-panel .text-body-small')

  // Extract experience
  const experienceItems = Array.from(doc.querySelectorAll('.pvs-list__paged-list-item, .artdeco-list__item'))
  const experience = experienceItems.map(item => {
    const titleEl = item.querySelector('.mr1.t-bold span[aria-hidden="true"]')
    const companyEl = item.querySelector('.t-14.t-normal span[aria-hidden="true"]')
    const durationEl = item.querySelector('.t-14.t-normal.t-black--light span[aria-hidden="true"]')
    const descriptionEl = item.querySelector('.pvs-list__item--with-top-padding')

    return {
      title: titleEl?.textContent?.trim() || '',
      company: companyEl?.textContent?.trim().split(' · ')[0] || '',
      location: companyEl?.textContent?.trim().split(' · ')[1] || '',
      startDate: durationEl?.textContent?.trim().split(' - ')[0] || '',
      endDate: durationEl?.textContent?.trim().split(' - ')[1] || '',
      current: durationEl?.textContent?.includes('Present') || false,
      description: descriptionEl?.textContent?.trim() || '',
    }
  }).filter(exp => exp.title && exp.company)

  return {
    firstName: nameElement?.textContent?.trim().split(' ')[0] || '',
    lastName: nameElement?.textContent?.trim().split(' ').slice(1).join(' ') || '',
    headline: headlineElement?.textContent?.trim() || '',
    location: locationElement?.textContent?.trim() || '',
    experience: experience as any,
    source: 'manual-paste',
  }
}

/**
 * Merge multiple LinkedIn sources (prioritize most complete data)
 */
export function mergeLinkedInProfiles(...profiles: Partial<LinkedInProfile>[]): LinkedInProfile {
  const merged: any = {
    source: 'merged',
  }

  for (const profile of profiles) {
    for (const key in profile) {
      if (!merged[key] || (profile as any)[key]?.length > merged[key]?.length) {
        merged[key] = (profile as any)[key]
      }
    }
  }

  return merged
}

/**
 * Convert LinkedIn profile to Resume format
 */
export function linkedInToResume(profile: LinkedInProfile) {
  return {
    personalInfo: {
      name: `${profile.firstName || ''} ${profile.lastName || ''}`.trim(),
      email: profile.email || '',
      phone: profile.phone || '',
      location: profile.location || '',
      linkedin: profile.linkedinUrl || '',
      photo: profile.profilePicture || '',
    },
    summary: profile.headline || profile.summary || '',
    experience: profile.experience || [],
    education: profile.education || [],
    skills: profile.skills?.map(s => s.name) || [],
    certifications: profile.certifications || [],
    projects: profile.projects || [],
    languages: profile.languages || [],
  }
}
