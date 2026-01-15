/**
 * LinkedIn Profile Scraper and Resume Builder
 * Integrates with LinkedIn API to extract profile data and auto-build resumes
 */

interface LinkedInProfile {
  firstName?: string;
  lastName?: string;
  headline?: string;
  summary?: string;
  profilePicture?: string;
  location?: string;
  email?: string;
  phone?: string;
  experience: LinkedInExperience[];
  education: LinkedInEducation[];
  skills: string[];
  endorsements?: { [key: string]: number };
  certifications?: LinkedInCertification[];
  languages?: string[];
}

interface LinkedInExperience {
  title: string;
  company: string;
  startDate?: string;
  endDate?: string;
  currentlyWorking?: boolean;
  description?: string;
  location?: string;
}

interface LinkedInEducation {
  school: string;
  fieldOfStudy?: string;
  degree?: string;
  startDate?: string;
  endDate?: string;
  grade?: string;
  activities?: string;
}

interface LinkedInCertification {
  name: string;
  issuer?: string;
  issueDate?: string;
  expirationDate?: string;
  credentialUrl?: string;
}

/**
 * Parse LinkedIn profile URL and extract profile ID
 */
export function extractLinkedInProfileId(url: string): string | null {
  const patterns = [
    /linkedin\.com\/in\/([^/?]+)/,
    /linkedin\.com\/company\/([^/?]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  return null;
}

/**
 * Fetch LinkedIn profile data (via API)
 * Note: Requires backend API integration with LinkedIn
 */
export async function fetchLinkedInProfile(
  profileUrl: string,
  accessToken?: string
): Promise<LinkedInProfile | null> {
  try {
    const profileId = extractLinkedInProfileId(profileUrl);
    if (!profileId) throw new Error('Invalid LinkedIn URL');

    const response = await fetch('/api/linkedin/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        profileId,
        accessToken,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch LinkedIn profile: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching LinkedIn profile:', error);
    return null;
  }
}

/**
 * Convert LinkedIn profile to resume format
 */
export function convertLinkedInToResume(profile: LinkedInProfile) {
  return {
    personalInfo: {
      fullName: `${profile.firstName} ${profile.lastName}`.trim(),
      email: profile.email || '',
      phone: profile.phone || '',
      location: profile.location || '',
      summary: profile.headline || '',
      profileImage: profile.profilePicture,
    },
    professionalSummary: profile.summary || '',
    experience: profile.experience.map((exp) => ({
      jobTitle: exp.title,
      company: exp.company,
      location: exp.location || '',
      startDate: exp.startDate || '',
      endDate: exp.endDate || exp.currentlyWorking ? 'Present' : '',
      description: exp.description || '',
      currentlyWorking: exp.currentlyWorking || false,
    })),
    education: profile.education.map((edu) => ({
      school: edu.school,
      degree: edu.degree || '',
      fieldOfStudy: edu.fieldOfStudy || '',
      startDate: edu.startDate || '',
      endDate: edu.endDate || '',
      grade: edu.grade || '',
    })),
    skills: profile.skills.map((skill) => ({
      name: skill,
      endorsements: profile.endorsements?.[skill] || 0,
    })),
    certifications: (profile.certifications || []).map((cert) => ({
      name: cert.name,
      issuer: cert.issuer || '',
      issueDate: cert.issueDate || '',
    })),
    languages: profile.languages || [],
  };
}

/**
 * Generate resume summary using AI based on LinkedIn data
 */
export async function generateResumeSummaryWithAI(
  profile: LinkedInProfile,
  jobDescription?: string
): Promise<string> {
  try {
    const response = await fetch('/api/ai/generate-summary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        profile,
        jobDescription,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate summary');
    }

    const data = await response.json();
    return data.summary;
  } catch (error) {
    console.error('Error generating summary:', error);
    return profile.summary || '';
  }
}

/**
 * Score resume based on completeness and ATS compatibility
 */
export interface ResumeScore {
  overallScore: number;
  sections: {
    personalInfo: number;
    summary: number;
    experience: number;
    education: number;
    skills: number;
    certifications: number;
  };
  suggestions: string[];
}

export function scoreResume(resumeData: any): ResumeScore {
  const sections = {
    personalInfo: 0,
    summary: 0,
    experience: 0,
    education: 0,
    skills: 0,
    certifications: 0,
  };

  const suggestions: string[] = [];

  // Personal Info Scoring
  if (resumeData.personalInfo?.fullName) sections.personalInfo += 25;
  if (resumeData.personalInfo?.email) sections.personalInfo += 25;
  if (resumeData.personalInfo?.phone) sections.personalInfo += 25;
  if (resumeData.personalInfo?.location) sections.personalInfo += 25;

  if (sections.personalInfo < 75) {
    suggestions.push('Add missing contact information for better visibility');
  }

  // Summary Scoring
  if (resumeData.professionalSummary) {
    const summaryLength = resumeData.professionalSummary.length;
    sections.summary = Math.min(100, (summaryLength / 500) * 100);
    if (summaryLength < 100) {
      suggestions.push('Expand your professional summary (aim for 100-200 words)');
    }
  } else {
    suggestions.push('Add a professional summary to improve your resume');
  }

  // Experience Scoring
  if (resumeData.experience && resumeData.experience.length > 0) {
    sections.experience = Math.min(
      100,
      (resumeData.experience.length / 3) * 100
    );
    const withDescriptions = resumeData.experience.filter(
      (exp: any) => exp.description && exp.description.length > 20
    ).length;
    if (withDescriptions < resumeData.experience.length) {
      suggestions.push(
        'Add detailed descriptions to your job experiences (use action verbs)'
      );
    }
  } else {
    suggestions.push('Add your work experience to strengthen your resume');
  }

  // Education Scoring
  if (resumeData.education && resumeData.education.length > 0) {
    sections.education = 100;
  } else {
    suggestions.push('Add your educational background');
  }

  // Skills Scoring
  if (resumeData.skills && resumeData.skills.length > 0) {
    sections.skills = Math.min(100, (resumeData.skills.length / 15) * 100);
    if (resumeData.skills.length < 5) {
      suggestions.push('Add more skills (aim for 10-15 relevant skills)');
    }
  } else {
    suggestions.push('Add your technical and soft skills');
  }

  // Certifications Scoring
  if (resumeData.certifications && resumeData.certifications.length > 0) {
    sections.certifications = Math.min(
      100,
      (resumeData.certifications.length / 3) * 100
    );
  }

  const overallScore = Math.round(
    Object.values(sections).reduce((a, b) => a + b, 0) / 6
  );

  return {
    overallScore,
    sections,
    suggestions,
  };
}

/**
 * Optimize resume for ATS (Applicant Tracking System)
 */
export function optimizeForATS(resumeData: any): {
  optimized: any;
  warnings: string[];
} {
  const warnings: string[] = [];
  const optimized = JSON.parse(JSON.stringify(resumeData));

  // Check for common ATS issues
  if (optimized.personalInfo?.fullName) {
    // ATS prefers standard formatting
    const name = optimized.personalInfo.fullName;
    if (name.includes('|') || name.includes('•')) {
      warnings.push(
        'Remove special characters from your name for better ATS compatibility'
      );
    }
  }

  // Check date formats
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  optimized.experience?.forEach((exp: any) => {
    if (exp.startDate && !dateRegex.test(exp.startDate)) {
      warnings.push(
        'Use consistent date format (YYYY-MM-DD) for better parsing'
      );
    }
  });

  // Check for missing descriptions
  optimized.experience?.forEach((exp: any) => {
    if (!exp.description || exp.description.length < 50) {
      warnings.push(
        'Add detailed job descriptions with achievement metrics'
      );
    }
  });

  return { optimized, warnings };
}

/**
 * Match resume with job description
 */
export function matchResumeWithJob(
  resumeData: any,
  jobDescription: string
): {
  matchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  recommendations: string[];
} {
  const jobKeywords = jobDescription
    .toLowerCase()
    .split(/\W+/)
    .filter((word) => word.length > 3);

  const resumeSkills = (resumeData.skills || []).map((s: any) =>
    typeof s === 'string' ? s.toLowerCase() : s.name.toLowerCase()
  );

  const matchedSkills = resumeSkills.filter((skill: string) =>
    jobKeywords.some((keyword) => keyword.includes(skill) || skill.includes(keyword))
  );

  const requiredSkills = new Set(jobKeywords);
  const missingSkills = Array.from(requiredSkills)
    .filter((keyword) => !matchedSkills.some((s: string) => s.includes(keyword)))
    .slice(0, 5);

  const matchScore = Math.round(
    (matchedSkills.length / Math.max(requiredSkills.size, 1)) * 100
  );

  const recommendations = [];
  if (matchScore < 60) {
    recommendations.push(
      'Consider adding more relevant skills that match the job description'
    );
  }
  if (matchedSkills.length === 0) {
    recommendations.push(
      'Your resume may not match this job well. Review the required skills.'
    );
  }

  return {
    matchScore,
    matchedSkills,
    missingSkills,
    recommendations,
  };
}
