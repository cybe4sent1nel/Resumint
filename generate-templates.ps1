# PowerShell script to generate 60 unique resume templates
$outputFile = "src\components\resume-previews\overleaf-all-60.tsx"

$header = @'
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

'@

# Write the header
Set-Content -Path $outputFile -Value $header

Write-Host "Generated header for overleaf-all-60.tsx"
Write-Host "Now add individual template components manually..."
