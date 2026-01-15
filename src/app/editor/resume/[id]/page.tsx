"use client"

import { use, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { 
  Save, Download, Eye, ArrowLeft, FileText, User, 
  Briefcase, GraduationCap, Award, Mail, Phone, MapPin,
  Linkedin, Globe, Plus, Trash2, Edit2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { DownloadProgress } from "@/components/ui/download-progress"
import { getResumePreview } from "@/components/resume-previews"
import { getTemplateById } from "@/lib/latex-templates"
import Link from "next/link"

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

export default function ResumeEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [downloadProgress, setDownloadProgress] = useState(0)
  const templateId = parseInt(resolvedParams.id)
  const template = getTemplateById(templateId)
  
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: "John Doe",
      title: "Full Stack Developer",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      linkedin: "linkedin.com/in/johndoe",
      github: "github.com/johndoe",
      website: "johndoe.dev",
      summary: "Passionate full stack developer with 5+ years of experience building scalable web applications.",
      expectedSalary: ""
    },
    experience: [
      {
        id: "1",
        company: "Tech Corp",
        position: "Senior Developer",
        startDate: "2021-01",
        endDate: "Present",
        description: "Led development of microservices architecture serving 1M+ users"
      }
    ],
    education: [
      {
        id: "1",
        school: "University of Technology",
        degree: "Bachelor of Science",
        field: "Computer Science",
        startDate: "2015-09",
        endDate: "2019-05"
      }
    ],
    skills: ["JavaScript", "React", "Node.js", "Python", "AWS"],
    certifications: [],
    projects: [],
    languages: [],
    awards: []
  })

  useEffect(() => {
    // Simulate loading resume data
    setTimeout(() => setLoading(false), 1000)
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      alert("Resume saved successfully!")
    } catch (error) {
      alert("Failed to save resume")
    } finally {
      setSaving(false)
    }
  }

  const handleDownload = async () => {
    setDownloading(true)
    setDownloadProgress(0)
    
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setDownloading(false)
            // Trigger actual download
            alert("Resume downloaded!")
          }, 500)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const addExperience = () => {
    setResumeData({
      ...resumeData,
      experience: [
        ...resumeData.experience,
        {
          id: Date.now().toString(),
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          description: ""
        }
      ]
    })
  }

  const removeExperience = (id: string) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.filter(exp => exp.id !== id)
    })
  }

  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [
        ...resumeData.education,
        {
          id: Date.now().toString(),
          school: "",
          degree: "",
          field: "",
          startDate: "",
          endDate: ""
        }
      ]
    })
  }

  const removeEducation = (id: string) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.filter(edu => edu.id !== id)
    })
  }

  const addCertification = () => {
    setResumeData({
      ...resumeData,
      certifications: [
        ...(resumeData.certifications || []),
        {
          id: Date.now().toString(),
          name: "",
          issuer: "",
          date: "",
          credentialId: ""
        }
      ]
    })
  }

  const removeCertification = (id: string) => {
    setResumeData({
      ...resumeData,
      certifications: resumeData.certifications?.filter(cert => cert.id !== id)
    })
  }

  const addProject = () => {
    setResumeData({
      ...resumeData,
      projects: [
        ...(resumeData.projects || []),
        {
          id: Date.now().toString(),
          name: "",
          description: "",
          technologies: "",
          link: ""
        }
      ]
    })
  }

  const removeProject = (id: string) => {
    setResumeData({
      ...resumeData,
      projects: resumeData.projects?.filter(proj => proj.id !== id)
    })
  }

  const addLanguage = () => {
    setResumeData({
      ...resumeData,
      languages: [
        ...(resumeData.languages || []),
        {
          id: Date.now().toString(),
          language: "",
          proficiency: ""
        }
      ]
    })
  }

  const removeLanguage = (id: string) => {
    setResumeData({
      ...resumeData,
      languages: resumeData.languages?.filter(lang => lang.id !== id)
    })
  }

  const addAward = () => {
    setResumeData({
      ...resumeData,
      awards: [
        ...(resumeData.awards || []),
        {
          id: Date.now().toString(),
          title: "",
          issuer: "",
          date: "",
          description: ""
        }
      ]
    })
  }

  const removeAward = (id: string) => {
    setResumeData({
      ...resumeData,
      awards: resumeData.awards?.filter(award => award.id !== id)
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" message="Loading resume editor..." />
      </div>
    )
  }

  if (downloading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-neutral-950 dark:via-purple-950/20 dark:to-blue-950/20">
        <DownloadProgress fileName="My-Resume.pdf" progress={downloadProgress} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-neutral-950 dark:via-purple-950/20 dark:to-blue-950/20">
      {/* Header */}
      <header className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur border-b border-neutral-200 dark:border-neutral-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/templates">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Templates
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold">Resume Editor</h1>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Template #{templateId}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={handleSave}
                disabled={saving}
              >
                <Save className="h-4 w-4 mr-2" />
                {saving ? "Saving..." : "Save"}
              </Button>
              
              <Button
                variant="outline"
                onClick={() => alert("Preview feature coming soon!")}
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              
              <Button
                onClick={handleDownload}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Editor Section */}
          <div className="space-y-6">
            {/* Personal Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Profile Picture Upload (Optional) */}
                  <div className="col-span-2">
                    <Label htmlFor="profilePic">Profile Picture (Optional)</Label>
                    <div className="flex items-center gap-4">
                      {resumeData.personalInfo.profilePicture && (
                        <img 
                          src={resumeData.personalInfo.profilePicture} 
                          alt="Profile"
                          className="w-20 h-20 rounded-full object-cover border-2 border-purple-500"
                        />
                      )}
                      <Input
                        id="profilePic"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            const reader = new FileReader()
                            reader.onloadend = () => {
                              setResumeData({
                                ...resumeData,
                                personalInfo: { ...resumeData.personalInfo, profilePicture: reader.result as string }
                              })
                            }
                            reader.readAsDataURL(file)
                          }
                        }}
                        className="flex-1"
                      />
                      {resumeData.personalInfo.profilePicture && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setResumeData({
                            ...resumeData,
                            personalInfo: { ...resumeData.personalInfo, profilePicture: undefined }
                          })}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                    <p className="text-xs text-neutral-500 mt-1">
                      Some templates support profile pictures. Upload is optional.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={resumeData.personalInfo.name}
                        onChange={(e) => setResumeData({
                          ...resumeData,
                          personalInfo: { ...resumeData.personalInfo, name: e.target.value }
                        })}
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="title">Professional Title</Label>
                      <Input
                        id="title"
                        value={resumeData.personalInfo.title}
                        onChange={(e) => setResumeData({
                          ...resumeData,
                          personalInfo: { ...resumeData.personalInfo, title: e.target.value }
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={resumeData.personalInfo.email}
                        onChange={(e) => setResumeData({
                          ...resumeData,
                          personalInfo: { ...resumeData.personalInfo, email: e.target.value }
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={resumeData.personalInfo.phone}
                        onChange={(e) => setResumeData({
                          ...resumeData,
                          personalInfo: { ...resumeData.personalInfo, phone: e.target.value }
                        })}
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={resumeData.personalInfo.location}
                        onChange={(e) => setResumeData({
                          ...resumeData,
                          personalInfo: { ...resumeData.personalInfo, location: e.target.value }
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input
                        id="linkedin"
                        value={resumeData.personalInfo.linkedin}
                        onChange={(e) => setResumeData({
                          ...resumeData,
                          personalInfo: { ...resumeData.personalInfo, linkedin: e.target.value }
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="github">GitHub</Label>
                      <Input
                        id="github"
                        value={resumeData.personalInfo.github}
                        onChange={(e) => setResumeData({
                          ...resumeData,
                          personalInfo: { ...resumeData.personalInfo, github: e.target.value }
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        value={resumeData.personalInfo.website}
                        onChange={(e) => setResumeData({
                          ...resumeData,
                          personalInfo: { ...resumeData.personalInfo, website: e.target.value }
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="expectedSalary">Expected Salary (Optional)</Label>
                      <Input
                        id="expectedSalary"
                        placeholder="e.g., $100,000 - $120,000"
                        value={resumeData.personalInfo.expectedSalary || ""}
                        onChange={(e) => setResumeData({
                          ...resumeData,
                          personalInfo: { ...resumeData.personalInfo, expectedSalary: e.target.value }
                        })}
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="summary">Professional Summary</Label>
                      <textarea
                        id="summary"
                        rows={4}
                        className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-neutral-900"
                        value={resumeData.personalInfo.summary}
                        onChange={(e) => setResumeData({
                          ...resumeData,
                          personalInfo: { ...resumeData.personalInfo, summary: e.target.value }
                        })}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Experience */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5" />
                      Work Experience
                    </CardTitle>
                    <Button size="sm" onClick={addExperience}>
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {resumeData.experience.map((exp, index) => (
                    <div key={exp.id} className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg space-y-3">
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold">Experience {index + 1}</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeExperience(exp.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label>Company</Label>
                          <Input
                            value={exp.company}
                            onChange={(e) => {
                              const newExp = [...resumeData.experience]
                              newExp[index].company = e.target.value
                              setResumeData({ ...resumeData, experience: newExp })
                            }}
                          />
                        </div>
                        <div>
                          <Label>Position</Label>
                          <Input
                            value={exp.position}
                            onChange={(e) => {
                              const newExp = [...resumeData.experience]
                              newExp[index].position = e.target.value
                              setResumeData({ ...resumeData, experience: newExp })
                            }}
                          />
                        </div>
                        <div>
                          <Label>Start Date</Label>
                          <Input
                            type="month"
                            value={exp.startDate}
                            onChange={(e) => {
                              const newExp = [...resumeData.experience]
                              newExp[index].startDate = e.target.value
                              setResumeData({ ...resumeData, experience: newExp })
                            }}
                          />
                        </div>
                        <div>
                          <Label>End Date</Label>
                          <Input
                            type="month"
                            value={exp.endDate}
                            onChange={(e) => {
                              const newExp = [...resumeData.experience]
                              newExp[index].endDate = e.target.value
                              setResumeData({ ...resumeData, experience: newExp })
                            }}
                          />
                        </div>
                        <div className="col-span-2">
                          <Label>Description</Label>
                          <textarea
                            rows={3}
                            className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-neutral-900"
                            value={exp.description}
                            onChange={(e) => {
                              const newExp = [...resumeData.experience]
                              newExp[index].description = e.target.value
                              setResumeData({ ...resumeData, experience: newExp })
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5" />
                      Education
                    </CardTitle>
                    <Button size="sm" onClick={addEducation}>
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {resumeData.education.map((edu, index) => (
                    <div key={edu.id} className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg space-y-3">
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold">Education {index + 1}</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeEducation(edu.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="col-span-2">
                          <Label>School/University</Label>
                          <Input
                            value={edu.school}
                            onChange={(e) => {
                              const newEdu = [...resumeData.education]
                              newEdu[index].school = e.target.value
                              setResumeData({ ...resumeData, education: newEdu })
                            }}
                          />
                        </div>
                        <div>
                          <Label>Degree</Label>
                          <Input
                            value={edu.degree}
                            onChange={(e) => {
                              const newEdu = [...resumeData.education]
                              newEdu[index].degree = e.target.value
                              setResumeData({ ...resumeData, education: newEdu })
                            }}
                          />
                        </div>
                        <div>
                          <Label>Field of Study</Label>
                          <Input
                            value={edu.field}
                            onChange={(e) => {
                              const newEdu = [...resumeData.education]
                              newEdu[index].field = e.target.value
                              setResumeData({ ...resumeData, education: newEdu })
                            }}
                          />
                        </div>
                        <div>
                          <Label>Start Date</Label>
                          <Input
                            type="month"
                            value={edu.startDate}
                            onChange={(e) => {
                              const newEdu = [...resumeData.education]
                              newEdu[index].startDate = e.target.value
                              setResumeData({ ...resumeData, education: newEdu })
                            }}
                          />
                        </div>
                        <div>
                          <Label>End Date</Label>
                          <Input
                            type="month"
                            value={edu.endDate}
                            onChange={(e) => {
                              const newEdu = [...resumeData.education]
                              newEdu[index].endDate = e.target.value
                              setResumeData({ ...resumeData, education: newEdu })
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Certifications (Optional)
                    </CardTitle>
                    <Button size="sm" onClick={addCertification}>
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {resumeData.certifications && resumeData.certifications.length > 0 ? (
                    resumeData.certifications.map((cert, index) => (
                      <div key={cert.id} className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg space-y-3">
                        <div className="flex justify-between items-start">
                          <h4 className="font-semibold">Certification {index + 1}</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeCertification(cert.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label>Certification Name</Label>
                            <Input
                              value={cert.name}
                              onChange={(e) => {
                                const newCerts = [...(resumeData.certifications || [])]
                                newCerts[index].name = e.target.value
                                setResumeData({ ...resumeData, certifications: newCerts })
                              }}
                            />
                          </div>
                          <div>
                            <Label>Issuing Organization</Label>
                            <Input
                              value={cert.issuer}
                              onChange={(e) => {
                                const newCerts = [...(resumeData.certifications || [])]
                                newCerts[index].issuer = e.target.value
                                setResumeData({ ...resumeData, certifications: newCerts })
                              }}
                            />
                          </div>
                          <div>
                            <Label>Date Issued</Label>
                            <Input
                              type="month"
                              value={cert.date}
                              onChange={(e) => {
                                const newCerts = [...(resumeData.certifications || [])]
                                newCerts[index].date = e.target.value
                                setResumeData({ ...resumeData, certifications: newCerts })
                              }}
                            />
                          </div>
                          <div>
                            <Label>Credential ID (Optional)</Label>
                            <Input
                              value={cert.credentialId || ""}
                              onChange={(e) => {
                                const newCerts = [...(resumeData.certifications || [])]
                                newCerts[index].credentialId = e.target.value
                                setResumeData({ ...resumeData, certifications: newCerts })
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-neutral-500">No certifications added yet.</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Projects */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Projects (Optional)
                    </CardTitle>
                    <Button size="sm" onClick={addProject}>
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {resumeData.projects && resumeData.projects.length > 0 ? (
                    resumeData.projects.map((project, index) => (
                      <div key={project.id} className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg space-y-3">
                        <div className="flex justify-between items-start">
                          <h4 className="font-semibold">Project {index + 1}</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeProject(project.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="col-span-2">
                            <Label>Project Name</Label>
                            <Input
                              value={project.name}
                              onChange={(e) => {
                                const newProjects = [...(resumeData.projects || [])]
                                newProjects[index].name = e.target.value
                                setResumeData({ ...resumeData, projects: newProjects })
                              }}
                            />
                          </div>
                          <div className="col-span-2">
                            <Label>Description</Label>
                            <textarea
                              rows={3}
                              className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-neutral-900"
                              value={project.description}
                              onChange={(e) => {
                                const newProjects = [...(resumeData.projects || [])]
                                newProjects[index].description = e.target.value
                                setResumeData({ ...resumeData, projects: newProjects })
                              }}
                            />
                          </div>
                          <div>
                            <Label>Technologies Used</Label>
                            <Input
                              placeholder="e.g., React, Node.js, MongoDB"
                              value={project.technologies}
                              onChange={(e) => {
                                const newProjects = [...(resumeData.projects || [])]
                                newProjects[index].technologies = e.target.value
                                setResumeData({ ...resumeData, projects: newProjects })
                              }}
                            />
                          </div>
                          <div>
                            <Label>Project Link (Optional)</Label>
                            <Input
                              placeholder="https://..."
                              value={project.link || ""}
                              onChange={(e) => {
                                const newProjects = [...(resumeData.projects || [])]
                                newProjects[index].link = e.target.value
                                setResumeData({ ...resumeData, projects: newProjects })
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-neutral-500">No projects added yet.</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Languages */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      Languages (Optional)
                    </CardTitle>
                    <Button size="sm" onClick={addLanguage}>
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {resumeData.languages && resumeData.languages.length > 0 ? (
                    resumeData.languages.map((lang, index) => (
                      <div key={lang.id} className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg space-y-3">
                        <div className="flex justify-between items-start">
                          <h4 className="font-semibold">Language {index + 1}</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeLanguage(lang.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label>Language</Label>
                            <Input
                              placeholder="e.g., English, Spanish"
                              value={lang.language}
                              onChange={(e) => {
                                const newLangs = [...(resumeData.languages || [])]
                                newLangs[index].language = e.target.value
                                setResumeData({ ...resumeData, languages: newLangs })
                              }}
                            />
                          </div>
                          <div>
                            <Label>Proficiency</Label>
                            <Input
                              placeholder="e.g., Native, Fluent, Intermediate"
                              value={lang.proficiency}
                              onChange={(e) => {
                                const newLangs = [...(resumeData.languages || [])]
                                newLangs[index].proficiency = e.target.value
                                setResumeData({ ...resumeData, languages: newLangs })
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-neutral-500">No languages added yet.</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Awards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Awards & Achievements (Optional)
                    </CardTitle>
                    <Button size="sm" onClick={addAward}>
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {resumeData.awards && resumeData.awards.length > 0 ? (
                    resumeData.awards.map((award, index) => (
                      <div key={award.id} className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg space-y-3">
                        <div className="flex justify-between items-start">
                          <h4 className="font-semibold">Award {index + 1}</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeAward(award.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label>Award Title</Label>
                            <Input
                              value={award.title}
                              onChange={(e) => {
                                const newAwards = [...(resumeData.awards || [])]
                                newAwards[index].title = e.target.value
                                setResumeData({ ...resumeData, awards: newAwards })
                              }}
                            />
                          </div>
                          <div>
                            <Label>Issuing Organization</Label>
                            <Input
                              value={award.issuer}
                              onChange={(e) => {
                                const newAwards = [...(resumeData.awards || [])]
                                newAwards[index].issuer = e.target.value
                                setResumeData({ ...resumeData, awards: newAwards })
                              }}
                            />
                          </div>
                          <div>
                            <Label>Date Received</Label>
                            <Input
                              type="month"
                              value={award.date}
                              onChange={(e) => {
                                const newAwards = [...(resumeData.awards || [])]
                                newAwards[index].date = e.target.value
                                setResumeData({ ...resumeData, awards: newAwards })
                              }}
                            />
                          </div>
                          <div className="col-span-2">
                            <Label>Description (Optional)</Label>
                            <textarea
                              rows={2}
                              className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-neutral-900"
                              value={award.description || ""}
                              onChange={(e) => {
                                const newAwards = [...(resumeData.awards || [])]
                                newAwards[index].description = e.target.value
                                setResumeData({ ...resumeData, awards: newAwards })
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-neutral-500">No awards added yet.</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-24 h-fit">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-white dark:bg-neutral-900">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5" />
                      Live Preview
                    </CardTitle>
                    {template && (
                      <span className="text-xs text-gray-500">
                        {template.name} ({template.category})
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-neutral-200 rounded-lg shadow-lg overflow-hidden" style={{ minHeight: "800px" }}>
                    {/* Dynamic Resume Preview based on template */}
                    {getResumePreview(templateId, resumeData)}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
