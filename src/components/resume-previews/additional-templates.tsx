// Additional 45 Unique Resume Template Previews (Templates 16-60)
import { Mail, Phone, MapPin, Linkedin, Globe, Briefcase, GraduationCap, Award, Code } from "lucide-react"

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

// ===== CLASSIC TEMPLATES (16-30) =====

// Template 16: Executive Classic
export function ExecutiveClassicPreview({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white p-8 text-black" style={{ fontFamily: 'Garamond, serif' }}>
      <div className="border-b-4 border-gray-800 pb-4 mb-4">
        <h1 className="text-4xl font-bold mb-2">{data.personalInfo.name}</h1>
        <p className="text-xl text-gray-700 italic">{data.personalInfo.title}</p>
      </div>
      <div className="grid grid-cols-4 gap-1 text-xs mb-6">
        <div>{data.personalInfo.email}</div><div>{data.personalInfo.phone}</div>
        <div>{data.personalInfo.location}</div><div>{data.personalInfo.linkedin}</div>
      </div>
      <div className="space-y-4">
        <div><h2 className="text-lg font-bold border-b-2 border-gray-400 pb-1 mb-2">PROFESSIONAL SUMMARY</h2><p className="text-sm">{data.personalInfo.summary}</p></div>
        <div><h2 className="text-lg font-bold border-b-2 border-gray-400 pb-1 mb-2">EXPERIENCE</h2>{data.experience.map(e => <div key={e.id} className="mb-3"><div className="flex justify-between"><h3 className="text-sm font-bold">{e.position} • {e.company}</h3><span className="text-sm">{e.startDate}-{e.endDate}</span></div><p className="text-xs mt-1">{e.description}</p></div>)}</div>
      </div>
    </div>
  )
}

// Template 17: Traditional Serif
export function TraditionalSerifPreview({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white p-10 text-black" style={{ fontFamily: 'Times New Roman, serif' }}>
      <div className="text-center border-double border-4 border-gray-800 p-4 mb-6">
        <h1 className="text-3xl font-bold mb-1">{data.personalInfo.name}</h1>
        <p className="text-base">{data.personalInfo.title}</p>
        <div className="text-xs mt-2">{data.personalInfo.email} | {data.personalInfo.phone}</div>
      </div>
      <div className="space-y-4 text-sm"><div><h2 className="text-center text-base font-bold mb-2">— PROFESSIONAL EXPERIENCE —</h2>{data.experience.map(e => <div key={e.id} className="mb-3"><h3 className="font-bold">{e.company}</h3><p className="italic">{e.position} ({e.startDate}-{e.endDate})</p></div>)}</div></div>
    </div>
  )
}

// Template 18: Corporate Professional
export function CorporateProfessionalPreview({ data }: { data: ResumeData }) {
  return (
    <div className="bg-gray-50 p-8 text-black">
      <div className="bg-white shadow-lg p-8"><div className="border-l-8 border-blue-800 pl-4 mb-4">
        <h1 className="text-3xl font-bold text-blue-900">{data.personalInfo.name}</h1>
        <p className="text-lg text-gray-700">{data.personalInfo.title}</p>
      </div><div className="grid grid-cols-2 gap-4 mb-6 text-sm"><div className="flex items-center gap-2"><Mail className="h-4 w-4 text-blue-800"/>{data.personalInfo.email}</div><div className="flex items-center gap-2"><Phone className="h-4 w-4 text-blue-800"/>{data.personalInfo.phone}</div></div>
      <div className="space-y-4"><div><h2 className="text-sm font-bold bg-blue-100 px-3 py-1 mb-2">EXECUTIVE SUMMARY</h2><p className="text-xs">{data.personalInfo.summary}</p></div></div></div>
    </div>
  )
}

// Template 19: Banking Professional
export function BankingProfessionalPreview({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white p-8 text-black" style={{ fontFamily: 'Georgia, serif' }}>
      <div className="border-t-8 border-b-8 border-double border-navy-900 py-4 mb-6 text-center">
        <h1 className="text-3xl font-bold text-navy-900">{data.personalInfo.name}</h1>
        <p className="text-base text-gray-700 mt-1">{data.personalInfo.title}</p>
      </div>
      <div className="flex justify-center gap-8 text-xs mb-6">{[data.personalInfo.email, data.personalInfo.phone, data.personalInfo.location].map((info,i) => <span key={i}>{info}</span>)}</div>
      <div className="space-y-4"><div><h2 className="text-sm font-bold text-navy-900 border-b-2 border-navy-900 pb-1 mb-2">PROFESSIONAL EXPERIENCE</h2>{data.experience.slice(0,2).map(e => <div key={e.id} className="mb-2"><div className="font-bold text-sm">{e.position}</div><div className="text-xs text-gray-600">{e.company} • {e.startDate}-{e.endDate}</div></div>)}</div></div>
    </div>
  )
}

// Template 20: Legal Professional
export function LegalProfessionalPreview({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white p-10 text-black" style={{ fontFamily: 'Baskerville, serif' }}>
      <div className="text-center mb-6"><h1 className="text-4xl font-bold mb-2">{data.personalInfo.name}</h1><div className="w-32 h-1 bg-black mx-auto mb-2"></div><p className="text-lg">{data.personalInfo.title}</p><div className="text-xs mt-3">{data.personalInfo.email} • {data.personalInfo.phone}</div></div>
      <div className="space-y-4"><div><h2 className="text-sm font-bold uppercase tracking-wider border-b border-black pb-1 mb-2">Bar Admissions & Qualifications</h2>{data.education.map(e => <div key={e.id} className="text-sm mb-1">{e.degree} - {e.school}</div>)}</div></div>
    </div>
  )
}

// Template 21: Academic Researcher
export function AcademicResearcherPreview({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white p-8 text-black" style={{ fontFamily: 'Palatino, serif' }}>
      <h1 className="text-3xl font-bold text-center mb-1">{data.personalInfo.name}</h1>
      <p className="text-center text-sm mb-1">{data.personalInfo.title}</p>
      <p className="text-center text-xs mb-6">{data.personalInfo.email} | {data.personalInfo.location}</p>
      <div className="space-y-4 text-sm"><div><h2 className="font-bold uppercase text-xs mb-2">Research Interests</h2><p className="text-xs">{data.personalInfo.summary}</p></div><div><h2 className="font-bold uppercase text-xs mb-2">Education</h2>{data.education.map(e => <div key={e.id} className="mb-2"><div className="flex justify-between text-xs"><span className="font-bold">{e.degree}</span><span>{e.endDate}</span></div><div className="text-xs">{e.school}</div></div>)}</div></div>
    </div>
  )
}

// Template 22: Government Resume
export function GovernmentResumePreview({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white p-8 text-black" style={{ fontFamily: 'Arial, sans-serif' }}>
      <div className="border-4 border-blue-900 p-4 mb-4"><h1 className="text-2xl font-bold text-blue-900 mb-1">{data.personalInfo.name}</h1><p className="text-sm">{data.personalInfo.title}</p></div>
      <div className="grid grid-cols-3 gap-2 text-xs mb-4"><div><strong>Email:</strong> {data.personalInfo.email}</div><div><strong>Phone:</strong> {data.personalInfo.phone}</div><div><strong>Location:</strong> {data.personalInfo.location}</div></div>
      <div><h2 className="bg-blue-900 text-white px-2 py-1 text-sm mb-2">WORK EXPERIENCE</h2>{data.experience.map(e => <div key={e.id} className="mb-3 text-xs"><div className="font-bold">{e.position}</div><div>{e.company} | {e.startDate} - {e.endDate}</div></div>)}</div>
    </div>
  )
}

// Template 23: Consulting Format
export function ConsultingFormatPreview({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white p-8 text-black">
      <div className="flex justify-between items-start mb-4 pb-4 border-b-2 border-gray-300"><div><h1 className="text-3xl font-bold">{data.personalInfo.name}</h1><p className="text-base text-gray-600">{data.personalInfo.title}</p></div><div className="text-right text-xs"><div>{data.personalInfo.email}</div><div>{data.personalInfo.phone}</div></div></div>
      <div className="space-y-3"><div><h2 className="text-sm font-bold mb-2">SUMMARY</h2><p className="text-xs">{data.personalInfo.summary}</p></div><div><h2 className="text-sm font-bold mb-2">PROFESSIONAL EXPERIENCE</h2>{data.experience.map(e => <div key={e.id} className="mb-2"><div className="flex justify-between text-xs"><span className="font-bold">{e.company}</span><span>{e.startDate}-{e.endDate}</span></div><div className="text-xs italic">{e.position}</div></div>)}</div></div>
    </div>
  )
}

// Template 24: Medical Professional
export function MedicalProfessionalPreview({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white p-8 text-black" style={{ fontFamily: 'Helvetica, sans-serif' }}>
      <div className="border-l-4 border-teal-600 pl-4 mb-4"><h1 className="text-3xl font-bold text-teal-900">{data.personalInfo.name}</h1><p className="text-lg text-gray-700">{data.personalInfo.title}</p></div>
      <div className="flex gap-4 text-xs mb-6"><div className="flex items-center gap-1"><Mail className="h-3 w-3 text-teal-600"/>{data.personalInfo.email}</div><div className="flex items-center gap-1"><Phone className="h-3 w-3 text-teal-600"/>{data.personalInfo.phone}</div></div>
      <div className="space-y-3"><div><h2 className="text-sm font-bold text-teal-900 border-b-2 border-teal-600 pb-1 mb-2">PROFESSIONAL SUMMARY</h2><p className="text-xs">{data.personalInfo.summary}</p></div><div><h2 className="text-sm font-bold text-teal-900 border-b-2 border-teal-600 pb-1 mb-2">CLINICAL EXPERIENCE</h2>{data.experience.slice(0,2).map(e => <div key={e.id} className="mb-2 text-xs"><div className="font-bold">{e.position}</div><div>{e.company}</div></div>)}</div></div>
    </div>
  )
}

// Template 25: Financial Analyst
export function FinancialAnalystPreview({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white p-8 text-black">
      <div className="bg-green-800 text-white p-4 mb-4"><h1 className="text-2xl font-bold">{data.personalInfo.name}</h1><p className="text-sm">{data.personalInfo.title}</p></div>
      <div className="grid grid-cols-3 gap-2 text-xs mb-4">{[data.personalInfo.email, data.personalInfo.phone, data.personalInfo.location].map((info,i) => <div key={i}>{info}</div>)}</div>
      <div className="space-y-3"><div><h2 className="text-sm font-bold bg-green-100 px-2 py-1 mb-2">QUALIFICATIONS</h2><p className="text-xs">{data.personalInfo.summary}</p></div><div><h2 className="text-sm font-bold bg-green-100 px-2 py-1 mb-2">EXPERIENCE</h2>{data.experience.map(e => <div key={e.id} className="mb-2 text-xs"><span className="font-bold">{e.position}</span> - {e.company}</div>)}</div></div>
    </div>
  )
}

// Template 26: HR Professional
export function HRProfessionalPreview({ data }: { data: ResumeData }) {
  return (
    <div className="bg-purple-50 p-8 text-black">
      <div className="bg-white shadow-md p-6"><h1 className="text-3xl font-bold text-purple-900 mb-1">{data.personalInfo.name}</h1><p className="text-base text-purple-700 mb-3">{data.personalInfo.title}</p>
      <div className="flex gap-4 text-xs mb-4">{[data.personalInfo.email, data.personalInfo.phone].map((info,i) => <div key={i}>{info}</div>)}</div>
      <div className="space-y-3"><div><h2 className="text-sm font-bold text-purple-900 mb-2">CORE COMPETENCIES</h2><div className="flex flex-wrap gap-2">{data.skills.slice(0,5).map((skill,i) => <span key={i} className="bg-purple-100 px-2 py-1 rounded text-xs">{skill}</span>)}</div></div></div></div>
    </div>
  )
}

// Template 27: Operations Manager
export function OperationsManagerPreview({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white p-8 text-black">
      <div className="flex justify-between mb-4 pb-3 border-b-4 border-orange-500"><div><h1 className="text-3xl font-bold">{data.personalInfo.name}</h1><p className="text-lg text-gray-700">{data.personalInfo.title}</p></div><div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">{data.personalInfo.name.charAt(0)}</div></div>
      <div className="text-xs mb-4">{data.personalInfo.email} • {data.personalInfo.phone} • {data.personalInfo.location}</div>
      <div><h2 className="text-sm font-bold text-orange-600 mb-2">PROFESSIONAL EXPERIENCE</h2>{data.experience.map(e => <div key={e.id} className="mb-3"><div className="flex justify-between text-xs"><span className="font-bold">{e.position}</span><span>{e.startDate}-{e.endDate}</span></div><div className="text-xs text-gray-600">{e.company}</div></div>)}</div>
    </div>
  )
}

// Template 28: Education Professional
export function EducationProfessionalPreview({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white p-8 text-black" style={{ fontFamily: 'Book Antiqua, serif' }}>
      <div className="text-center mb-6 pb-4 border-b-2 border-yellow-600"><h1 className="text-3xl font-bold text-yellow-900">{data.personalInfo.name}</h1><p className="text-lg">{data.personalInfo.title}</p><div className="text-xs mt-2">{data.personalInfo.email} | {data.personalInfo.phone}</div></div>
      <div className="space-y-3"><div><h2 className="text-sm font-bold text-yellow-900 mb-2">TEACHING PHILOSOPHY</h2><p className="text-xs">{data.personalInfo.summary}</p></div><div><h2 className="text-sm font-bold text-yellow-900 mb-2">TEACHING EXPERIENCE</h2>{data.experience.map(e => <div key={e.id} className="mb-2 text-xs"><div className="font-bold">{e.position} - {e.company}</div><div className="text-gray-600">{e.startDate} to {e.endDate}</div></div>)}</div></div>
    </div>
  )
}

// Template 29: Real Estate Professional
export function RealEstateProfessionalPreview({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white p-8 text-black">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6 mb-4 rounded"><h1 className="text-3xl font-bold">{data.personalInfo.name}</h1><p className="text-lg">{data.personalInfo.title}</p></div>
      <div className="grid grid-cols-2 gap-4 mb-4 text-xs"><div className="flex items-center gap-2"><Mail className="h-3 w-3 text-blue-600"/>{data.personalInfo.email}</div><div className="flex items-center gap-2"><Phone className="h-3 w-3 text-blue-600"/>{data.personalInfo.phone}</div></div>
      <div><h2 className="text-sm font-bold text-blue-600 mb-2">SALES ACHIEVEMENTS</h2>{data.experience.map(e => <div key={e.id} className="mb-2 text-xs border-l-4 border-blue-300 pl-2"><div className="font-bold">{e.position}</div><div>{e.company}</div></div>)}</div>
    </div>
  )
}

// Template 30: Insurance Professional
export function InsuranceProfessionalPreview({ data }: { data: ResumeData }) {
  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-8 text-black">
      <div className="bg-white shadow-lg p-6"><div className="border-t-4 border-red-700 pt-4 mb-4"><h1 className="text-3xl font-bold text-red-900">{data.personalInfo.name}</h1><p className="text-lg text-gray-700">{data.personalInfo.title}</p></div>
      <div className="text-xs mb-4">{data.personalInfo.email} • {data.personalInfo.phone}</div>
      <div><h2 className="text-sm font-bold bg-red-100 px-2 py-1 mb-2">PROFESSIONAL PROFILE</h2><p className="text-xs">{data.personalInfo.summary}</p></div></div>
    </div>
  )
}

// ===== CREATIVE TEMPLATES (31-45) =====

// Template 31: Bold Creative
export function BoldCreativePreview({ data }: { data: ResumeData }) {
  return (
    <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-8 text-white">
      <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6"><h1 className="text-4xl font-black mb-2">{data.personalInfo.name}</h1><p className="text-xl mb-4">{data.personalInfo.title}</p>
      <div className="grid grid-cols-2 gap-2 text-sm mb-4">{[data.personalInfo.email, data.personalInfo.phone].map((info,i) => <div key={i}>{info}</div>)}</div>
      <div><h2 className="text-lg font-bold border-b-2 border-white/50 pb-1 mb-2">ABOUT ME</h2><p className="text-sm">{data.personalInfo.summary}</p></div></div>
    </div>
  )
}

// Template 32: Graphic Designer
export function GraphicDesignerPreview({ data }: { data: ResumeData }) {
  return (
    <div className="bg-black p-8 text-white">
      <div className="border-8 border-yellow-400 p-6"><h1 className="text-4xl font-black text-yellow-400 mb-2">{data.personalInfo.name}</h1><p className="text-xl">{data.personalInfo.title}</p>
      <div className="flex gap-4 text-xs mt-4">{[data.personalInfo.email, data.personalInfo.phone].map((info,i) => <div key={i}>{info}</div>)}</div>
      <div className="mt-4"><h2 className="text-yellow-400 font-bold text-sm mb-2">PORTFOLIO HIGHLIGHTS</h2><div className="grid grid-cols-3 gap-2">{[1,2,3].map(i => <div key={i} className="h-16 bg-yellow-400/20 rounded"></div>)}</div></div></div>
    </div>
  )
}

// Template 33: UX Designer
export function UXDesignerPreview({ data }: { data: ResumeData }) {
  return (
    <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-8 text-white">
      <div className="bg-white text-black rounded-2xl p-6 shadow-2xl"><div className="flex items-center gap-4 mb-4">{data.personalInfo.profilePicture && <img src={data.personalInfo.profilePicture} className="w-20 h-20 rounded-full"/>}<div><h1 className="text-3xl font-bold text-indigo-600">{data.personalInfo.name}</h1><p className="text-lg">{data.personalInfo.title}</p></div></div>
      <div className="space-y-3"><div><h2 className="text-sm font-bold text-indigo-600 mb-2">DESIGN PHILOSOPHY</h2><p className="text-xs">{data.personalInfo.summary}</p></div></div></div>
    </div>
  )
}

// Template 34: Art Director
export function ArtDirectorPreview({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white p-8 text-black">
      <div className="grid grid-cols-3 gap-6"><div className="col-span-1 bg-gradient-to-b from-pink-400 to-orange-500 text-white p-6"><h1 className="text-2xl font-bold mb-2">{data.personalInfo.name}</h1><p className="text-sm mb-4">{data.personalInfo.title}</p><div className="space-y-1 text-xs">{[data.personalInfo.email, data.personalInfo.phone].map((info,i) => <div key={i}>{info}</div>)}</div></div>
      <div className="col-span-2 p-6"><h2 className="text-lg font-bold text-pink-600 mb-3">CREATIVE DIRECTION</h2><p className="text-xs mb-4">{data.personalInfo.summary}</p><div><h3 className="text-sm font-bold mb-2">EXPERIENCE</h3>{data.experience.map(e => <div key={e.id} className="mb-2 text-xs"><div className="font-bold">{e.position}</div><div className="text-gray-600">{e.company}</div></div>)}</div></div></div>
    </div>
  )
}

// Template 35: Motion Designer
export function MotionDesignerPreview({ data }: { data: ResumeData }) {
  return (
    <div className="bg-gradient-to-br from-purple-900 to-pink-700 p-8 text-white">
      <div className="border-4 border-white/30 p-6 rounded-lg backdrop-blur"><h1 className="text-4xl font-black mb-1">{data.personalInfo.name}</h1><p className="text-xl text-purple-200 mb-4">{data.personalInfo.title}</p>
      <div className="grid grid-cols-2 gap-3 text-xs mb-4">{[data.personalInfo.email, data.personalInfo.phone].map((info,i) => <div key={i} className="bg-white/10 px-2 py-1 rounded">{info}</div>)}</div>
      <div><h2 className="font-bold text-lg mb-2">SKILLS</h2><div className="flex flex-wrap gap-2">{data.skills.slice(0,6).map((skill,i) => <span key={i} className="bg-white/20 px-2 py-1 rounded text-xs">{skill}</span>)}</div></div></div>
    </div>
  )
}

// Template 36: Illustrator
export function IllustratorPreview({ data }: { data: ResumeData }) {
  return (
    <div className="bg-yellow-50 p-8 text-black">
      <div className="bg-white shadow-xl rounded-lg p-6 border-t-8 border-yellow-400"><h1 className="text-3xl font-bold text-yellow-900 mb-1">{data.personalInfo.name}</h1><p className="text-lg text-gray-700 mb-3">{data.personalInfo.title}</p>
      <div className="flex gap-3 text-xs mb-4">{[data.personalInfo.email, data.personalInfo.phone].map((info,i) => <div key={i}>{info}</div>)}</div>
      <div><h2 className="text-sm font-bold text-yellow-900 mb-2">ILLUSTRATION STYLE</h2><p className="text-xs">{data.personalInfo.summary}</p></div></div>
    </div>
  )
}

// Template 37: Brand Designer
export function BrandDesignerPreview({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white p-8 text-black">
      <div className="flex items-start gap-6 mb-6"><div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg"></div><div className="flex-1"><h1 className="text-4xl font-black">{data.personalInfo.name}</h1><p className="text-xl text-gray-600">{data.personalInfo.title}</p></div></div>
      <div className="grid grid-cols-3 gap-2 text-xs mb-4">{[data.personalInfo.email, data.personalInfo.phone, data.personalInfo.website].map((info,i) => <div key={i}>{info}</div>)}</div>
      <div><h2 className="text-sm font-bold mb-2">BRAND IDENTITY EXPERTISE</h2><p className="text-xs">{data.personalInfo.summary}</p></div>
    </div>
  )
}

// Template 38: Product Designer
export function ProductDesignerPreview({ data }: { data: ResumeData }) {
  return (
    <div className="bg-gradient-to-br from-teal-400 to-blue-500 p-8 text-white">
      <div className="bg-white text-black rounded-xl p-6 shadow-2xl"><div className="mb-4"><h1 className="text-3xl font-bold text-teal-600">{data.personalInfo.name}</h1><p className="text-lg text-gray-700">{data.personalInfo.title}</p></div>
      <div className="grid grid-cols-2 gap-2 text-xs mb-4">{[data.personalInfo.email, data.personalInfo.phone].map((info,i) => <div key={i} className="bg-teal-50 px-2 py-1 rounded">{info}</div>)}</div>
      <div><h2 className="text-sm font-bold text-teal-600 mb-2">PRODUCT DESIGN APPROACH</h2><p className="text-xs">{data.personalInfo.summary}</p></div></div>
    </div>
  )
}

// Template 39: Web Designer
export function WebDesignerPreview({ data }: { data: ResumeData }) {
  return (
    <div className="bg-gray-900 p-8 text-white">
      <div className="border-l-8 border-cyan-400 pl-6 mb-6"><h1 className="text-4xl font-bold text-cyan-400">{data.personalInfo.name}</h1><p className="text-xl">{data.personalInfo.title}</p></div>
      <div className="flex gap-4 text-sm mb-6">{[data.personalInfo.email, data.personalInfo.website].map((info,i) => <div key={i} className="text-cyan-300">{info}</div>)}</div>
      <div><h2 className="text-lg font-bold text-cyan-400 mb-2">WEB TECHNOLOGIES</h2><div className="grid grid-cols-4 gap-2">{data.skills.slice(0,8).map((skill,i) => <div key={i} className="bg-cyan-400/20 px-2 py-1 rounded text-xs text-center">{skill}</div>)}</div></div>
    </div>
  )
}

// Template 40: Fashion Designer
export function FashionDesignerPreview({ data }: { data: ResumeData }) {
  return (
    <div className="bg-gradient-to-br from-rose-300 to-pink-400 p-8 text-white">
      <div className="bg-white text-black p-6 rounded-lg shadow-2xl"><div className="text-center mb-6"><h1 className="text-4xl font-serif italic text-rose-600">{data.personalInfo.name}</h1><p className="text-lg tracking-widest uppercase text-gray-700">{data.personalInfo.title}</p></div>
      <div className="flex justify-center gap-6 text-xs mb-4">{[data.personalInfo.email, data.personalInfo.phone].map((info,i) => <div key={i}>{info}</div>)}</div>
      <div className="text-center"><h2 className="text-sm font-bold text-rose-600 mb-2">DESIGN AESTHETIC</h2><p className="text-xs italic">{data.personalInfo.summary}</p></div></div>
    </div>
  )
}

// Template 41: Interior Designer
export function InteriorDesignerPreview({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white p-8 text-black">
      <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-6 rounded-lg mb-4"><h1 className="text-3xl font-bold text-amber-900">{data.personalInfo.name}</h1><p className="text-lg text-amber-700">{data.personalInfo.title}</p></div>
      <div className="grid grid-cols-3 gap-2 text-xs mb-4">{[data.personalInfo.email, data.personalInfo.phone, data.personalInfo.website].map((info,i) => <div key={i}>{info}</div>)}</div>
      <div><h2 className="text-sm font-bold text-amber-900 border-b-2 border-amber-300 pb-1 mb-2">DESIGN PHILOSOPHY</h2><p className="text-xs">{data.personalInfo.summary}</p></div>
    </div>
  )
}

// Template 42: Photographer
export function PhotographerPreview({ data }: { data: ResumeData }) {
  return (
    <div className="bg-black p-8 text-white">
      <div className="border-4 border-white p-6"><div className="flex items-center justify-between mb-4"><div><h1 className="text-3xl font-bold">{data.personalInfo.name}</h1><p className="text-lg text-gray-300">{data.personalInfo.title}</p></div><div className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center"><div className="w-8 h-8 bg-white rounded-full"></div></div></div>
      <div className="flex gap-4 text-xs mb-4">{[data.personalInfo.email, data.personalInfo.website].map((info,i) => <div key={i}>{info}</div>)}</div>
      <div><h2 className="text-sm font-bold mb-2">PHOTOGRAPHY STYLE</h2><p className="text-xs">{data.personalInfo.summary}</p></div></div>
    </div>
  )
}

// Template 43: Video Editor
export function VideoEditorPreview({ data }: { data: ResumeData }) {
  return (
    <div className="bg-gradient-to-br from-red-600 to-purple-700 p-8 text-white">
      <div className="bg-black/50 backdrop-blur-lg rounded-lg p-6 border-2 border-white/30"><h1 className="text-4xl font-black mb-1">{data.personalInfo.name}</h1><p className="text-xl text-red-300 mb-4">{data.personalInfo.title}</p>
      <div className="grid grid-cols-2 gap-2 text-sm mb-4">{[data.personalInfo.email, data.personalInfo.phone].map((info,i) => <div key={i} className="bg-white/10 px-2 py-1 rounded">{info}</div>)}</div>
      <div><h2 className="text-lg font-bold mb-2">EDITING SOFTWARE</h2><div className="flex flex-wrap gap-2">{data.skills.slice(0,5).map((skill,i) => <span key={i} className="bg-red-500/30 px-3 py-1 rounded text-sm">{skill}</span>)}</div></div></div>
    </div>
  )
}

// Template 44: Content Creator
export function ContentCreatorPreview({ data }: { data: ResumeData }) {
  return (
    <div className="bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 p-8 text-white">
      <div className="bg-white/95 text-black rounded-2xl p-6 shadow-2xl"><div className="flex items-center gap-4 mb-4"><div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full"></div><div><h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{data.personalInfo.name}</h1><p className="text-lg">{data.personalInfo.title}</p></div></div>
      <div className="flex gap-3 text-xs mb-4">{[data.personalInfo.email, data.personalInfo.website].map((info,i) => <div key={i}>{info}</div>)}</div>
      <div><h2 className="text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">CONTENT STRATEGY</h2><p className="text-xs">{data.personalInfo.summary}</p></div></div>
    </div>
  )
}

// Template 45: Marketing Creative
export function MarketingCreativePreview({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white p-8 text-black">
      <div className="border-8 border-double border-blue-600 p-6"><h1 className="text-4xl font-black text-blue-600 mb-2">{data.personalInfo.name}</h1><p className="text-xl text-gray-700 mb-4">{data.personalInfo.title}</p>
      <div className="grid grid-cols-2 gap-4 text-xs mb-4"><div className="flex items-center gap-2"><Mail className="h-3 w-3 text-blue-600"/>{data.personalInfo.email}</div><div className="flex items-center gap-2"><Phone className="h-3 w-3 text-blue-600"/>{data.personalInfo.phone}</div></div>
      <div><h2 className="text-sm font-bold text-blue-600 mb-2">MARKETING EXPERTISE</h2><div className="grid grid-cols-3 gap-2">{data.skills.slice(0,6).map((skill,i) => <div key={i} className="bg-blue-100 px-2 py-1 rounded text-xs text-center">{skill}</div>)}</div></div></div>
    </div>
  )
}

// ===== TECH TEMPLATES (46-60) =====

// Template 46: Full Stack Developer
export function FullStackDeveloperPreview({ data }: { data: ResumeData }) {
  return (
    <div className="bg-gray-900 p-8 text-white font-mono">
      <div className="border-2 border-green-400 p-6"><div className="mb-4"><span className="text-green-400">const</span> developer = {'{'}<div className="ml-4"><div><span className="text-blue-400">name</span>: <span className="text-yellow-300">"{data.personalInfo.name}"</span>,</div><div><span className="text-blue-400">title</span>: <span className="text-yellow-300">"{data.personalInfo.title}"</span>,</div><div><span className="text-blue-400">email</span>: <span className="text-yellow-300">"{data.personalInfo.email}"</span></div></div>{'}'}</div>
      <div><span className="text-green-400">// Skills</span><div className="flex flex-wrap gap-2 mt-2">{data.skills.map((skill,i) => <span key={i} className="bg-green-400/20 border border-green-400 px-2 py-1 text-xs">{skill}</span>)}</div></div></div>
    </div>
  )
}

// Template 47: Frontend Developer
export function FrontendDeveloperPreview({ data }: { data: ResumeData }) {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-purple-700 p-8 text-white">
      <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20"><h1 className="text-4xl font-bold mb-1">{data.personalInfo.name}</h1><p className="text-xl text-blue-200 mb-4">{data.personalInfo.title}</p>
      <div className="grid grid-cols-2 gap-2 text-sm mb-4">{[data.personalInfo.email, data.personalInfo.github || data.personalInfo.linkedin].map((info,i) => <div key={i} className="bg-white/10 px-2 py-1 rounded">{info}</div>)}</div>
      <div><h2 className="text-lg font-bold mb-2">TECH STACK</h2><div className="grid grid-cols-4 gap-2">{data.skills.slice(0,8).map((skill,i) => <div key={i} className="bg-blue-500/30 px-2 py-1 rounded text-xs text-center">{skill}</div>)}</div></div></div>
    </div>
  )
}

// Template 48: Backend Engineer
export function BackendEngineerPreview({ data }: { data: ResumeData }) {
  return (
    <div className="bg-black p-8 text-green-400 font-mono text-sm">
      <div className="border border-green-400 p-6"><div className="mb-4">{'>'} {data.personalInfo.name}<br/>{'>'} {data.personalInfo.title}<br/>{'>'} {data.personalInfo.email}</div>
      <div className="mb-4">{'>'} <span className="text-yellow-300">cat experience.txt</span>{data.experience.map(e => <div key={e.id} className="ml-4 text-xs mt-1">- {e.position} @ {e.company}</div>)}</div>
      <div>{'>'} <span className="text-yellow-300">ls skills/</span><div className="grid grid-cols-3 gap-1 mt-1">{data.skills.map((skill,i) => <div key={i} className="text-xs">{skill}</div>)}</div></div></div>
    </div>
  )
}

// Template 49: DevOps Engineer
export function DevOpsEngineerPreview({ data }: { data: ResumeData }) {
  return (
    <div className="bg-gradient-to-br from-orange-600 to-red-700 p-8 text-white">
      <div className="bg-black/80 backdrop-blur rounded-lg p-6 border-2 border-orange-400 font-mono"><h1 className="text-3xl font-bold text-orange-400 mb-1">{data.personalInfo.name}</h1><p className="text-xl mb-4">{data.personalInfo.title}</p>
      <div className="flex gap-4 text-xs mb-4">{[data.personalInfo.email, data.personalInfo.phone].map((info,i) => <div key={i}>{info}</div>)}</div>
      <div><h2 className="text-orange-400 font-bold mb-2">$ kubectl get skills</h2><div className="grid grid-cols-3 gap-2">{data.skills.slice(0,9).map((skill,i) => <div key={i} className="bg-orange-400/20 px-2 py-1 rounded text-xs">{skill}</div>)}</div></div></div>
    </div>
  )
}

// Template 50: Data Scientist
export function DataScientistPreview({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white p-8 text-black">
      <div className="border-l-8 border-blue-600 pl-6 mb-6"><h1 className="text-4xl font-bold text-blue-900">{data.personalInfo.name}</h1><p className="text-xl text-gray-700">{data.personalInfo.title}</p></div>
      <div className="grid grid-cols-3 gap-2 text-xs mb-6">{[data.personalInfo.email, data.personalInfo.phone, data.personalInfo.linkedin].map((info,i) => <div key={i}>{info}</div>)}</div>
      <div className="mb-4"><h2 className="text-sm font-bold text-blue-900 mb-2">TECHNICAL SKILLS</h2><div className="flex flex-wrap gap-2">{data.skills.map((skill,i) => <span key={i} className="bg-blue-100 border border-blue-300 px-2 py-1 rounded text-xs">{skill}</span>)}</div></div>
      <div><h2 className="text-sm font-bold text-blue-900 mb-2">RESEARCH & PROJECTS</h2><p className="text-xs">{data.personalInfo.summary}</p></div>
    </div>
  )
}

// Template 51: Machine Learning Engineer
export function MLEngineerPreview({ data }: { data: ResumeData }) {
  return (
    <div className="bg-gradient-to-br from-purple-900 to-indigo-900 p-8 text-white font-mono">
      <div className="bg-black/50 border-2 border-purple-400 rounded-lg p-6"><h1 className="text-3xl font-bold text-purple-400 mb-1">{data.personalInfo.name}</h1><p className="text-xl text-purple-200 mb-4">{data.personalInfo.title}</p>
      <div className="text-sm mb-4"><span className="text-purple-400">import</span> {'{'}email, phone{'}'} <span className="text-purple-400">from</span> <span className="text-green-400">"{data.personalInfo.email}"</span></div>
      <div><h2 className="text-purple-400 font-bold mb-2">ML Frameworks</h2><div className="grid grid-cols-3 gap-2">{data.skills.slice(0,6).map((skill,i) => <div key={i} className="bg-purple-400/20 px-2 py-1 rounded text-xs">{skill}</div>)}</div></div></div>
    </div>
  )
}

// Template 52: Cloud Architect
export function CloudArchitectPreview({ data }: { data: ResumeData }) {
  return (
    <div className="bg-gradient-to-br from-sky-400 to-blue-600 p-8 text-white">
      <div className="bg-white text-black rounded-xl p-6 shadow-2xl"><h1 className="text-3xl font-bold text-sky-600 mb-1">{data.personalInfo.name}</h1><p className="text-lg text-gray-700 mb-4">{data.personalInfo.title}</p>
      <div className="grid grid-cols-2 gap-2 text-xs mb-4">{[data.personalInfo.email, data.personalInfo.phone].map((info,i) => <div key={i} className="bg-sky-100 px-2 py-1 rounded">{info}</div>)}</div>
      <div><h2 className="text-sm font-bold text-sky-600 mb-2">CLOUD PLATFORMS</h2><div className="flex flex-wrap gap-2">{['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes'].map((skill,i) => <span key={i} className="bg-sky-500 text-white px-3 py-1 rounded text-xs">{skill}</span>)}</div></div></div>
    </div>
  )
}

// Template 53: Security Engineer
export function SecurityEngineerPreview({ data }: { data: ResumeData }) {
  return (
    <div className="bg-black p-8 text-red-500 font-mono">
      <div className="border-2 border-red-500 p-6"><div className="mb-4"><span className="text-green-400">[AUTHORIZED]</span> {data.personalInfo.name}<br/><span className="text-yellow-300">[ROLE]</span> {data.personalInfo.title}<br/><span className="text-blue-400">[CONTACT]</span> {data.personalInfo.email}</div>
      <div><span className="text-green-400">[SECURITY_SKILLS]</span><div className="grid grid-cols-2 gap-2 mt-2">{data.skills.slice(0,6).map((skill,i) => <div key={i} className="bg-red-500/20 border border-red-500 px-2 py-1 text-xs">• {skill}</div>)}</div></div></div>
    </div>
  )
}

// Template 54: Mobile Developer
export function MobileDeveloperPreview({ data }: { data: ResumeData }) {
  return (
    <div className="bg-gradient-to-br from-teal-500 to-cyan-600 p-8 text-white">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/30"><h1 className="text-3xl font-bold mb-1">{data.personalInfo.name}</h1><p className="text-xl text-teal-100 mb-4">{data.personalInfo.title}</p>
      <div className="grid grid-cols-2 gap-2 text-sm mb-4">{[data.personalInfo.email, data.personalInfo.phone].map((info,i) => <div key={i} className="bg-white/10 px-2 py-1 rounded">{info}</div>)}</div>
      <div><h2 className="text-lg font-bold mb-2">PLATFORMS</h2><div className="flex gap-3">{['iOS', 'Android', 'React Native', 'Flutter'].map((platform,i) => <div key={i} className="bg-teal-600 px-3 py-2 rounded text-sm">{platform}</div>)}</div></div></div>
    </div>
  )
}

// Template 55: QA Engineer
export function QAEngineerPreview({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white p-8 text-black">
      <div className="border-4 border-green-500 p-6 rounded"><h1 className="text-3xl font-bold text-green-700 mb-1">{data.personalInfo.name}</h1><p className="text-lg text-gray-700 mb-4">{data.personalInfo.title}</p>
      <div className="flex gap-4 text-xs mb-4">{[data.personalInfo.email, data.personalInfo.phone].map((info,i) => <div key={i}>{info}</div>)}</div>
      <div><h2 className="text-sm font-bold text-green-700 mb-2">TESTING EXPERTISE</h2><div className="space-y-1">{['Automated Testing', 'Performance Testing', 'Security Testing', 'API Testing'].map((skill,i) => <div key={i} className="flex items-center gap-2 text-xs"><div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-white text-[10px]">✓</div>{skill}</div>)}</div></div></div>
    </div>
  )
}

// Template 56: System Administrator
export function SysAdminPreview({ data }: { data: ResumeData }) {
  return (
    <div className="bg-gray-800 p-8 text-green-300 font-mono text-sm">
      <div className="border border-green-300 p-6"><div className="mb-4">$ whoami<br/>{data.personalInfo.name}<br/><br/>$ cat /etc/role<br/>{data.personalInfo.title}<br/><br/>$ echo $CONTACT<br/>{data.personalInfo.email}</div>
      <div>$ ls /skills/<div className="ml-4 mt-2 grid grid-cols-2 gap-1">{data.skills.map((skill,i) => <div key={i} className="text-xs">- {skill}</div>)}</div></div></div>
    </div>
  )
}

// Template 57: Game Developer
export function GameDeveloperPreview({ data }: { data: ResumeData }) {
  return (
    <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 p-8 text-white">
      <div className="bg-black/70 backdrop-blur rounded-lg p-6 border-2 border-purple-400"><div className="flex items-center justify-between mb-4"><div><h1 className="text-3xl font-bold text-purple-300">{data.personalInfo.name}</h1><p className="text-xl">{data.personalInfo.title}</p></div><div className="text-4xl">🎮</div></div>
      <div className="flex gap-4 text-sm mb-4">{[data.personalInfo.email, data.personalInfo.website].map((info,i) => <div key={i}>{info}</div>)}</div>
      <div><h2 className="text-purple-300 font-bold mb-2">GAME ENGINES</h2><div className="grid grid-cols-3 gap-2">{['Unity', 'Unreal Engine', 'Godot', 'C#', 'C++', 'Blender'].map((skill,i) => <div key={i} className="bg-purple-500/30 px-2 py-1 rounded text-xs text-center">{skill}</div>)}</div></div></div>
    </div>
  )
}

// Template 58: Database Administrator
export function DatabaseAdminPreview({ data }: { data: ResumeData }) {
  return (
    <div className="bg-gradient-to-br from-blue-900 to-indigo-900 p-8 text-white font-mono">
      <div className="border-2 border-cyan-400 p-6 rounded"><h1 className="text-3xl font-bold text-cyan-400 mb-1">{data.personalInfo.name}</h1><p className="text-xl text-cyan-200 mb-4">{data.personalInfo.title}</p>
      <div className="text-sm mb-4"><span className="text-cyan-400">SELECT</span> * <span className="text-cyan-400">FROM</span> contact <span className="text-cyan-400">WHERE</span> email = <span className="text-green-400">'{data.personalInfo.email}'</span></div>
      <div><span className="text-cyan-400">-- Database Systems</span><div className="grid grid-cols-3 gap-2 mt-2">{['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Oracle', 'SQL Server'].map((db,i) => <div key={i} className="bg-cyan-400/20 px-2 py-1 rounded text-xs">{db}</div>)}</div></div></div>
    </div>
  )
}

// Template 59: Blockchain Developer
export function BlockchainDeveloperPreview({ data }: { data: ResumeData }) {
  return (
    <div className="bg-gradient-to-br from-yellow-500 to-orange-600 p-8 text-white">
      <div className="bg-black/80 backdrop-blur rounded-lg p-6 border-2 border-yellow-400 font-mono"><h1 className="text-3xl font-bold text-yellow-400 mb-1">{data.personalInfo.name}</h1><p className="text-xl mb-4">{data.personalInfo.title}</p>
      <div className="flex gap-4 text-sm mb-4">{[data.personalInfo.email, data.personalInfo.website].map((info,i) => <div key={i} className="bg-yellow-400/20 px-2 py-1 rounded">{info}</div>)}</div>
      <div><h2 className="text-yellow-400 font-bold mb-2">BLOCKCHAIN TECH</h2><div className="grid grid-cols-2 gap-2">{['Solidity', 'Web3.js', 'Smart Contracts', 'Ethereum', 'Polygon', 'IPFS'].map((tech,i) => <div key={i} className="bg-yellow-500/30 px-2 py-1 rounded text-xs">{tech}</div>)}</div></div></div>
    </div>
  )
}

// Template 60: AI/ML Researcher
export function AIResearcherPreview({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white p-8 text-black">
      <div className="border-l-8 border-purple-600 pl-6 mb-6"><h1 className="text-4xl font-bold text-purple-900">{data.personalInfo.name}</h1><p className="text-xl text-gray-700">{data.personalInfo.title}</p></div>
      <div className="grid grid-cols-3 gap-2 text-xs mb-6">{[data.personalInfo.email, data.personalInfo.phone, data.personalInfo.linkedin].map((info,i) => <div key={i}>{info}</div>)}</div>
      <div className="mb-4"><h2 className="text-sm font-bold text-purple-900 mb-2">RESEARCH AREAS</h2><p className="text-xs">{data.personalInfo.summary}</p></div>
      <div><h2 className="text-sm font-bold text-purple-900 mb-2">AI/ML FRAMEWORKS</h2><div className="flex flex-wrap gap-2">{['TensorFlow', 'PyTorch', 'Keras', 'Scikit-learn', 'OpenCV', 'Transformers'].map((fw,i) => <span key={i} className="bg-purple-100 border border-purple-300 px-2 py-1 rounded text-xs">{fw}</span>)}</div></div>
    </div>
  )
}
