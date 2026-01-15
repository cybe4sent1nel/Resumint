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

// TEMPLATE 1: AwesomeCV (Dark Sidebar - Blue)
export function Template1({ data }: { data: ResumeData }) {
  const profilePic = data.personalInfo.profilePicture || placeholderImage
  return <div className="bg-white" style={{fontFamily:"Roboto,sans-serif"}}><div className="grid grid-cols-4 gap-0"><div className="col-span-1 bg-gray-800 text-white p-3 space-y-2"><img src={profilePic} className="w-full rounded-full mb-2 border-2 border-blue-500" alt="Profile"/><div className="space-y-2"><div><h3 className="text-[8px] font-bold mb-1 text-gray-400">CONTACT</h3><div className="space-y-0.5 text-[7px]">{data.personalInfo.email&&<div className="flex items-start gap-1"><Mail className="h-2 w-2 mt-0.5 flex-shrink-0 text-blue-400"/><span className="break-all">{data.personalInfo.email}</span></div>}{data.personalInfo.phone&&<div className="flex items-center gap-1"><Phone className="h-2 w-2 flex-shrink-0 text-blue-400"/><span>{data.personalInfo.phone}</span></div>}{data.personalInfo.location&&<div className="flex items-center gap-1"><MapPin className="h-2 w-2 flex-shrink-0 text-blue-400"/><span>{data.personalInfo.location}</span></div>}{data.personalInfo.linkedin&&<div className="flex items-start gap-1"><Linkedin className="h-2 w-2 mt-0.5 flex-shrink-0 text-blue-400"/><span className="break-all text-[6px]">{data.personalInfo.linkedin}</span></div>}{data.personalInfo.github&&<div className="flex items-start gap-1"><Github className="h-2 w-2 mt-0.5 flex-shrink-0 text-blue-400"/><span className="break-all text-[6px]">{data.personalInfo.github}</span></div>}{data.personalInfo.website&&<div className="flex items-start gap-1"><Globe className="h-2 w-2 mt-0.5 flex-shrink-0 text-blue-400"/><span className="break-all text-[6px]">{data.personalInfo.website}</span></div>}</div></div>{data.skills&&data.skills.length>0&&<div><h3 className="text-[8px] font-bold mb-1 text-gray-400">SKILLS</h3><div className="space-y-1">{data.skills.map((skill,i)=><div key={i}><div className="text-[7px] mb-0.5">{skill}</div><div className="h-0.5 bg-gray-700 rounded-full"><div className="h-full bg-blue-500 rounded-full" style={{width:`${85+(i%3)*5}%`}}></div></div></div>)}</div></div>}{data.languages&&data.languages.length>0&&<div><h3 className="text-[8px] font-bold mb-1 text-gray-400">LANGUAGES</h3><div className="space-y-0.5">{data.languages.map(lang=><div key={lang.id} className="text-[7px]"><span className="font-semibold">{lang.language}</span> - {lang.proficiency}</div>)}</div></div>}</div></div><div className="col-span-3 p-3"><div className="border-b-2 border-blue-600 pb-2 mb-2"><h1 className="text-xl font-bold text-gray-900">{data.personalInfo.name}</h1><p className="text-sm text-blue-600 mt-0.5">{data.personalInfo.title}</p></div><div className="space-y-1.5">{data.personalInfo.summary&&<div><h2 className="text-[10px] font-bold text-gray-900 flex items-center gap-1 mb-1"><div className="w-0.5 h-3 bg-blue-600"></div>SUMMARY</h2><p className="text-[8px] text-gray-700 ml-1.5 leading-relaxed">{data.personalInfo.summary}</p></div>}{data.experience&&data.experience.length>0&&<div><h2 className="text-[10px] font-bold text-gray-900 flex items-center gap-1 mb-1"><div className="w-0.5 h-3 bg-blue-600"></div>EXPERIENCE</h2><div className="ml-1.5 space-y-1">{data.experience.map(exp=><div key={exp.id}><div className="flex justify-between items-start"><div><h3 className="font-bold text-[8px]">{exp.position}</h3><p className="text-[7px] text-blue-600">{exp.company}</p></div><span className="text-[7px] text-gray-500 whitespace-nowrap ml-2">{exp.startDate} - {exp.endDate}</span></div><p className="text-[7px] mt-0.5 text-gray-600 leading-relaxed">{exp.description}</p></div>)}</div></div>}{data.education&&data.education.length>0&&<div><h2 className="text-[10px] font-bold text-gray-900 flex items-center gap-1 mb-1"><div className="w-0.5 h-3 bg-blue-600"></div>EDUCATION</h2><div className="ml-1.5 space-y-1">{data.education.map(edu=><div key={edu.id}><div className="flex justify-between items-start"><div><h3 className="font-bold text-[8px]">{edu.degree} in {edu.field}</h3><p className="text-[7px] text-blue-600">{edu.school}</p></div><span className="text-[7px] text-gray-500 whitespace-nowrap ml-2">{edu.startDate} - {edu.endDate}</span></div></div>)}</div></div>}{data.projects&&data.projects.length>0&&<div><h2 className="text-[10px] font-bold text-gray-900 flex items-center gap-1 mb-1"><div className="w-0.5 h-3 bg-blue-600"></div>PROJECTS</h2><div className="ml-1.5 space-y-1">{data.projects.map(proj=><div key={proj.id}><h3 className="font-bold text-[8px]">{proj.name}</h3><p className="text-[7px] text-gray-600 mt-0.5">{proj.description}</p><p className="text-[7px] text-blue-600 mt-0.5">Tech: {proj.technologies}</p>{proj.link&&<p className="text-[6px] text-gray-500">{proj.link}</p>}</div>)}</div></div>}{data.certifications&&data.certifications.length>0&&<div><h2 className="text-[10px] font-bold text-gray-900 flex items-center gap-1 mb-1"><div className="w-0.5 h-3 bg-blue-600"></div>CERTIFICATIONS</h2><div className="ml-1.5 space-y-1">{data.certifications.map(cert=><div key={cert.id} className="flex justify-between items-start"><div><h3 className="font-bold text-[8px]">{cert.name}</h3><p className="text-[7px] text-blue-600">{cert.issuer}</p></div><span className="text-[7px] text-gray-500 whitespace-nowrap ml-2">{cert.date}</span></div>)}</div></div>}{data.awards&&data.awards.length>0&&<div><h2 className="text-[10px] font-bold text-gray-900 flex items-center gap-1 mb-1"><div className="w-0.5 h-3 bg-blue-600"></div>AWARDS</h2><div className="ml-1.5 space-y-1">{data.awards.map(award=><div key={award.id}><div className="flex justify-between items-start"><div><h3 className="font-bold text-[8px]">{award.title}</h3><p className="text-[7px] text-blue-600">{award.issuer}</p></div><span className="text-[7px] text-gray-500 whitespace-nowrap ml-2">{award.date}</span></div>{award.description&&<p className="text-[7px] text-gray-600 mt-0.5">{award.description}</p>}</div>)}</div></div>}</div></div></div></div>
}

// TEMPLATE 2: ModernCV Classic (Top Header + Two Columns)
export function Template2({ data }: { data: ResumeData }) {
  const profilePic = data.personalInfo.profilePicture || placeholderImage
  return <div className="bg-white p-4" style={{fontFamily:"Computer Modern,serif"}}><div className="flex gap-3 border-b-4 border-blue-800 pb-3 mb-3"><img src={profilePic} className="w-24 h-24 rounded-full border-4 border-blue-800" alt="Profile"/><div className="flex-1"><h1 className="text-2xl font-bold text-gray-900">{data.personalInfo.name}</h1><p className="text-sm text-blue-800 mt-1">{data.personalInfo.title}</p><div className="grid grid-cols-3 gap-x-2 gap-y-1 mt-2 text-[7px] text-gray-600">{data.personalInfo.email&&<div className="flex items-center gap-1"><Mail className="h-2 w-2 text-blue-800"/>{data.personalInfo.email}</div>}{data.personalInfo.phone&&<div className="flex items-center gap-1"><Phone className="h-2 w-2 text-blue-800"/>{data.personalInfo.phone}</div>}{data.personalInfo.location&&<div className="flex items-center gap-1"><MapPin className="h-2 w-2 text-blue-800"/>{data.personalInfo.location}</div>}{data.personalInfo.linkedin&&<div className="flex items-center gap-1 col-span-2"><Linkedin className="h-2 w-2 text-blue-800"/><span className="truncate text-[6px]">{data.personalInfo.linkedin}</span></div>}{data.personalInfo.github&&<div className="flex items-center gap-1"><Github className="h-2 w-2 text-blue-800"/><span className="truncate text-[6px]">{data.personalInfo.github}</span></div>}{data.personalInfo.website&&<div className="flex items-center gap-1"><Globe className="h-2 w-2 text-blue-800"/><span className="truncate text-[6px]">{data.personalInfo.website}</span></div>}</div></div></div><div className="grid grid-cols-3 gap-4"><div className="col-span-2 space-y-2">{data.personalInfo.summary&&<div><h2 className="text-[11px] font-bold text-blue-900 mb-1 uppercase border-b border-blue-300">Summary</h2><p className="text-[8px] text-gray-700 leading-relaxed">{data.personalInfo.summary}</p></div>}{data.experience&&data.experience.length>0&&<div><h2 className="text-[11px] font-bold text-blue-900 mb-1 uppercase border-b border-blue-300">Experience</h2><div className="space-y-1.5">{data.experience.map(exp=><div key={exp.id}><div className="flex justify-between items-start"><div><h3 className="font-bold text-[8px]">{exp.position}</h3><p className="text-[7px] text-blue-800 italic">{exp.company}</p></div><span className="text-[7px] text-gray-500">{exp.startDate} - {exp.endDate}</span></div><p className="text-[7px] mt-0.5 text-gray-600">{exp.description}</p></div>)}</div></div>}{data.projects&&data.projects.length>0&&<div><h2 className="text-[11px] font-bold text-blue-900 mb-1 uppercase border-b border-blue-300">Projects</h2><div className="space-y-1">{data.projects.map(proj=><div key={proj.id}><h3 className="font-bold text-[8px]">{proj.name}</h3><p className="text-[7px] text-gray-600">{proj.description}</p><p className="text-[7px] text-blue-800">Tech: {proj.technologies}</p>{proj.link&&<p className="text-[6px] text-gray-500">{proj.link}</p>}</div>)}</div></div>}</div><div className="col-span-1 space-y-2">{data.education&&data.education.length>0&&<div><h2 className="text-[11px] font-bold text-blue-900 mb-1 uppercase border-b border-blue-300">Education</h2><div className="space-y-1">{data.education.map(edu=><div key={edu.id}><h3 className="font-bold text-[8px]">{edu.degree}</h3><p className="text-[7px] text-blue-800 italic">{edu.school}</p><p className="text-[7px] text-gray-600">{edu.field}</p><p className="text-[6px] text-gray-500">{edu.startDate} - {edu.endDate}</p></div>)}</div></div>}{data.skills&&data.skills.length>0&&<div><h2 className="text-[11px] font-bold text-blue-900 mb-1 uppercase border-b border-blue-300">Skills</h2><div className="flex flex-wrap gap-0.5">{data.skills.map((skill,i)=><span key={i} className="px-1.5 py-0.5 bg-blue-100 text-blue-900 rounded text-[7px]">{skill}</span>)}</div></div>}{data.languages&&data.languages.length>0&&<div><h2 className="text-[11px] font-bold text-blue-900 mb-1 uppercase border-b border-blue-300">Languages</h2><div className="space-y-0.5">{data.languages.map(lang=><div key={lang.id} className="text-[7px]">{lang.language}: {lang.proficiency}</div>)}</div></div>}{data.certifications&&data.certifications.length>0&&<div><h2 className="text-[11px] font-bold text-blue-900 mb-1 uppercase border-b border-blue-300">Certifications</h2><div className="space-y-0.5">{data.certifications.map(cert=><div key={cert.id}><div className="text-[7px] font-semibold">{cert.name}</div><div className="text-[6px] text-gray-600">{cert.issuer} - {cert.date}</div></div>)}</div></div>}{data.awards&&data.awards.length>0&&<div><h2 className="text-[11px] font-bold text-blue-900 mb-1 uppercase border-b border-blue-300">Awards</h2><div className="space-y-1">{data.awards.map(award=><div key={award.id}><div className="text-[7px] font-semibold">{award.title}</div><div className="text-[6px] text-gray-600">{award.issuer} - {award.date}</div></div>)}</div></div>}</div></div></div>
}
