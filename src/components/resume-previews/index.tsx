import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react"
import { 
  Template1, Template2, Template3, Template4, Template5, Template6, Template7, Template8, Template9, Template10,
  Template11, Template12, Template13, Template14, Template15, Template16, Template17, Template18, Template19, Template20,
  Template21, Template22, Template23, Template24, Template25, Template26, Template27, Template28, Template29, Template30,
  Template31, Template32, Template33, Template34, Template35, Template36, Template37, Template38, Template39, Template40,
  Template41, Template42, Template43, Template44, Template45, Template46, Template47, Template48, Template49, Template50,
  Template51, Template52, Template53, Template54, Template55, Template56, Template57, Template58, Template59, Template60
} from "./overleaf-all-60"

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

// Jake's Resume - Modern Single Column (Template 1)
export function JakesResumePreview({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white p-8 space-y-4 text-black" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}
      <div className="text-center pb-3 border-b-2 border-gray-300">
        <h1 className="text-4xl font-bold uppercase tracking-wider mb-1">{data.personalInfo.name}</h1>
        <div className="flex justify-center gap-4 text-xs flex-wrap">
          <span>{data.personalInfo.email}</span>
          <span>•</span>
          <span>{data.personalInfo.phone}</span>
          <span>•</span>
          <span>{data.personalInfo.location}</span>
          {data.personalInfo.linkedin && (
            <>
              <span>•</span>
              <span>{data.personalInfo.linkedin}</span>
            </>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide border-b border-gray-400 pb-1 mb-2">Summary</h2>
          <p className="text-xs leading-relaxed">{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      <div>
        <h2 className="text-sm font-bold uppercase tracking-wide border-b border-gray-400 pb-1 mb-2">Experience</h2>
        {data.experience.map((exp) => (
          <div key={exp.id} className="mb-3">
            <div className="flex justify-between items-baseline">
              <h3 className="text-sm font-bold">{exp.company}</h3>
              <span className="text-xs italic">{exp.startDate} - {exp.endDate}</span>
            </div>
            <p className="text-xs italic mb-1">{exp.position}</p>
            <p className="text-xs">{exp.description}</p>
          </div>
        ))}
      </div>

      {/* Education */}
      <div>
        <h2 className="text-sm font-bold uppercase tracking-wide border-b border-gray-400 pb-1 mb-2">Education</h2>
        {data.education.map((edu) => (
          <div key={edu.id} className="flex justify-between mb-1">
            <div>
              <span className="text-xs font-bold">{edu.school}</span>
              <span className="text-xs"> - {edu.degree} in {edu.field}</span>
            </div>
            <span className="text-xs italic">{edu.startDate} - {edu.endDate}</span>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-sm font-bold uppercase tracking-wide border-b border-gray-400 pb-1 mb-2">Skills</h2>
        <p className="text-xs">{data.skills.join(' • ')}</p>
      </div>
    </div>
  )
}

// Deedy Resume - Modern Two Column (Template 2)
export function DeedyResumePreview({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white text-black" style={{ fontFamily: 'Helvetica, sans-serif' }}>
      {/* Header */}
      <div className="bg-gray-800 text-white p-6">
        <h1 className="text-4xl font-light tracking-wide">{data.personalInfo.name}</h1>
        <p className="text-base text-gray-300 mt-1">{data.personalInfo.title}</p>
      </div>

      <div className="grid grid-cols-3 gap-6 p-6">
        {/* Left Sidebar */}
        <div className="col-span-1 space-y-4">
          <div>
            <h2 className="text-xs font-bold uppercase text-gray-700 border-b-2 border-gray-700 pb-1 mb-2">Contact</h2>
            <div className="space-y-1 text-xs">
              <p>{data.personalInfo.email}</p>
              <p>{data.personalInfo.phone}</p>
              <p>{data.personalInfo.location}</p>
            </div>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase text-gray-700 border-b-2 border-gray-700 pb-1 mb-2">Skills</h2>
            <div className="space-y-1">
              {data.skills.map((skill, i) => (
                <div key={i} className="text-xs py-0.5 px-2 bg-gray-100 rounded">{skill}</div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase text-gray-700 border-b-2 border-gray-700 pb-1 mb-2">Education</h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-2">
                <p className="text-xs font-bold">{edu.degree}</p>
                <p className="text-xs text-gray-600">{edu.school}</p>
                <p className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Main Content */}
        <div className="col-span-2 space-y-4">
          <div>
            <h2 className="text-sm font-bold uppercase text-gray-700 border-b-2 border-gray-700 pb-1 mb-3">Professional Summary</h2>
            <p className="text-xs leading-relaxed">{data.personalInfo.summary}</p>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase text-gray-700 border-b-2 border-gray-700 pb-1 mb-3">Experience</h2>
            {data.experience.map((exp) => (
              <div key={exp.id} className="mb-3">
                <div className="flex justify-between">
                  <h3 className="text-xs font-bold">{exp.position}</h3>
                  <span className="text-xs text-gray-600">{exp.startDate} - {exp.endDate}</span>
                </div>
                <p className="text-xs text-gray-700 mb-1">{exp.company}</p>
                <p className="text-xs">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ModernCV Classic (Template 4)
export function ModernCVClassicPreview({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white p-8 space-y-5 text-black" style={{ fontFamily: 'serif' }}>
      {/* Header with optional photo */}
      <div className="flex gap-6 pb-4 border-b-4 border-blue-600">
        {data.personalInfo.profilePicture && (
          <div className="flex-shrink-0">
            <img src={data.personalInfo.profilePicture} alt="Profile" className="w-24 h-24 rounded-full border-4 border-blue-600" />
          </div>
        )}
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-blue-900 mb-1">{data.personalInfo.name}</h1>
          <p className="text-xl text-gray-700 mb-2">{data.personalInfo.title}</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-600">
            <div className="flex items-center gap-1"><Mail className="h-3 w-3" />{data.personalInfo.email}</div>
            <div className="flex items-center gap-1"><Phone className="h-3 w-3" />{data.personalInfo.phone}</div>
            <div className="flex items-center gap-1"><MapPin className="h-3 w-3" />{data.personalInfo.location}</div>
            {data.personalInfo.linkedin && <div className="flex items-center gap-1"><Linkedin className="h-3 w-3" />{data.personalInfo.linkedin}</div>}
          </div>
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div>
          <h2 className="text-lg font-bold text-blue-900 mb-2">Professional Summary</h2>
          <p className="text-sm leading-relaxed text-gray-700">{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      <div>
        <h2 className="text-lg font-bold text-blue-900 mb-3">Professional Experience</h2>
        {data.experience.map((exp) => (
          <div key={exp.id} className="mb-4 pl-4 border-l-2 border-blue-400">
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="text-sm font-bold text-gray-900">{exp.position}</h3>
              <span className="text-xs text-gray-600">{exp.startDate} - {exp.endDate}</span>
            </div>
            <p className="text-sm text-blue-700 mb-1">{exp.company}</p>
            <p className="text-sm text-gray-700">{exp.description}</p>
          </div>
        ))}
      </div>

      {/* Education */}
      <div>
        <h2 className="text-lg font-bold text-blue-900 mb-3">Education</h2>
        {data.education.map((edu) => (
          <div key={edu.id} className="mb-3 pl-4 border-l-2 border-blue-400">
            <div className="flex justify-between">
              <div>
                <h3 className="text-sm font-bold">{edu.degree} in {edu.field}</h3>
                <p className="text-sm text-blue-700">{edu.school}</p>
              </div>
              <span className="text-xs text-gray-600">{edu.startDate} - {edu.endDate}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-lg font-bold text-blue-900 mb-2">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill, i) => (
            <span key={i} className="px-3 py-1 bg-blue-100 text-blue-900 text-sm rounded">{skill}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

// Academic CV - Classic (Template 16)
export function AcademicCVPreview({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white p-10 space-y-5 text-black" style={{ fontFamily: 'Times New Roman, serif' }}>
      {/* Header */}
      <div className="text-center border-b-2 border-black pb-4">
        <h1 className="text-3xl font-bold mb-1">{data.personalInfo.name}</h1>
        <p className="text-base mb-2">{data.personalInfo.title}</p>
        <div className="text-sm space-x-2">
          <span>{data.personalInfo.email}</span>
          <span>|</span>
          <span>{data.personalInfo.phone}</span>
          <span>|</span>
          <span>{data.personalInfo.location}</span>
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div>
          <h2 className="text-base font-bold uppercase mb-2">Research Interests</h2>
          <p className="text-sm leading-relaxed">{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Education */}
      <div>
        <h2 className="text-base font-bold uppercase mb-2">Education</h2>
        {data.education.map((edu) => (
          <div key={edu.id} className="mb-3">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-bold">{edu.degree} in {edu.field}</p>
                <p className="text-sm italic">{edu.school}</p>
              </div>
              <span className="text-sm">{edu.startDate} - {edu.endDate}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Experience */}
      <div>
        <h2 className="text-base font-bold uppercase mb-2">Professional Experience</h2>
        {data.experience.map((exp) => (
          <div key={exp.id} className="mb-4">
            <div className="flex justify-between mb-1">
              <div>
                <p className="text-sm font-bold">{exp.position}</p>
                <p className="text-sm italic">{exp.company}</p>
              </div>
              <span className="text-sm">{exp.startDate} - {exp.endDate}</span>
            </div>
            <p className="text-sm">{exp.description}</p>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-base font-bold uppercase mb-2">Skills & Competencies</h2>
        <p className="text-sm">{data.skills.join(', ')}</p>
      </div>
    </div>
  )
}

// Creative Designer - Creative (Template 31)
export function CreativeDesignerPreview({ data }: { data: ResumeData }) {
  return (
    <div className="bg-gradient-to-br from-pink-50 to-purple-50 text-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-8">
        <div className="flex items-center gap-6">
          {data.personalInfo.profilePicture && (
            <img src={data.personalInfo.profilePicture} alt="Profile" className="w-32 h-32 rounded-full border-4 border-white shadow-lg" />
          )}
          <div>
            <h1 className="text-5xl font-bold mb-2">{data.personalInfo.name}</h1>
            <p className="text-2xl font-light">{data.personalInfo.title}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 p-8">
        {/* Left Sidebar */}
        <div className="col-span-1 space-y-4">
          <div className="bg-white rounded-lg p-4 shadow">
            <h2 className="text-sm font-bold text-pink-600 mb-3 uppercase">Contact</h2>
            <div className="space-y-2 text-xs">
              <p className="flex items-center gap-2"><Mail className="h-3 w-3 text-pink-500" />{data.personalInfo.email}</p>
              <p className="flex items-center gap-2"><Phone className="h-3 w-3 text-pink-500" />{data.personalInfo.phone}</p>
              <p className="flex items-center gap-2"><MapPin className="h-3 w-3 text-pink-500" />{data.personalInfo.location}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow">
            <h2 className="text-sm font-bold text-purple-600 mb-3 uppercase">Skills</h2>
            <div className="space-y-2">
              {data.skills.map((skill, i) => (
                <div key={i} className="bg-gradient-to-r from-pink-100 to-purple-100 text-xs py-1.5 px-3 rounded-full text-center font-medium">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-2 space-y-4">
          {data.personalInfo.summary && (
            <div className="bg-white rounded-lg p-5 shadow">
              <h2 className="text-base font-bold text-pink-600 mb-2 uppercase">About Me</h2>
              <p className="text-sm leading-relaxed">{data.personalInfo.summary}</p>
            </div>
          )}

          <div className="bg-white rounded-lg p-5 shadow">
            <h2 className="text-base font-bold text-purple-600 mb-3 uppercase">Experience</h2>
            {data.experience.map((exp) => (
              <div key={exp.id} className="mb-4 pb-4 border-b last:border-0">
                <div className="flex justify-between mb-1">
                  <h3 className="text-sm font-bold">{exp.position}</h3>
                  <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">{exp.startDate} - {exp.endDate}</span>
                </div>
                <p className="text-sm text-pink-600 mb-2">{exp.company}</p>
                <p className="text-sm">{exp.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg p-5 shadow">
            <h2 className="text-base font-bold text-pink-600 mb-3 uppercase">Education</h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-3">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm font-bold">{edu.degree} in {edu.field}</p>
                    <p className="text-sm text-purple-600">{edu.school}</p>
                  </div>
                  <span className="text-xs text-gray-600">{edu.startDate} - {edu.endDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Software Engineer - Tech (Template 46)
export function SoftwareEngineerPreview({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white p-8 space-y-4 text-black" style={{ fontFamily: 'Consolas, monospace' }}>
      {/* Header */}
      <div className="border-l-4 border-blue-600 pl-4 pb-3">
        <h1 className="text-3xl font-bold text-gray-900">{data.personalInfo.name}</h1>
        <p className="text-base text-blue-600 font-mono">&lt;{data.personalInfo.title} /&gt;</p>
        <div className="flex gap-4 text-xs mt-2 text-gray-600 font-mono">
          <span>📧 {data.personalInfo.email}</span>
          <span>📱 {data.personalInfo.phone}</span>
          <span>📍 {data.personalInfo.location}</span>
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div>
          <h2 className="text-sm font-bold text-blue-600 font-mono mb-2">// ABOUT</h2>
          <p className="text-xs leading-relaxed pl-4 border-l-2 border-gray-300">{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Skills */}
      <div>
        <h2 className="text-sm font-bold text-blue-600 font-mono mb-2">// TECH_STACK</h2>
        <div className="pl-4 border-l-2 border-gray-300">
          <div className="grid grid-cols-2 gap-2">
            {data.skills.map((skill, i) => (
              <div key={i} className="text-xs bg-gray-100 px-2 py-1 rounded font-mono border border-gray-300">
                <span className="text-blue-600">const</span> skill_{i + 1} = <span className="text-green-600">"{skill}"</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Experience */}
      <div>
        <h2 className="text-sm font-bold text-blue-600 font-mono mb-2">// EXPERIENCE</h2>
        <div className="pl-4 border-l-2 border-gray-300 space-y-3">
          {data.experience.map((exp, idx) => (
            <div key={exp.id} className="bg-gray-50 p-3 rounded border border-gray-200">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="text-sm font-bold font-mono text-gray-900">{exp.position}</h3>
                  <p className="text-xs text-blue-600 font-mono">{exp.company}</p>
                </div>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-mono">{exp.startDate} → {exp.endDate}</span>
              </div>
              <p className="text-xs mt-2">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div>
        <h2 className="text-sm font-bold text-blue-600 font-mono mb-2">// EDUCATION</h2>
        <div className="pl-4 border-l-2 border-gray-300">
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-2">
              <div className="flex justify-between">
                <div>
                  <p className="text-xs font-bold font-mono">{edu.degree} in {edu.field}</p>
                  <p className="text-xs text-gray-600">{edu.school}</p>
                </div>
                <span className="text-xs text-gray-500 font-mono">{edu.startDate} - {edu.endDate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Banking/Finance CV - Template 5
export function BankingCVPreview({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white p-10 space-y-4 text-black" style={{ fontFamily: 'Georgia, serif' }}>
      <div className="text-center pb-3 border-b-4 border-gray-900">
        <h1 className="text-3xl font-bold text-gray-900">{data.personalInfo.name}</h1>
        <p className="text-sm text-gray-600 uppercase tracking-widest mt-1">{data.personalInfo.title}</p>
        <div className="flex justify-center gap-3 text-xs mt-2 text-gray-700">
          <span>{data.personalInfo.email}</span> • <span>{data.personalInfo.phone}</span> • <span>{data.personalInfo.location}</span>
        </div>
      </div>
      <div>
        <h2 className="text-sm font-bold uppercase tracking-wide mb-2 text-gray-900">Professional Summary</h2>
        <p className="text-xs leading-relaxed text-gray-700">{data.personalInfo.summary}</p>
      </div>
      {data.experience.map((exp) => (
        <div key={exp.id}>
          <h2 className="text-sm font-bold uppercase tracking-wide mb-2 text-gray-900">Experience</h2>
          <div className="flex justify-between mb-1">
            <div><h3 className="text-sm font-bold">{exp.position}</h3><p className="text-xs italic">{exp.company}</p></div>
            <span className="text-xs">{exp.startDate} - {exp.endDate}</span>
          </div>
          <p className="text-xs">{exp.description}</p>
        </div>
      ))}
    </div>
  )
}

// Twenty Seconds Template - Template 9
export function TwentySecondsPreview({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white" style={{ fontFamily: 'sans-serif' }}>
      <div className="grid grid-cols-5">
        <div className="col-span-2 bg-gradient-to-b from-cyan-600 to-cyan-700 text-white p-6 space-y-4">
          {data.personalInfo.profilePicture && (
            <img src={data.personalInfo.profilePicture} alt="Profile" className="w-24 h-24 rounded-full mx-auto border-4 border-white" />
          )}
          <h1 className="text-2xl font-bold text-center">{data.personalInfo.name}</h1>
          <div className="space-y-2 text-xs">
            <div><strong>Email:</strong> {data.personalInfo.email}</div>
            <div><strong>Phone:</strong> {data.personalInfo.phone}</div>
            <div><strong>Location:</strong> {data.personalInfo.location}</div>
          </div>
          <div>
            <h3 className="font-bold text-sm mb-2">SKILLS</h3>
            <div className="space-y-1">
              {data.skills.map((skill, i) => (
                <div key={i} className="bg-white/20 px-2 py-1 rounded text-xs">{skill}</div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-3 p-6 space-y-3">
          <div><h2 className="text-lg font-bold text-cyan-700 mb-2">PROFILE</h2><p className="text-xs">{data.personalInfo.summary}</p></div>
          <div><h2 className="text-lg font-bold text-cyan-700 mb-2">EXPERIENCE</h2>
            {data.experience.map(exp => (
              <div key={exp.id} className="mb-3">
                <div className="flex justify-between"><h3 className="text-sm font-bold">{exp.position}</h3><span className="text-xs">{exp.startDate} - {exp.endDate}</span></div>
                <p className="text-xs text-cyan-600">{exp.company}</p>
                <p className="text-xs">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Hipster CV - Template 14
export function HipsterCVPreview({ data }: { data: ResumeData }) {
  return (
    <div className="bg-orange-50 p-8" style={{ fontFamily: 'Courier New, monospace' }}>
      <div className="bg-white rounded-lg shadow-2xl p-8 border-8 border-orange-400">
        <div className="flex items-center gap-4 mb-4 pb-4 border-b-4 border-orange-400">
          {data.personalInfo.profilePicture && <img src={data.personalInfo.profilePicture} className="w-20 h-20 rounded-full border-4 border-orange-500" />}
          <div><h1 className="text-3xl font-bold text-orange-600">{data.personalInfo.name}</h1><p className="text-lg text-gray-700">{data.personalInfo.title}</p></div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1 space-y-3">
            <div className="bg-orange-100 p-3 rounded"><h3 className="font-bold text-xs mb-2 text-orange-700">CONTACT</h3><div className="space-y-1 text-xs"><p>{data.personalInfo.email}</p><p>{data.personalInfo.phone}</p></div></div>
            <div className="bg-orange-100 p-3 rounded"><h3 className="font-bold text-xs mb-2 text-orange-700">SKILLS</h3>{data.skills.map((s,i) => <div key={i} className="text-xs py-0.5">• {s}</div>)}</div>
          </div>
          <div className="col-span-2 space-y-3">
            <div><h2 className="text-sm font-bold text-orange-600 border-b-2 border-orange-400 pb-1 mb-2">ABOUT ME</h2><p className="text-xs">{data.personalInfo.summary}</p></div>
            <div><h2 className="text-sm font-bold text-orange-600 border-b-2 border-orange-400 pb-1 mb-2">WORK HISTORY</h2>
              {data.experience.map(exp => <div key={exp.id} className="mb-2 bg-orange-50 p-2 rounded"><div className="flex justify-between"><h3 className="text-xs font-bold">{exp.position}</h3><span className="text-xs">{exp.startDate}-{exp.endDate}</span></div><p className="text-xs text-orange-600">{exp.company}</p></div>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Get the appropriate preview component based on template ID
export function getResumePreview(templateId: number, data: ResumeData) {
  switch (templateId) {
    case 1: return <Template1 data={data} />
    case 2: return <Template2 data={data} />
    case 3: return <Template3 data={data} />
    case 4: return <Template4 data={data} />
    case 5: return <Template5 data={data} />
    case 6: return <Template6 data={data} />
    case 7: return <Template7 data={data} />
    case 8: return <Template8 data={data} />
    case 9: return <Template9 data={data} />
    case 10: return <Template10 data={data} />
    case 11: return <Template11 data={data} />
    case 12: return <Template12 data={data} />
    case 13: return <Template13 data={data} />
    case 14: return <Template14 data={data} />
    case 15: return <Template15 data={data} />
    case 16: return <Template16 data={data} />
    case 17: return <Template17 data={data} />
    case 18: return <Template18 data={data} />
    case 19: return <Template19 data={data} />
    case 20: return <Template20 data={data} />
    case 21: return <Template21 data={data} />
    case 22: return <Template22 data={data} />
    case 23: return <Template23 data={data} />
    case 24: return <Template24 data={data} />
    case 25: return <Template25 data={data} />
    case 26: return <Template26 data={data} />
    case 27: return <Template27 data={data} />
    case 28: return <Template28 data={data} />
    case 29: return <Template29 data={data} />
    case 30: return <Template30 data={data} />
    case 31: return <Template31 data={data} />
    case 32: return <Template32 data={data} />
    case 33: return <Template33 data={data} />
    case 34: return <Template34 data={data} />
    case 35: return <Template35 data={data} />
    case 36: return <Template36 data={data} />
    case 37: return <Template37 data={data} />
    case 38: return <Template38 data={data} />
    case 39: return <Template39 data={data} />
    case 40: return <Template40 data={data} />
    case 41: return <Template41 data={data} />
    case 42: return <Template42 data={data} />
    case 43: return <Template43 data={data} />
    case 44: return <Template44 data={data} />
    case 45: return <Template45 data={data} />
    case 46: return <Template46 data={data} />
    case 47: return <Template47 data={data} />
    case 48: return <Template48 data={data} />
    case 49: return <Template49 data={data} />
    case 50: return <Template50 data={data} />
    case 51: return <Template51 data={data} />
    case 52: return <Template52 data={data} />
    case 53: return <Template53 data={data} />
    case 54: return <Template54 data={data} />
    case 55: return <Template55 data={data} />
    case 56: return <Template56 data={data} />
    case 57: return <Template57 data={data} />
    case 58: return <Template58 data={data} />
    case 59: return <Template59 data={data} />
    case 60: return <Template60 data={data} />
    
    default:
      return <Template1 data={data} />
  }
}
