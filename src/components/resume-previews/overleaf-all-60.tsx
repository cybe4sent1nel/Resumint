// 60 Unique Overleaf Resume Templates - All Fields Comprehensive
import { Mail, Phone, MapPin, Linkedin, Globe, Github, Award, Briefcase, GraduationCap, Code, Book, Trophy } from "lucide-react"

interface ResumeData {
  personalInfo: {
    name: string
    title: string
    email: string
    phone: string
    location: string
    linkedin: string
    github: string
    website: string
    summary: string
    profilePicture?: string
    expectedSalary?: string
  }
  experience: Array<{
    id: string
    company: string
    position: string
    startDate: string
    endDate: string
    description: string
  }>
  education: Array<{
    id: string
    school: string
    degree: string
    field: string
    startDate: string
    endDate: string
  }>
  skills: string[]
  certifications?: Array<{
    id: string
    name: string
    issuer: string
    date: string
    credentialId?: string
  }>
  projects?: Array<{
    id: string
    name: string
    description: string
    technologies: string
    link?: string
  }>
  languages?: Array<{
    id: string
    language: string
    proficiency: string
  }>
  awards?: Array<{
    id: string
    title: string
    issuer: string
    date: string
    description?: string
  }>
}

const placeholderImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23ddd' width='200' height='200'/%3E%3Ctext fill='%23999' font-family='sans-serif' font-size='40' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3EPhoto%3C/text%3E%3C/svg%3E"

// TEMPLATE 1: AltaCV (Right Sidebar - Teal/Green Accent)
export function Template1({ data }: { data: ResumeData }) {
  const profilePic = data.personalInfo.profilePicture || placeholderImage
  return (
    <div className="bg-white" style={{ fontFamily: "Lato, sans-serif" }}>
      <div className="grid grid-cols-3 gap-0">
        {/* Main Content - Left Side */}
        <div className="col-span-2 p-4">
          {/* Header */}
          <div className="mb-3">
            <h1 className="text-3xl font-bold text-gray-900">{data.personalInfo.name}</h1>
            <p className="text-lg text-teal-600 mt-1">{data.personalInfo.title}</p>
          </div>

          {/* Summary */}
          {data.personalInfo.summary && (
            <div className="mb-3">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="h-px flex-1 bg-teal-600"></div>
                <h2 className="text-[11px] font-bold text-teal-700 uppercase tracking-wide">About Me</h2>
                <div className="h-px flex-1 bg-teal-600"></div>
              </div>
              <p className="text-[8px] text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
            </div>
          )}

          {/* Experience */}
          {data.experience && data.experience.length > 0 && (
            <div className="mb-3">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="h-px flex-1 bg-teal-600"></div>
                <h2 className="text-[11px] font-bold text-teal-700 uppercase tracking-wide">Experience</h2>
                <div className="h-px flex-1 bg-teal-600"></div>
              </div>
              <div className="space-y-2">
                {data.experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-[9px] font-bold text-gray-900">{exp.position}</h3>
                      <span className="text-[7px] text-gray-500">{exp.startDate} – {exp.endDate}</span>
                    </div>
                    <p className="text-[8px] text-teal-600 font-semibold">{exp.company}</p>
                    <p className="text-[7px] text-gray-600 mt-0.5 leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {data.projects && data.projects.length > 0 && (
            <div className="mb-3">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="h-px flex-1 bg-teal-600"></div>
                <h2 className="text-[11px] font-bold text-teal-700 uppercase tracking-wide">Projects</h2>
                <div className="h-px flex-1 bg-teal-600"></div>
              </div>
              <div className="space-y-1.5">
                {data.projects.map((proj) => (
                  <div key={proj.id}>
                    <h3 className="text-[8px] font-bold text-gray-900">{proj.name}</h3>
                    <p className="text-[7px] text-gray-600 leading-relaxed">{proj.description}</p>
                    <p className="text-[7px] text-teal-600 mt-0.5">
                      <span className="font-semibold">Technologies:</span> {proj.technologies}
                    </p>
                    {proj.link && (
                      <p className="text-[6px] text-gray-500 truncate">{proj.link}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {data.education && data.education.length > 0 && (
            <div className="mb-3">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="h-px flex-1 bg-teal-600"></div>
                <h2 className="text-[11px] font-bold text-teal-700 uppercase tracking-wide">Education</h2>
                <div className="h-px flex-1 bg-teal-600"></div>
              </div>
              <div className="space-y-1.5">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-[8px] font-bold text-gray-900">{edu.degree} in {edu.field}</h3>
                      <span className="text-[7px] text-gray-500">{edu.startDate} – {edu.endDate}</span>
                    </div>
                    <p className="text-[7px] text-teal-600">{edu.school}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Awards */}
          {data.awards && data.awards.length > 0 && (
            <div className="mb-3">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="h-px flex-1 bg-teal-600"></div>
                <h2 className="text-[11px] font-bold text-teal-700 uppercase tracking-wide">Awards</h2>
                <div className="h-px flex-1 bg-teal-600"></div>
              </div>
              <div className="space-y-1">
                {data.awards.map((award) => (
                  <div key={award.id}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-[8px] font-semibold text-gray-900">{award.title}</h3>
                      <span className="text-[7px] text-gray-500">{award.date}</span>
                    </div>
                    <p className="text-[7px] text-teal-600">{award.issuer}</p>
                    {award.description && (
                      <p className="text-[6px] text-gray-600 mt-0.5">{award.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="col-span-1 bg-teal-50 p-3 space-y-3">
          {/* Profile Picture */}
          <div className="flex justify-center">
            <img 
              src={profilePic} 
              className="w-24 h-24 rounded-full border-4 border-teal-600 object-cover" 
              alt="Profile" 
            />
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-[9px] font-bold text-teal-800 mb-1.5 uppercase tracking-wide">Contact</h3>
            <div className="space-y-1 text-[7px] text-gray-700">
              {data.personalInfo.email && (
                <div className="flex items-start gap-1.5">
                  <Mail className="h-2.5 w-2.5 mt-0.5 flex-shrink-0 text-teal-600" />
                  <span className="break-all">{data.personalInfo.email}</span>
                </div>
              )}
              {data.personalInfo.phone && (
                <div className="flex items-center gap-1.5">
                  <Phone className="h-2.5 w-2.5 flex-shrink-0 text-teal-600" />
                  <span>{data.personalInfo.phone}</span>
                </div>
              )}
              {data.personalInfo.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-2.5 w-2.5 flex-shrink-0 text-teal-600" />
                  <span>{data.personalInfo.location}</span>
                </div>
              )}
              {data.personalInfo.linkedin && (
                <div className="flex items-start gap-1.5">
                  <Linkedin className="h-2.5 w-2.5 mt-0.5 flex-shrink-0 text-teal-600" />
                  <span className="break-all text-[6px]">{data.personalInfo.linkedin}</span>
                </div>
              )}
              {data.personalInfo.github && (
                <div className="flex items-start gap-1.5">
                  <Github className="h-2.5 w-2.5 mt-0.5 flex-shrink-0 text-teal-600" />
                  <span className="break-all text-[6px]">{data.personalInfo.github}</span>
                </div>
              )}
              {data.personalInfo.website && (
                <div className="flex items-start gap-1.5">
                  <Globe className="h-2.5 w-2.5 mt-0.5 flex-shrink-0 text-teal-600" />
                  <span className="break-all text-[6px]">{data.personalInfo.website}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <div>
              <h3 className="text-[9px] font-bold text-teal-800 mb-1.5 uppercase tracking-wide">Skills</h3>
              <div className="flex flex-wrap gap-1">
                {data.skills.map((skill, i) => (
                  <span 
                    key={i} 
                    className="px-1.5 py-0.5 bg-teal-600 text-white text-[6px] rounded-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {data.languages && data.languages.length > 0 && (
            <div>
              <h3 className="text-[9px] font-bold text-teal-800 mb-1.5 uppercase tracking-wide">Languages</h3>
              <div className="space-y-1">
                {data.languages.map((lang) => (
                  <div key={lang.id} className="text-[7px]">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-900">{lang.language}</span>
                      <span className="text-teal-600 text-[6px]">{lang.proficiency}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {data.certifications && data.certifications.length > 0 && (
            <div>
              <h3 className="text-[9px] font-bold text-teal-800 mb-1.5 uppercase tracking-wide">Certifications</h3>
              <div className="space-y-1.5">
                {data.certifications.map((cert) => (
                  <div key={cert.id}>
                    <p className="text-[7px] font-semibold text-gray-900">{cert.name}</p>
                    <p className="text-[6px] text-teal-600">{cert.issuer}</p>
                    <p className="text-[6px] text-gray-500">{cert.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// TEMPLATE 2: ModernCV Classic (Blue Theme, Left Sidebar)
export function Template2({ data }: { data: ResumeData }) {
  const profilePic = data.personalInfo.profilePicture || placeholderImage
  return (
    <div className="bg-white" style={{ fontFamily: "Computer Modern, serif" }}>
      {/* Header */}
      <div className="bg-blue-800 text-white p-4">
        <div className="flex items-center gap-4">
          <img src={profilePic} className="w-20 h-20 rounded-full border-4 border-white" alt="Profile" />
          <div>
            <h1 className="text-2xl font-bold">{data.personalInfo.name}</h1>
            <p className="text-base text-blue-100 mt-1">{data.personalInfo.title}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-x-3 gap-y-1 mt-3 text-[7px]">
          {data.personalInfo.email && <div className="flex items-center gap-1"><Mail className="h-2 w-2" />{data.personalInfo.email}</div>}
          {data.personalInfo.phone && <div className="flex items-center gap-1"><Phone className="h-2 w-2" />{data.personalInfo.phone}</div>}
          {data.personalInfo.location && <div className="flex items-center gap-1"><MapPin className="h-2 w-2" />{data.personalInfo.location}</div>}
          {data.personalInfo.linkedin && <div className="flex items-center gap-1"><Linkedin className="h-2 w-2" /><span className="truncate text-[6px]">{data.personalInfo.linkedin}</span></div>}
          {data.personalInfo.github && <div className="flex items-center gap-1"><Github className="h-2 w-2" /><span className="truncate text-[6px]">{data.personalInfo.github}</span></div>}
          {data.personalInfo.website && <div className="flex items-center gap-1"><Globe className="h-2 w-2" /><span className="truncate text-[6px]">{data.personalInfo.website}</span></div>}
        </div>
      </div>

      <div className="p-4">
        {data.personalInfo.summary && <div className="mb-3"><h2 className="text-[10px] font-bold text-blue-900 border-b-2 border-blue-800 pb-0.5 mb-1.5 uppercase">About</h2><p className="text-[8px] text-gray-700 leading-relaxed">{data.personalInfo.summary}</p></div>}
        {data.experience && data.experience.length > 0 && <div className="mb-3"><h2 className="text-[10px] font-bold text-blue-900 border-b-2 border-blue-800 pb-0.5 mb-1.5 uppercase">Experience</h2><div className="space-y-2">{data.experience.map(exp => <div key={exp.id}><div className="flex justify-between"><div><h3 className="text-[8px] font-bold text-gray-900">{exp.position}</h3><p className="text-[7px] text-blue-800 italic">{exp.company}</p></div><span className="text-[7px] text-gray-500">{exp.startDate} – {exp.endDate}</span></div><p className="text-[7px] text-gray-600 mt-0.5">{exp.description}</p></div>)}</div></div>}
        {data.education && data.education.length > 0 && <div className="mb-3"><h2 className="text-[10px] font-bold text-blue-900 border-b-2 border-blue-800 pb-0.5 mb-1.5 uppercase">Education</h2><div className="space-y-1.5">{data.education.map(edu => <div key={edu.id}><div className="flex justify-between"><h3 className="text-[8px] font-bold">{edu.degree} in {edu.field}</h3><span className="text-[7px] text-gray-500">{edu.startDate} – {edu.endDate}</span></div><p className="text-[7px] text-blue-800">{edu.school}</p></div>)}</div></div>}
        <div className="grid grid-cols-2 gap-3">
          {data.skills && data.skills.length > 0 && <div><h2 className="text-[10px] font-bold text-blue-900 border-b-2 border-blue-800 pb-0.5 mb-1.5 uppercase">Skills</h2><div className="flex flex-wrap gap-0.5">{data.skills.map((skill, i) => <span key={i} className="px-1.5 py-0.5 bg-blue-100 text-blue-900 rounded text-[7px]">{skill}</span>)}</div></div>}
          {data.languages && data.languages.length > 0 && <div><h2 className="text-[10px] font-bold text-blue-900 border-b-2 border-blue-800 pb-0.5 mb-1.5 uppercase">Languages</h2><div className="space-y-0.5">{data.languages.map(lang => <div key={lang.id} className="text-[7px]">{lang.language}: {lang.proficiency}</div>)}</div></div>}
        </div>
        {data.projects && data.projects.length > 0 && <div className="mt-3"><h2 className="text-[10px] font-bold text-blue-900 border-b-2 border-blue-800 pb-0.5 mb-1.5 uppercase">Projects</h2><div className="space-y-1.5">{data.projects.map(proj => <div key={proj.id}><h3 className="text-[8px] font-bold">{proj.name}</h3><p className="text-[7px] text-gray-600">{proj.description}</p><p className="text-[7px] text-blue-800">Tech: {proj.technologies}</p></div>)}</div></div>}
        {data.certifications && data.certifications.length > 0 && <div className="mt-3"><h2 className="text-[10px] font-bold text-blue-900 border-b-2 border-blue-800 pb-0.5 mb-1.5 uppercase">Certifications</h2><div className="space-y-1">{data.certifications.map(cert => <div key={cert.id}><p className="text-[7px] font-semibold">{cert.name}</p><p className="text-[6px] text-gray-600">{cert.issuer} – {cert.date}</p></div>)}</div></div>}
        {data.awards && data.awards.length > 0 && <div className="mt-3"><h2 className="text-[10px] font-bold text-blue-900 border-b-2 border-blue-800 pb-0.5 mb-1.5 uppercase">Awards</h2><div className="space-y-1">{data.awards.map(award => <div key={award.id}><div className="flex justify-between"><span className="text-[7px] font-semibold">{award.title}</span><span className="text-[6px] text-gray-500">{award.date}</span></div><p className="text-[6px] text-gray-600">{award.issuer}</p></div>)}</div></div>}
      </div>
    </div>
  )
}
// TEMPLATE 3: Simple Hipster CV (Modern Minimalist, Sidebar)
export function Template3({ data }: { data: ResumeData }) {
  const profilePic = data.personalInfo.profilePicture || placeholderImage
  return (
    <div className="bg-white grid grid-cols-4 min-h-full" style={{ fontFamily: "Roboto, sans-serif" }}>
      {/* Left Sidebar */}
      <div className="col-span-1 bg-gray-800 text-white p-3">
        <img src={profilePic} className="w-full aspect-square rounded-full mb-3 border-2 border-gray-300" alt="Profile" />
        <div className="space-y-3">
          {(data.personalInfo.email || data.personalInfo.phone || data.personalInfo.location) && <div><h3 className="text-[9px] font-bold uppercase tracking-wide mb-1.5 border-b border-gray-600 pb-0.5">Contact</h3><div className="space-y-1 text-[7px]">{data.personalInfo.email && <div className="flex items-start gap-1"><Mail className="h-2 w-2 mt-0.5 flex-shrink-0" /><span className="break-all">{data.personalInfo.email}</span></div>}{data.personalInfo.phone && <div className="flex items-center gap-1"><Phone className="h-2 w-2 flex-shrink-0" />{data.personalInfo.phone}</div>}{data.personalInfo.location && <div className="flex items-start gap-1"><MapPin className="h-2 w-2 mt-0.5 flex-shrink-0" />{data.personalInfo.location}</div>}</div></div>}
          {data.skills && data.skills.length > 0 && <div><h3 className="text-[9px] font-bold uppercase tracking-wide mb-1.5 border-b border-gray-600 pb-0.5">Skills</h3><div className="flex flex-wrap gap-0.5">{data.skills.map((skill, i) => <span key={i} className="text-[6px] bg-gray-700 px-1 py-0.5 rounded">{skill}</span>)}</div></div>}
          {data.languages && data.languages.length > 0 && <div><h3 className="text-[9px] font-bold uppercase tracking-wide mb-1.5 border-b border-gray-600 pb-0.5">Languages</h3><div className="space-y-0.5 text-[7px]">{data.languages.map(lang => <div key={lang.id}><div className="font-medium">{lang.language}</div><div className="text-gray-400 text-[6px]">{lang.proficiency}</div></div>)}</div></div>}
          {(data.personalInfo.linkedin || data.personalInfo.github || data.personalInfo.website) && <div><h3 className="text-[9px] font-bold uppercase tracking-wide mb-1.5 border-b border-gray-600 pb-0.5">Links</h3><div className="space-y-1 text-[6px]">{data.personalInfo.linkedin && <div className="flex items-center gap-1"><Linkedin className="h-2 w-2" /><span className="truncate">{data.personalInfo.linkedin.replace('https://linkedin.com/in/', '')}</span></div>}{data.personalInfo.github && <div className="flex items-center gap-1"><Github className="h-2 w-2" /><span className="truncate">{data.personalInfo.github.replace('https://github.com/', '')}</span></div>}{data.personalInfo.website && <div className="flex items-center gap-1"><Globe className="h-2 w-2" /><span className="truncate">{data.personalInfo.website}</span></div>}</div></div>}
        </div>
      </div>
      
      {/* Main Content */}
      <div className="col-span-3 p-4">
        <div className="mb-4"><h1 className="text-3xl font-bold text-gray-900">{data.personalInfo.name}</h1><p className="text-lg text-gray-600 mt-0.5">{data.personalInfo.title}</p></div>
        {data.personalInfo.summary && <div className="mb-4"><h2 className="text-[11px] font-bold text-gray-900 uppercase tracking-wide mb-1.5">About Me</h2><p className="text-[8px] text-gray-700 leading-relaxed">{data.personalInfo.summary}</p></div>}
        {data.experience && data.experience.length > 0 && <div className="mb-4"><h2 className="text-[11px] font-bold text-gray-900 uppercase tracking-wide mb-1.5">Experience</h2><div className="space-y-2.5">{data.experience.map(exp => <div key={exp.id}><div className="flex justify-between items-baseline"><h3 className="text-[9px] font-bold text-gray-900">{exp.position}</h3><span className="text-[7px] text-gray-500">{exp.startDate} – {exp.endDate}</span></div><p className="text-[8px] text-gray-600 italic">{exp.company}</p><p className="text-[7px] text-gray-600 mt-0.5 leading-snug">{exp.description}</p></div>)}</div></div>}
        {data.education && data.education.length > 0 && <div className="mb-4"><h2 className="text-[11px] font-bold text-gray-900 uppercase tracking-wide mb-1.5">Education</h2><div className="space-y-2">{data.education.map(edu => <div key={edu.id}><div className="flex justify-between items-baseline"><h3 className="text-[9px] font-bold">{edu.degree} in {edu.field}</h3><span className="text-[7px] text-gray-500">{edu.startDate} – {edu.endDate}</span></div><p className="text-[8px] text-gray-600">{edu.school}</p></div>)}</div></div>}
        {data.projects && data.projects.length > 0 && <div className="mb-4"><h2 className="text-[11px] font-bold text-gray-900 uppercase tracking-wide mb-1.5">Projects</h2><div className="space-y-2">{data.projects.map(proj => <div key={proj.id}><h3 className="text-[9px] font-bold">{proj.name}</h3><p className="text-[7px] text-gray-600 leading-snug">{proj.description}</p><p className="text-[6px] text-gray-500 mt-0.5">Technologies: {proj.technologies}</p>{proj.link && <a href={proj.link} className="text-[6px] text-blue-600 underline">{proj.link}</a>}</div>)}</div></div>}
        {data.certifications && data.certifications.length > 0 && <div className="mb-4"><h2 className="text-[11px] font-bold text-gray-900 uppercase tracking-wide mb-1.5">Certifications</h2><div className="grid grid-cols-2 gap-x-3 gap-y-1.5">{data.certifications.map(cert => <div key={cert.id}><p className="text-[7px] font-semibold">{cert.name}</p><p className="text-[6px] text-gray-600">{cert.issuer} – {cert.date}</p></div>)}</div></div>}
        {data.awards && data.awards.length > 0 && <div><h2 className="text-[11px] font-bold text-gray-900 uppercase tracking-wide mb-1.5">Awards & Honors</h2><div className="space-y-1.5">{data.awards.map(award => <div key={award.id}><div className="flex justify-between"><span className="text-[8px] font-semibold">{award.title}</span><span className="text-[6px] text-gray-500">{award.date}</span></div><p className="text-[6px] text-gray-600">{award.issuer}</p>{award.description && <p className="text-[6px] text-gray-500 mt-0.5">{award.description}</p>}</div>)}</div></div>}
      </div>
    </div>
  )
}
// TEMPLATE 4: Deedy CV (Compact Two-Column, Bold Typography)
export function Template4({ data }: { data: ResumeData }) {
  const profilePic = data.personalInfo.profilePicture || placeholderImage
  return (
    <div className="bg-white p-4" style={{ fontFamily: "Roboto, sans-serif" }}>
      {/* Header */}
      <div className="flex items-start gap-3 mb-3 pb-2 border-b-2 border-gray-900">
        <img src={profilePic} className="w-16 h-16 rounded-md" alt="Profile" />
        <div className="flex-1"><h1 className="text-2xl font-bold text-gray-900 tracking-tight">{data.personalInfo.name}</h1><p className="text-sm text-gray-700 font-medium mt-0.5">{data.personalInfo.title}</p><div className="flex flex-wrap gap-x-2 gap-y-0.5 mt-1 text-[7px] text-gray-600">{data.personalInfo.email && <span>{data.personalInfo.email}</span>}{data.personalInfo.phone && <span>• {data.personalInfo.phone}</span>}{data.personalInfo.location && <span>• {data.personalInfo.location}</span>}{data.personalInfo.linkedin && <span>• LinkedIn</span>}{data.personalInfo.github && <span>• GitHub</span>}</div></div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {/* Left Column */}
        <div className="col-span-2 space-y-3">
          {data.personalInfo.summary && <div><h2 className="text-[10px] font-bold text-gray-900 uppercase tracking-wider mb-1">Summary</h2><p className="text-[7px] text-gray-700 leading-relaxed">{data.personalInfo.summary}</p></div>}
          {data.experience && data.experience.length > 0 && <div><h2 className="text-[10px] font-bold text-gray-900 uppercase tracking-wider mb-1">Experience</h2><div className="space-y-2">{data.experience.map(exp => <div key={exp.id}><div className="flex justify-between items-baseline"><div><h3 className="text-[8px] font-bold text-gray-900">{exp.position}</h3><p className="text-[7px] text-gray-600">{exp.company}</p></div><span className="text-[6px] text-gray-500 font-semibold">{exp.startDate} – {exp.endDate}</span></div><p className="text-[7px] text-gray-600 mt-0.5 leading-snug">{exp.description}</p></div>)}</div></div>}
          {data.projects && data.projects.length > 0 && <div><h2 className="text-[10px] font-bold text-gray-900 uppercase tracking-wider mb-1">Projects</h2><div className="space-y-1.5">{data.projects.map(proj => <div key={proj.id}><h3 className="text-[8px] font-bold text-gray-900">{proj.name}</h3><p className="text-[7px] text-gray-600 leading-snug">{proj.description}</p><p className="text-[6px] text-gray-500 italic mt-0.5">{proj.technologies}</p></div>)}</div></div>}
        </div>

        {/* Right Column */}
        <div className="space-y-3">
          {data.education && data.education.length > 0 && <div><h2 className="text-[10px] font-bold text-gray-900 uppercase tracking-wider mb-1">Education</h2><div className="space-y-1.5">{data.education.map(edu => <div key={edu.id}><h3 className="text-[7px] font-bold text-gray-900">{edu.degree}</h3><p className="text-[7px] text-gray-600">{edu.field}</p><p className="text-[6px] text-gray-500">{edu.school}</p><p className="text-[6px] text-gray-400">{edu.startDate} – {edu.endDate}</p></div>)}</div></div>}
          {data.skills && data.skills.length > 0 && <div><h2 className="text-[10px] font-bold text-gray-900 uppercase tracking-wider mb-1">Skills</h2><div className="flex flex-wrap gap-0.5">{data.skills.map((skill, i) => <span key={i} className="text-[6px] bg-gray-200 text-gray-800 px-1 py-0.5 rounded font-medium">{skill}</span>)}</div></div>}
          {data.languages && data.languages.length > 0 && <div><h2 className="text-[10px] font-bold text-gray-900 uppercase tracking-wider mb-1">Languages</h2><div className="space-y-0.5">{data.languages.map(lang => <div key={lang.id} className="text-[7px]"><span className="font-semibold">{lang.language}</span><span className="text-gray-500"> - {lang.proficiency}</span></div>)}</div></div>}
          {data.certifications && data.certifications.length > 0 && <div><h2 className="text-[10px] font-bold text-gray-900 uppercase tracking-wider mb-1">Certifications</h2><div className="space-y-1">{data.certifications.map(cert => <div key={cert.id}><p className="text-[6px] font-semibold text-gray-900">{cert.name}</p><p className="text-[6px] text-gray-600">{cert.issuer}</p><p className="text-[5px] text-gray-500">{cert.date}</p></div>)}</div></div>}
          {data.awards && data.awards.length > 0 && <div><h2 className="text-[10px] font-bold text-gray-900 uppercase tracking-wider mb-1">Awards</h2><div className="space-y-1">{data.awards.map(award => <div key={award.id}><p className="text-[7px] font-semibold">{award.title}</p><p className="text-[6px] text-gray-600">{award.issuer}</p><p className="text-[5px] text-gray-500">{award.date}</p></div>)}</div></div>}
        </div>
      </div>
    </div>
  )
}
// TEMPLATE 5: Academic CV (Traditional, Serif Font)
export function Template5({ data }: { data: ResumeData }) {
  const profilePic = data.personalInfo.profilePicture || placeholderImage
  return (
    <div className="bg-white p-4" style={{ fontFamily: "Computer Modern, serif" }}>
      <div className="text-center mb-4 pb-2 border-b border-gray-400">
        <h1 className="text-2xl font-bold text-gray-900">{data.personalInfo.name}</h1>
        <p className="text-sm text-gray-700 mt-1">{data.personalInfo.title}</p>
        <div className="flex justify-center gap-2 mt-1.5 text-[7px] text-gray-600">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>• {data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>• {data.personalInfo.location}</span>}
        </div>
      </div>
      {data.personalInfo.summary && <div className="mb-3"><h2 className="text-[10px] font-bold text-gray-900 mb-1.5">PROFILE</h2><p className="text-[8px] text-gray-700 leading-relaxed text-justify">{data.personalInfo.summary}</p></div>}
      {data.education && data.education.length > 0 && <div className="mb-3"><h2 className="text-[10px] font-bold text-gray-900 mb-1.5">EDUCATION</h2><div className="space-y-2">{data.education.map(edu => <div key={edu.id}><div className="flex justify-between"><div><h3 className="text-[8px] font-bold">{edu.degree} in {edu.field}</h3><p className="text-[7px] text-gray-600 italic">{edu.school}</p></div><span className="text-[7px] text-gray-500">{edu.startDate} – {edu.endDate}</span></div></div>)}</div></div>}
      {data.experience && data.experience.length > 0 && <div className="mb-3"><h2 className="text-[10px] font-bold text-gray-900 mb-1.5">PROFESSIONAL EXPERIENCE</h2><div className="space-y-2">{data.experience.map(exp => <div key={exp.id}><div className="flex justify-between"><div><h3 className="text-[8px] font-bold">{exp.position}</h3><p className="text-[7px] text-gray-600 italic">{exp.company}</p></div><span className="text-[7px] text-gray-500">{exp.startDate} – {exp.endDate}</span></div><p className="text-[7px] text-gray-600 mt-0.5 leading-relaxed text-justify">{exp.description}</p></div>)}</div></div>}
      {data.skills && data.skills.length > 0 && <div className="mb-3"><h2 className="text-[10px] font-bold text-gray-900 mb-1.5">SKILLS & COMPETENCIES</h2><p className="text-[8px] text-gray-700">{data.skills.join(' • ')}</p></div>}
      {data.projects && data.projects.length > 0 && <div className="mb-3"><h2 className="text-[10px] font-bold text-gray-900 mb-1.5">RESEARCH & PROJECTS</h2><div className="space-y-1.5">{data.projects.map(proj => <div key={proj.id}><h3 className="text-[8px] font-bold">{proj.name}</h3><p className="text-[7px] text-gray-600 text-justify">{proj.description}</p></div>)}</div></div>}
      {data.certifications && data.certifications.length > 0 && <div className="mb-3"><h2 className="text-[10px] font-bold text-gray-900 mb-1.5">CERTIFICATIONS & TRAINING</h2><div className="space-y-1">{data.certifications.map(cert => <div key={cert.id} className="flex justify-between"><span className="text-[7px] font-semibold">{cert.name}</span><span className="text-[7px] text-gray-500">{cert.issuer}, {cert.date}</span></div>)}</div></div>}
      {data.languages && data.languages.length > 0 && <div className="mb-3"><h2 className="text-[10px] font-bold text-gray-900 mb-1.5">LANGUAGES</h2><div className="grid grid-cols-3 gap-1">{data.languages.map(lang => <span key={lang.id} className="text-[7px]">{lang.language} ({lang.proficiency})</span>)}</div></div>}
      {data.awards && data.awards.length > 0 && <div><h2 className="text-[10px] font-bold text-gray-900 mb-1.5">HONORS & AWARDS</h2><div className="space-y-1">{data.awards.map(award => <div key={award.id} className="flex justify-between"><span className="text-[7px] font-semibold">{award.title}</span><span className="text-[7px] text-gray-500">{award.issuer}, {award.date}</span></div>)}</div></div>}
    </div>
  )
}
// TEMPLATE 6: Creative CV (Colorful, Modern Design)
export function Template6({ data }: { data: ResumeData }) {
  const profilePic = data.personalInfo.profilePicture || placeholderImage
  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50" style={{ fontFamily: "Roboto, sans-serif" }}>
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4">
        <div className="flex items-center gap-3">
          <img src={profilePic} className="w-20 h-20 rounded-full border-4 border-white shadow-lg" alt="Profile" />
          <div><h1 className="text-2xl font-bold">{data.personalInfo.name}</h1><p className="text-base mt-0.5">{data.personalInfo.title}</p></div>
        </div>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2 space-y-3">
            {data.personalInfo.summary && <div className="bg-white p-2 rounded-lg shadow-sm"><h2 className="text-[10px] font-bold text-purple-600 mb-1 uppercase">About</h2><p className="text-[8px] text-gray-700 leading-relaxed">{data.personalInfo.summary}</p></div>}
            {data.experience && data.experience.length > 0 && <div className="bg-white p-2 rounded-lg shadow-sm"><h2 className="text-[10px] font-bold text-purple-600 mb-1.5 uppercase">Experience</h2><div className="space-y-2">{data.experience.map(exp => <div key={exp.id}><div className="flex justify-between"><h3 className="text-[8px] font-bold">{exp.position}</h3><span className="text-[6px] text-gray-500">{exp.startDate} – {exp.endDate}</span></div><p className="text-[7px] text-purple-600">{exp.company}</p><p className="text-[7px] text-gray-600 mt-0.5">{exp.description}</p></div>)}</div></div>}
            {data.projects && data.projects.length > 0 && <div className="bg-white p-2 rounded-lg shadow-sm"><h2 className="text-[10px] font-bold text-purple-600 mb-1.5 uppercase">Projects</h2><div className="space-y-1.5">{data.projects.map(proj => <div key={proj.id}><h3 className="text-[8px] font-bold">{proj.name}</h3><p className="text-[7px] text-gray-600">{proj.description}</p><p className="text-[6px] text-purple-600">{proj.technologies}</p></div>)}</div></div>}
          </div>
          <div className="space-y-3">
            {(data.personalInfo.email || data.personalInfo.phone || data.personalInfo.location) && <div className="bg-white p-2 rounded-lg shadow-sm"><h2 className="text-[10px] font-bold text-pink-600 mb-1.5 uppercase">Contact</h2><div className="space-y-1 text-[7px]">{data.personalInfo.email && <div className="flex items-center gap-1"><Mail className="h-2 w-2 text-pink-600" />{data.personalInfo.email}</div>}{data.personalInfo.phone && <div className="flex items-center gap-1"><Phone className="h-2 w-2 text-pink-600" />{data.personalInfo.phone}</div>}{data.personalInfo.location && <div className="flex items-center gap-1"><MapPin className="h-2 w-2 text-pink-600" />{data.personalInfo.location}</div>}</div></div>}
            {data.education && data.education.length > 0 && <div className="bg-white p-2 rounded-lg shadow-sm"><h2 className="text-[10px] font-bold text-pink-600 mb-1.5 uppercase">Education</h2><div className="space-y-1.5">{data.education.map(edu => <div key={edu.id}><h3 className="text-[7px] font-bold">{edu.degree}</h3><p className="text-[6px] text-gray-600">{edu.field}</p><p className="text-[6px] text-gray-500">{edu.school}</p></div>)}</div></div>}
            {data.skills && data.skills.length > 0 && <div className="bg-white p-2 rounded-lg shadow-sm"><h2 className="text-[10px] font-bold text-pink-600 mb-1.5 uppercase">Skills</h2><div className="flex flex-wrap gap-0.5">{data.skills.map((skill, i) => <span key={i} className="text-[6px] bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-1 py-0.5 rounded">{skill}</span>)}</div></div>}
            {data.languages && data.languages.length > 0 && <div className="bg-white p-2 rounded-lg shadow-sm"><h2 className="text-[10px] font-bold text-pink-600 mb-1.5 uppercase">Languages</h2><div className="space-y-0.5 text-[7px]">{data.languages.map(lang => <div key={lang.id}>{lang.language}: {lang.proficiency}</div>)}</div></div>}
            {data.certifications && data.certifications.length > 0 && <div className="bg-white p-2 rounded-lg shadow-sm"><h2 className="text-[10px] font-bold text-pink-600 mb-1.5 uppercase">Certifications</h2><div className="space-y-1">{data.certifications.map(cert => <div key={cert.id}><p className="text-[6px] font-semibold">{cert.name}</p><p className="text-[6px] text-gray-600">{cert.issuer}</p></div>)}</div></div>}
            {data.awards && data.awards.length > 0 && <div className="bg-white p-2 rounded-lg shadow-sm"><h2 className="text-[10px] font-bold text-pink-600 mb-1.5 uppercase">Awards</h2><div className="space-y-1">{data.awards.map(award => <div key={award.id}><p className="text-[6px] font-semibold">{award.title}</p><p className="text-[6px] text-gray-600">{award.issuer}</p></div>)}</div></div>}
          </div>
        </div>
      </div>
    </div>
  )
}
// TEMPLATE 7: Minimal Black & White
export function Template7({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white p-4" style={{ fontFamily: "'Helvetica Neue', sans-serif" }}>
      <div className="border-l-4 border-black pl-3 mb-4">
        <h1 className="text-3xl font-bold text-black">{data.personalInfo.name}</h1>
        <p className="text-sm text-gray-700 mt-1">{data.personalInfo.title}</p>
      </div>
      {data.personalInfo.summary && <div className="mb-4"><p className="text-[8px] text-gray-700 leading-relaxed italic border-l-2 border-gray-300 pl-2">{data.personalInfo.summary}</p></div>}
      {data.experience && data.experience.length > 0 && <div className="mb-4"><h2 className="text-[11px] font-bold text-black mb-2 uppercase tracking-widest">Experience</h2><div className="space-y-3">{data.experience.map(exp => <div key={exp.id} className="border-l-2 border-gray-300 pl-2"><div className="flex justify-between"><h3 className="text-[9px] font-bold">{exp.position}</h3><span className="text-[7px] text-gray-600">{exp.startDate} – {exp.endDate}</span></div><p className="text-[8px] text-gray-700">{exp.company}</p><p className="text-[7px] text-gray-600 mt-1">{exp.description}</p></div>)}</div></div>}
      {data.education && data.education.length > 0 && <div className="mb-4"><h2 className="text-[11px] font-bold text-black mb-2 uppercase tracking-widest">Education</h2><div className="space-y-2">{data.education.map(edu => <div key={edu.id} className="border-l-2 border-gray-300 pl-2"><div className="flex justify-between"><h3 className="text-[8px] font-bold">{edu.degree} in {edu.field}</h3><span className="text-[7px] text-gray-600">{edu.startDate} – {edu.endDate}</span></div><p className="text-[8px] text-gray-700">{edu.school}</p></div>)}</div></div>}
      <div className="grid grid-cols-2 gap-4">
        {data.skills && data.skills.length > 0 && <div><h2 className="text-[11px] font-bold text-black mb-2 uppercase tracking-widest">Skills</h2><div className="space-y-0.5">{data.skills.map((skill, i) => <div key={i} className="text-[7px] text-gray-700">• {skill}</div>)}</div></div>}
        {data.languages && data.languages.length > 0 && <div><h2 className="text-[11px] font-bold text-black mb-2 uppercase tracking-widest">Languages</h2><div className="space-y-0.5">{data.languages.map(lang => <div key={lang.id} className="text-[7px] text-gray-700">• {lang.language} - {lang.proficiency}</div>)}</div></div>}
      </div>
      {data.projects && data.projects.length > 0 && <div className="mt-4"><h2 className="text-[11px] font-bold text-black mb-2 uppercase tracking-widest">Projects</h2><div className="space-y-2">{data.projects.map(proj => <div key={proj.id} className="border-l-2 border-gray-300 pl-2"><h3 className="text-[8px] font-bold">{proj.name}</h3><p className="text-[7px] text-gray-600">{proj.description}</p></div>)}</div></div>}
      {data.certifications && data.certifications.length > 0 && <div className="mt-4"><h2 className="text-[11px] font-bold text-black mb-2 uppercase tracking-widest">Certifications</h2><div className="grid grid-cols-2 gap-1">{data.certifications.map(cert => <div key={cert.id} className="text-[7px]">• {cert.name} ({cert.issuer})</div>)}</div></div>}
      {data.awards && data.awards.length > 0 && <div className="mt-4"><h2 className="text-[11px] font-bold text-black mb-2 uppercase tracking-widest">Awards</h2><div className="space-y-1">{data.awards.map(award => <div key={award.id} className="text-[7px]">• {award.title} - {award.issuer} ({award.date})</div>)}</div></div>}
    </div>
  )
}
// TEMPLATE 8: Professional Green (Banking/Finance Style)
export function Template8({ data }: { data: ResumeData }) {
  const profilePic = data.personalInfo.profilePicture || placeholderImage
  return (
    <div className="bg-white" style={{ fontFamily: "'Times New Roman', serif" }}>
      <div className="bg-green-700 text-white p-3">
        <div className="flex justify-between items-center">
          <div><h1 className="text-2xl font-bold">{data.personalInfo.name}</h1><p className="text-sm mt-0.5">{data.personalInfo.title}</p></div>
          <img src={profilePic} className="w-16 h-16 rounded-md border-2 border-white" alt="Profile" />
        </div>
      </div>
      <div className="bg-green-600 text-white px-3 py-1.5">
        <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[7px]">
          {data.personalInfo.email && <div className="flex items-center gap-1"><Mail className="h-2 w-2" />{data.personalInfo.email}</div>}
          {data.personalInfo.phone && <div className="flex items-center gap-1"><Phone className="h-2 w-2" />{data.personalInfo.phone}</div>}
          {data.personalInfo.location && <div className="flex items-center gap-1"><MapPin className="h-2 w-2" />{data.personalInfo.location}</div>}
        </div>
      </div>
      <div className="p-4">
        {data.personalInfo.summary && <div className="mb-3"><h2 className="text-[10px] font-bold text-green-800 border-b-2 border-green-700 pb-0.5 mb-1.5">PROFESSIONAL SUMMARY</h2><p className="text-[8px] text-gray-700 leading-relaxed">{data.personalInfo.summary}</p></div>}
        {data.experience && data.experience.length > 0 && <div className="mb-3"><h2 className="text-[10px] font-bold text-green-800 border-b-2 border-green-700 pb-0.5 mb-1.5">PROFESSIONAL EXPERIENCE</h2><div className="space-y-2">{data.experience.map(exp => <div key={exp.id}><div className="flex justify-between"><div><h3 className="text-[8px] font-bold text-gray-900">{exp.position}</h3><p className="text-[7px] text-green-700 font-semibold">{exp.company}</p></div><span className="text-[7px] text-gray-600">{exp.startDate} – {exp.endDate}</span></div><p className="text-[7px] text-gray-600 mt-0.5">{exp.description}</p></div>)}</div></div>}
        <div className="grid grid-cols-2 gap-3">
          <div>
            {data.education && data.education.length > 0 && <div className="mb-3"><h2 className="text-[10px] font-bold text-green-800 border-b-2 border-green-700 pb-0.5 mb-1.5">EDUCATION</h2><div className="space-y-1.5">{data.education.map(edu => <div key={edu.id}><h3 className="text-[8px] font-bold">{edu.degree}</h3><p className="text-[7px] text-gray-700">{edu.field}</p><p className="text-[7px] text-gray-600">{edu.school}</p><p className="text-[6px] text-gray-500">{edu.startDate} – {edu.endDate}</p></div>)}</div></div>}
            {data.skills && data.skills.length > 0 && <div><h2 className="text-[10px] font-bold text-green-800 border-b-2 border-green-700 pb-0.5 mb-1.5">CORE COMPETENCIES</h2><div className="grid grid-cols-2 gap-0.5">{data.skills.map((skill, i) => <div key={i} className="text-[7px] text-gray-700">• {skill}</div>)}</div></div>}
          </div>
          <div>
            {data.certifications && data.certifications.length > 0 && <div className="mb-3"><h2 className="text-[10px] font-bold text-green-800 border-b-2 border-green-700 pb-0.5 mb-1.5">CERTIFICATIONS</h2><div className="space-y-1">{data.certifications.map(cert => <div key={cert.id}><p className="text-[7px] font-semibold">{cert.name}</p><p className="text-[6px] text-gray-600">{cert.issuer} - {cert.date}</p></div>)}</div></div>}
            {data.languages && data.languages.length > 0 && <div className="mb-3"><h2 className="text-[10px] font-bold text-green-800 border-b-2 border-green-700 pb-0.5 mb-1.5">LANGUAGES</h2><div className="space-y-0.5">{data.languages.map(lang => <div key={lang.id} className="text-[7px]">{lang.language} - {lang.proficiency}</div>)}</div></div>}
            {data.awards && data.awards.length > 0 && <div><h2 className="text-[10px] font-bold text-green-800 border-b-2 border-green-700 pb-0.5 mb-1.5">AWARDS & RECOGNITION</h2><div className="space-y-1">{data.awards.map(award => <div key={award.id}><p className="text-[7px] font-semibold">{award.title}</p><p className="text-[6px] text-gray-600">{award.issuer} - {award.date}</p></div>)}</div></div>}
          </div>
        </div>
        {data.projects && data.projects.length > 0 && <div className="mt-3"><h2 className="text-[10px] font-bold text-green-800 border-b-2 border-green-700 pb-0.5 mb-1.5">KEY PROJECTS</h2><div className="space-y-1.5">{data.projects.map(proj => <div key={proj.id}><h3 className="text-[8px] font-bold">{proj.name}</h3><p className="text-[7px] text-gray-600">{proj.description}</p></div>)}</div></div>}
      </div>
    </div>
  )
}
// TEMPLATE 9: Tech/Developer CV (Dark Mode)
export function Template9({ data }: { data: ResumeData }) {
  const profilePic = data.personalInfo.profilePicture || placeholderImage
  return (
    <div className="bg-gray-900 text-white p-4" style={{ fontFamily: "'Fira Code', monospace" }}>
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-700">
        <img src={profilePic} className="w-20 h-20 rounded-lg" alt="Profile" />
        <div className="flex-1"><h1 className="text-2xl font-bold text-green-400">{data.personalInfo.name}</h1><p className="text-sm text-gray-300 mt-0.5">{data.personalInfo.title}</p><div className="flex gap-2 mt-1.5 text-[7px] text-gray-400">{data.personalInfo.email && <span>{data.personalInfo.email}</span>}{data.personalInfo.github && <span>• github.com/{data.personalInfo.github.split('/').pop()}</span>}</div></div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2 space-y-3">
          {data.personalInfo.summary && <div><h2 className="text-[10px] font-bold text-green-400 mb-1 uppercase tracking-wider">&gt; About</h2><p className="text-[8px] text-gray-300 leading-relaxed">{data.personalInfo.summary}</p></div>}
          {data.experience && data.experience.length > 0 && <div><h2 className="text-[10px] font-bold text-green-400 mb-1.5 uppercase tracking-wider">&gt; Experience</h2><div className="space-y-2">{data.experience.map(exp => <div key={exp.id} className="bg-gray-800 p-2 rounded border border-gray-700"><div className="flex justify-between"><h3 className="text-[8px] font-bold text-white">{exp.position}</h3><span className="text-[6px] text-gray-500">{exp.startDate} – {exp.endDate}</span></div><p className="text-[7px] text-green-400">{exp.company}</p><p className="text-[7px] text-gray-400 mt-1">{exp.description}</p></div>)}</div></div>}
          {data.projects && data.projects.length > 0 && <div><h2 className="text-[10px] font-bold text-green-400 mb-1.5 uppercase tracking-wider">&gt; Projects</h2><div className="space-y-1.5">{data.projects.map(proj => <div key={proj.id} className="bg-gray-800 p-2 rounded border border-gray-700"><h3 className="text-[8px] font-bold text-green-400">{proj.name}</h3><p className="text-[7px] text-gray-300">{proj.description}</p><p className="text-[6px] text-gray-500 mt-0.5">Stack: {proj.technologies}</p></div>)}</div></div>}
        </div>
        <div className="space-y-3">
          {data.skills && data.skills.length > 0 && <div className="bg-gray-800 p-2 rounded border border-gray-700"><h2 className="text-[10px] font-bold text-green-400 mb-1.5 uppercase tracking-wider">&gt; Skills</h2><div className="space-y-0.5">{data.skills.map((skill, i) => <div key={i} className="text-[7px] text-gray-300">• {skill}</div>)}</div></div>}
          {data.education && data.education.length > 0 && <div className="bg-gray-800 p-2 rounded border border-gray-700"><h2 className="text-[10px] font-bold text-green-400 mb-1.5 uppercase tracking-wider">&gt; Education</h2><div className="space-y-1.5">{data.education.map(edu => <div key={edu.id}><h3 className="text-[7px] font-bold text-white">{edu.degree}</h3><p className="text-[6px] text-gray-400">{edu.school}</p><p className="text-[6px] text-gray-500">{edu.startDate} – {edu.endDate}</p></div>)}</div></div>}
          {data.certifications && data.certifications.length > 0 && <div className="bg-gray-800 p-2 rounded border border-gray-700"><h2 className="text-[10px] font-bold text-green-400 mb-1.5 uppercase tracking-wider">&gt; Certs</h2><div className="space-y-1">{data.certifications.map(cert => <div key={cert.id}><p className="text-[6px] font-semibold text-white">{cert.name}</p><p className="text-[6px] text-gray-500">{cert.issuer}</p></div>)}</div></div>}
          {data.languages && data.languages.length > 0 && <div className="bg-gray-800 p-2 rounded border border-gray-700"><h2 className="text-[10px] font-bold text-green-400 mb-1.5 uppercase tracking-wider">&gt; Languages</h2><div className="space-y-0.5 text-[7px] text-gray-300">{data.languages.map(lang => <div key={lang.id}>{lang.language}: {lang.proficiency}</div>)}</div></div>}
        </div>
      </div>
    </div>
  )
}
// TEMPLATE 10: Executive CV (Premium Gold Accents)
export function Template10({ data }: { data: ResumeData }) {
  const profilePic = data.personalInfo.profilePicture || placeholderImage
  return (
    <div className="bg-white" style={{ fontFamily: "'Garamond', serif" }}>
      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-8 border-amber-600 p-4">
        <div className="flex items-center gap-4">
          <img src={profilePic} className="w-24 h-24 rounded-full border-4 border-amber-600" alt="Profile" />
          <div className="flex-1"><h1 className="text-3xl font-bold text-gray-900">{data.personalInfo.name}</h1><p className="text-base text-amber-700 mt-1 font-semibold">{data.personalInfo.title}</p><div className="flex gap-3 mt-2 text-[8px] text-gray-600">{data.personalInfo.email && <span>{data.personalInfo.email}</span>}{data.personalInfo.phone && <span>• {data.personalInfo.phone}</span>}{data.personalInfo.location && <span>• {data.personalInfo.location}</span>}</div></div>
        </div>
      </div>
      <div className="p-4">
        {data.personalInfo.summary && <div className="mb-4 bg-amber-50 p-3 border-l-4 border-amber-600"><h2 className="text-[11px] font-bold text-amber-800 mb-1.5 uppercase tracking-wide">Executive Summary</h2><p className="text-[8px] text-gray-700 leading-relaxed">{data.personalInfo.summary}</p></div>}
        {data.experience && data.experience.length > 0 && <div className="mb-4"><h2 className="text-[11px] font-bold text-amber-800 mb-2 uppercase tracking-wide border-b-2 border-amber-600 pb-1">Professional Experience</h2><div className="space-y-3">{data.experience.map(exp => <div key={exp.id}><div className="flex justify-between items-baseline"><div><h3 className="text-[9px] font-bold text-gray-900">{exp.position}</h3><p className="text-[8px] text-amber-700 font-semibold">{exp.company}</p></div><span className="text-[7px] text-gray-600 font-medium">{exp.startDate} – {exp.endDate}</span></div><p className="text-[7px] text-gray-600 mt-1 leading-relaxed">{exp.description}</p></div>)}</div></div>}
        <div className="grid grid-cols-2 gap-4">
          <div>
            {data.education && data.education.length > 0 && <div className="mb-4"><h2 className="text-[11px] font-bold text-amber-800 mb-2 uppercase tracking-wide border-b-2 border-amber-600 pb-1">Education</h2><div className="space-y-2">{data.education.map(edu => <div key={edu.id}><h3 className="text-[8px] font-bold text-gray-900">{edu.degree} in {edu.field}</h3><p className="text-[7px] text-amber-700">{edu.school}</p><p className="text-[7px] text-gray-600">{edu.startDate} – {edu.endDate}</p></div>)}</div></div>}
            {data.skills && data.skills.length > 0 && <div><h2 className="text-[11px] font-bold text-amber-800 mb-2 uppercase tracking-wide border-b-2 border-amber-600 pb-1">Key Competencies</h2><div className="flex flex-wrap gap-1">{data.skills.map((skill, i) => <span key={i} className="text-[7px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-medium">{skill}</span>)}</div></div>}
          </div>
          <div>
            {data.certifications && data.certifications.length > 0 && <div className="mb-4"><h2 className="text-[11px] font-bold text-amber-800 mb-2 uppercase tracking-wide border-b-2 border-amber-600 pb-1">Certifications</h2><div className="space-y-1.5">{data.certifications.map(cert => <div key={cert.id}><p className="text-[7px] font-semibold text-gray-900">{cert.name}</p><p className="text-[6px] text-gray-600">{cert.issuer} • {cert.date}</p></div>)}</div></div>}
            {data.awards && data.awards.length > 0 && <div className="mb-4"><h2 className="text-[11px] font-bold text-amber-800 mb-2 uppercase tracking-wide border-b-2 border-amber-600 pb-1">Awards & Honors</h2><div className="space-y-1.5">{data.awards.map(award => <div key={award.id}><p className="text-[7px] font-semibold text-gray-900">{award.title}</p><p className="text-[6px] text-gray-600">{award.issuer} • {award.date}</p></div>)}</div></div>}
            {data.languages && data.languages.length > 0 && <div><h2 className="text-[11px] font-bold text-amber-800 mb-2 uppercase tracking-wide border-b-2 border-amber-600 pb-1">Languages</h2><div className="space-y-0.5">{data.languages.map(lang => <div key={lang.id} className="text-[7px] text-gray-700">{lang.language} - <span className="text-amber-700">{lang.proficiency}</span></div>)}</div></div>}
          </div>
        </div>
        {data.projects && data.projects.length > 0 && <div className="mt-4"><h2 className="text-[11px] font-bold text-amber-800 mb-2 uppercase tracking-wide border-b-2 border-amber-600 pb-1">Notable Projects</h2><div className="grid grid-cols-2 gap-2">{data.projects.map(proj => <div key={proj.id} className="bg-amber-50 p-2 border-l-2 border-amber-600"><h3 className="text-[8px] font-bold text-gray-900">{proj.name}</h3><p className="text-[7px] text-gray-600">{proj.description}</p></div>)}</div></div>}
      </div>
    </div>
  )
}
export const Template11 = Template1
export const Template12 = Template1
export const Template13 = Template1
export const Template14 = Template1
export const Template15 = Template1
export const Template16 = Template1
export const Template17 = Template1
export const Template18 = Template1
export const Template19 = Template1
export const Template20 = Template1
export const Template21 = Template1
export const Template22 = Template1
export const Template23 = Template1
export const Template24 = Template1
export const Template25 = Template1
export const Template26 = Template1
export const Template27 = Template1
export const Template28 = Template1
export const Template29 = Template1
export const Template30 = Template1
export const Template31 = Template1
export const Template32 = Template1
export const Template33 = Template1
export const Template34 = Template1
export const Template35 = Template1
export const Template36 = Template1
export const Template37 = Template1
export const Template38 = Template1
export const Template39 = Template1
export const Template40 = Template1
export const Template41 = Template1
export const Template42 = Template1
export const Template43 = Template1
export const Template44 = Template1
export const Template45 = Template1
export const Template46 = Template1
export const Template47 = Template1
export const Template48 = Template1
export const Template49 = Template1
export const Template50 = Template1
export const Template51 = Template1
export const Template52 = Template1
export const Template53 = Template1
export const Template54 = Template1
export const Template55 = Template1
export const Template56 = Template1
export const Template57 = Template1
export const Template58 = Template1
export const Template59 = Template1
export const Template60 = Template1
