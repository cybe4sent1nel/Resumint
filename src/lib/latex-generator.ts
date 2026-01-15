// LaTeX Resume Generator
// Converts resume data to LaTeX format

interface ResumeData {
  personalInfo: {
    name: string
    title: string
    email: string
    phone: string
    location: string
    linkedin: string
    website: string
    summary: string
    profilePicture?: string
  }
  experience: Array<{
    company: string
    position: string
    startDate: string
    endDate: string
    description: string
  }>
  education: Array<{
    school: string
    degree: string
    field: string
    startDate: string
    endDate: string
  }>
  skills: string[]
}

export function generateJakesResume(data: ResumeData, includeProfilePic: boolean = false): string {
  const profilePicSection = includeProfilePic && data.personalInfo.profilePicture
    ? `\\begin{minipage}[t]{0.2\\textwidth}
\\includegraphics[width=\\linewidth]{${data.personalInfo.profilePicture}}
\\end{minipage}
\\hfill
\\begin{minipage}[t]{0.75\\textwidth}`
    : ''

  const profilePicEnd = includeProfilePic && data.personalInfo.profilePicture ? '\\end{minipage}' : ''

  return `%-------------------------
% Resume in LaTeX
% Based on Jake's Resume Template
%------------------------

\\documentclass[letterpaper,11pt]{article}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\usepackage{graphicx}
\\input{glyphtounicode}

\\pagestyle{fancy}
\\fancyhf{}
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}

\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

\\pdfgentounicode=1

\\begin{document}

${profilePicSection}
\\begin{center}
    \\textbf{\\Huge \\scshape ${data.personalInfo.name}} \\\\ \\vspace{1pt}
    \\small ${data.personalInfo.phone} $|$ \\href{mailto:${data.personalInfo.email}}{\\underline{${data.personalInfo.email}}} $|$ 
    \\href{https://${data.personalInfo.linkedin}}{\\underline{${data.personalInfo.linkedin}}} $|$
    \\href{https://${data.personalInfo.website}}{\\underline{${data.personalInfo.website}}}
\\end{center}
${profilePicEnd}

%-----------SUMMARY-----------
\\section{Professional Summary}
${data.personalInfo.summary}

%-----------EXPERIENCE-----------
\\section{Experience}
  \\resumeSubHeadingListStart
${data.experience.map(exp => `
    \\resumeSubheading
      {${exp.position}}{${exp.startDate} -- ${exp.endDate}}
      {${exp.company}}{${data.personalInfo.location}}
      \\resumeItemListStart
        \\resumeItem{${exp.description}}
      \\resumeItemListEnd
`).join('')}
  \\resumeSubHeadingListEnd

%-----------EDUCATION-----------
\\section{Education}
  \\resumeSubHeadingListStart
${data.education.map(edu => `
    \\resumeSubheading
      {${edu.school}}{${edu.startDate} -- ${edu.endDate}}
      {${edu.degree} in ${edu.field}}{}
`).join('')}
  \\resumeSubHeadingListEnd

%-----------SKILLS-----------
\\section{Technical Skills}
 \\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
     \\textbf{Skills}{: ${data.skills.join(', ')}}
    }}
 \\end{itemize}

\\end{document}
`
}

export function generateModernCV(data: ResumeData, includeProfilePic: boolean = false): string {
  const profilePic = includeProfilePic && data.personalInfo.profilePicture
    ? `\\photo[64pt][0.4pt]{${data.personalInfo.profilePicture}}`
    : ''

  return `\\documentclass[11pt,a4paper,sans]{moderncv}

\\moderncvstyle{classic}
\\moderncvcolor{blue}

\\usepackage[scale=0.75]{geometry}

\\name{${data.personalInfo.name.split(' ')[0]}}{${data.personalInfo.name.split(' ').slice(1).join(' ')}}
\\title{${data.personalInfo.title}}
\\address{${data.personalInfo.location}}{}{}
\\phone[mobile]{${data.personalInfo.phone}}
\\email{${data.personalInfo.email}}
\\homepage{${data.personalInfo.website}}
\\social[linkedin]{${data.personalInfo.linkedin.replace('linkedin.com/in/', '')}}
${profilePic}

\\begin{document}

\\makecvtitle

\\section{Professional Summary}
${data.personalInfo.summary}

\\section{Experience}
${data.experience.map(exp => `
\\cventry{${exp.startDate}--${exp.endDate}}{${exp.position}}{${exp.company}}{${data.personalInfo.location}}{}{${exp.description}}
`).join('')}

\\section{Education}
${data.education.map(edu => `
\\cventry{${edu.startDate}--${edu.endDate}}{${edu.degree}}{${edu.school}}{${edu.field}}{}{}
`).join('')}

\\section{Skills}
\\cvitem{}{${data.skills.join(', ')}}

\\end{document}
`
}

export async function convertLatexToPDF(latexCode: string): Promise<Buffer> {
  // This would integrate with a LaTeX compilation service
  // Options:
  // 1. LaTeX.Online API
  // 2. node-latex package
  // 3. Docker container with TeX Live
  
  // For now, return a placeholder
  // In production, implement actual LaTeX compilation
  throw new Error('LaTeX to PDF conversion not yet implemented. Integrate with LaTeX.Online or node-latex')
}
