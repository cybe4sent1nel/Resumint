/**
 * Resume Templates with Overleaf Integration
 * Modern, ATS-friendly templates
 */

export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  category: 'modern' | 'classic' | 'minimal' | 'creative';
  overleafUrl?: string;
  previewImage?: string;
  features: string[];
  fields: TemplateField[];
}

export interface TemplateField {
  name: string;
  type: 'text' | 'textarea' | 'email' | 'phone' | 'date' | 'rich-text';
  required: boolean;
  placeholder: string;
  section: string;
}

export const RESUME_TEMPLATES: ResumeTemplate[] = [
  {
    id: 'modern-minimal',
    name: 'Modern Minimal',
    description: 'Clean, contemporary design with focus on content',
    category: 'modern',
    overleafUrl: 'https://www.overleaf.com/latex/templates',
    previewImage: '/templates/modern-minimal.jpg',
    features: [
      'ATS-friendly',
      'Customizable colors',
      'LinkedIn integration',
      'Mobile-responsive',
    ],
    fields: [
      {
        name: 'fullName',
        type: 'text',
        required: true,
        placeholder: 'Your Full Name',
        section: 'Personal Info',
      },
      {
        name: 'email',
        type: 'email',
        required: true,
        placeholder: 'your.email@example.com',
        section: 'Personal Info',
      },
      {
        name: 'phone',
        type: 'phone',
        required: false,
        placeholder: '+1 (555) 123-4567',
        section: 'Personal Info',
      },
      {
        name: 'location',
        type: 'text',
        required: false,
        placeholder: 'City, Country',
        section: 'Personal Info',
      },
      {
        name: 'summary',
        type: 'textarea',
        required: false,
        placeholder: 'Professional summary (2-3 sentences)',
        section: 'Professional Summary',
      },
      {
        name: 'jobTitle',
        type: 'text',
        required: true,
        placeholder: 'Job Title',
        section: 'Experience',
      },
      {
        name: 'company',
        type: 'text',
        required: true,
        placeholder: 'Company Name',
        section: 'Experience',
      },
      {
        name: 'startDate',
        type: 'date',
        required: true,
        placeholder: 'Start Date',
        section: 'Experience',
      },
      {
        name: 'endDate',
        type: 'date',
        required: false,
        placeholder: 'End Date',
        section: 'Experience',
      },
      {
        name: 'description',
        type: 'rich-text',
        required: true,
        placeholder: 'Job description and achievements',
        section: 'Experience',
      },
      {
        name: 'school',
        type: 'text',
        required: true,
        placeholder: 'School/University Name',
        section: 'Education',
      },
      {
        name: 'degree',
        type: 'text',
        required: false,
        placeholder: 'Degree/Certification',
        section: 'Education',
      },
      {
        name: 'fieldOfStudy',
        type: 'text',
        required: false,
        placeholder: 'Field of Study',
        section: 'Education',
      },
      {
        name: 'skills',
        type: 'textarea',
        required: false,
        placeholder: 'Comma-separated skills',
        section: 'Skills',
      },
    ],
  },
  {
    id: 'professional-classic',
    name: 'Professional Classic',
    description: 'Traditional resume format trusted by recruiters',
    category: 'classic',
    overleafUrl: 'https://www.overleaf.com/latex/templates',
    previewImage: '/templates/professional-classic.jpg',
    features: [
      'Traditional layout',
      'Two-column design',
      'Sidebar for skills',
      'PDF export',
    ],
    fields: [
      {
        name: 'fullName',
        type: 'text',
        required: true,
        placeholder: 'Your Full Name',
        section: 'Personal Info',
      },
      {
        name: 'email',
        type: 'email',
        required: true,
        placeholder: 'your.email@example.com',
        section: 'Personal Info',
      },
      {
        name: 'phone',
        type: 'phone',
        required: false,
        placeholder: '+1 (555) 123-4567',
        section: 'Personal Info',
      },
      {
        name: 'location',
        type: 'text',
        required: false,
        placeholder: 'City, Country',
        section: 'Personal Info',
      },
      {
        name: 'summary',
        type: 'textarea',
        required: false,
        placeholder: 'Professional objective or summary',
        section: 'Professional Summary',
      },
    ],
  },
  {
    id: 'creative-design',
    name: 'Creative Design',
    description: 'Modern design for creative professionals',
    category: 'creative',
    overleafUrl: 'https://www.overleaf.com/latex/templates',
    previewImage: '/templates/creative-design.jpg',
    features: [
      'Colorful accents',
      'Portfolio section',
      'Projects showcase',
      'Links section',
    ],
    fields: [
      {
        name: 'fullName',
        type: 'text',
        required: true,
        placeholder: 'Your Full Name',
        section: 'Personal Info',
      },
      {
        name: 'email',
        type: 'email',
        required: true,
        placeholder: 'your.email@example.com',
        section: 'Personal Info',
      },
      {
        name: 'phone',
        type: 'phone',
        required: false,
        placeholder: '+1 (555) 123-4567',
        section: 'Personal Info',
      },
      {
        name: 'portfolio',
        type: 'text',
        required: false,
        placeholder: 'Portfolio URL',
        section: 'Links',
      },
      {
        name: 'github',
        type: 'text',
        required: false,
        placeholder: 'GitHub URL',
        section: 'Links',
      },
      {
        name: 'projects',
        type: 'rich-text',
        required: false,
        placeholder: 'Notable projects',
        section: 'Projects',
      },
    ],
  },
  {
    id: 'minimal-one-page',
    name: 'Minimal One Page',
    description: 'Concise single-page resume format',
    category: 'minimal',
    overleafUrl: 'https://www.overleaf.com/latex/templates',
    previewImage: '/templates/minimal-one-page.jpg',
    features: [
      'One page',
      'Space efficient',
      'Clean typography',
      'Easy to scan',
    ],
    fields: [],
  },
];

/**
 * Get template by ID
 */
export function getTemplateById(id: string): ResumeTemplate | undefined {
  return RESUME_TEMPLATES.find((t) => t.id === id);
}

/**
 * Get templates by category
 */
export function getTemplatesByCategory(
  category: string
): ResumeTemplate[] {
  return RESUME_TEMPLATES.filter((t) => t.category === category);
}

/**
 * Export resume to HTML
 */
export function exportToHTML(
  resumeData: any,
  templateId: string
): string {
  const template = getTemplateById(templateId);
  if (!template) throw new Error('Template not found');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${resumeData.personalInfo?.fullName} - Resume</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      background: #f5f5f5;
    }
    .container {
      max-width: 8.5in;
      height: 11in;
      margin: 0 auto;
      background: white;
      padding: 0.5in;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    .header {
      border-bottom: 2px solid #9CCC65;
      margin-bottom: 20px;
      padding-bottom: 10px;
    }
    .name {
      font-size: 24px;
      font-weight: bold;
      color: #1a1a1a;
    }
    .contact {
      font-size: 11px;
      color: #666;
      margin-top: 5px;
    }
    .section-title {
      font-size: 14px;
      font-weight: bold;
      color: #9CCC65;
      border-bottom: 1px solid #ddd;
      margin-top: 15px;
      margin-bottom: 10px;
      padding-bottom: 5px;
    }
    .section-content {
      margin-bottom: 15px;
    }
    .job {
      margin-bottom: 10px;
    }
    .job-title {
      font-weight: bold;
      color: #1a1a1a;
    }
    .job-company {
      color: #666;
      font-style: italic;
    }
    .job-dates {
      font-size: 11px;
      color: #999;
    }
    .job-description {
      font-size: 11px;
      margin-top: 5px;
    }
    .skills {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
    .skill-tag {
      background: #e8f5e9;
      color: #7CB342;
      padding: 3px 8px;
      border-radius: 3px;
      font-size: 11px;
    }
    @media print {
      body {
        background: none;
      }
      .container {
        box-shadow: none;
        margin: 0;
        padding: 0;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="name">${resumeData.personalInfo?.fullName || 'Your Name'}</div>
      <div class="contact">
        ${resumeData.personalInfo?.email || ''} | ${resumeData.personalInfo?.phone || ''} | ${resumeData.personalInfo?.location || ''}
      </div>
    </div>

    ${resumeData.professionalSummary ? `
    <div class="section">
      <div class="section-title">PROFESSIONAL SUMMARY</div>
      <div class="section-content">${resumeData.professionalSummary}</div>
    </div>
    ` : ''}

    ${resumeData.experience && resumeData.experience.length > 0 ? `
    <div class="section">
      <div class="section-title">EXPERIENCE</div>
      <div class="section-content">
        ${resumeData.experience
          .map(
            (exp: any) => `
        <div class="job">
          <div class="job-title">${exp.jobTitle}</div>
          <div class="job-company">${exp.company}${exp.location ? `, ${exp.location}` : ''}</div>
          <div class="job-dates">${exp.startDate} - ${exp.endDate || 'Present'}</div>
          <div class="job-description">${exp.description}</div>
        </div>
        `
          )
          .join('')}
      </div>
    </div>
    ` : ''}

    ${resumeData.education && resumeData.education.length > 0 ? `
    <div class="section">
      <div class="section-title">EDUCATION</div>
      <div class="section-content">
        ${resumeData.education
          .map(
            (edu: any) => `
        <div class="job">
          <div class="job-title">${edu.school}</div>
          <div class="job-company">${edu.degree}${edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</div>
          <div class="job-dates">${edu.startDate}${edu.endDate ? ` - ${edu.endDate}` : ''}</div>
        </div>
        `
          )
          .join('')}
      </div>
    </div>
    ` : ''}

    ${resumeData.skills && resumeData.skills.length > 0 ? `
    <div class="section">
      <div class="section-title">SKILLS</div>
      <div class="skills">
        ${resumeData.skills
          .map(
            (skill: any) => `
        <div class="skill-tag">${typeof skill === 'string' ? skill : skill.name}</div>
        `
          )
          .join('')}
      </div>
    </div>
    ` : ''}
  </div>
</body>
</html>
  `;
}

/**
 * Export resume to PDF (requires backend service)
 */
export async function exportToPDF(
  resumeData: any,
  templateId: string
): Promise<Blob> {
  const response = await fetch('/api/export/pdf', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      resumeData,
      templateId,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to export to PDF');
  }

  return response.blob();
}

/**
 * Download resume
 */
export async function downloadResume(
  resumeData: any,
  templateId: string,
  format: 'pdf' | 'html' | 'docx' = 'pdf'
) {
  let content: Blob | string;
  let filename: string;
  let mimeType: string;

  if (format === 'html') {
    content = exportToHTML(resumeData, templateId);
    filename = `${resumeData.personalInfo?.fullName}-resume.html`;
    mimeType = 'text/html';
  } else if (format === 'pdf') {
    content = await exportToPDF(resumeData, templateId);
    filename = `${resumeData.personalInfo?.fullName}-resume.pdf`;
    mimeType = 'application/pdf';
  } else {
    throw new Error('Unsupported format');
  }

  const blob =
    content instanceof Blob
      ? content
      : new Blob([content], { type: mimeType });

  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
