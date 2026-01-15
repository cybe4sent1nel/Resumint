"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Globe, Palette, Code, Sparkles, ArrowRight, Eye, Download, Upload, Link2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { LottieAnimation } from "@/components/animations"
import { portfolioTemplates } from "@/components/portfolio-templates"

export default function PortfolioPage() {
  const [formData, setFormData] = useState({
    name: "",
    domain: "",
    template: "",
    linkedinUrl: "",
    resumeFile: null as File | null
  })
  const [importing, setImporting] = useState(false)

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, resumeFile: file })
      // Here you would parse the resume and extract data
    }
  }

  const handleLinkedInImport = async () => {
    if (!formData.linkedinUrl) return
    setImporting(true)
    try {
      const response = await fetch('/api/linkedin/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          method: 'url-scrape',
          data: { profileUrl: formData.linkedinUrl }
        })
      })
      const data = await response.json()
      // Populate form with LinkedIn data
      setFormData(prev => ({ ...prev, name: data.name || prev.name }))
    } catch (error) {
      console.error('LinkedIn import failed:', error)
    }
    setImporting(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-neutral-950 dark:via-purple-950/20 dark:to-blue-950/20 py-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Create Your Portfolio Website
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Build a stunning portfolio website in minutes. Showcase your projects, skills, and achievements professionally.
          </p>
        </motion.div>

        {/* Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mb-16"
        >
          <LottieAnimation
            animationPath="/animations/saas cloud.json"
            className="w-full max-w-md h-64"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto mb-16">
          {/* Portfolio Builder Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="p-8">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="text-3xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Generate Your Portfolio
                </CardTitle>
                <CardDescription className="text-base">
                  Fill in your details and we'll create a beautiful portfolio website for you
                </CardDescription>
              </CardHeader>
              <CardContent className="px-0">
                <form className="space-y-6">
                  {/* LinkedIn Import */}
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg space-y-3">
                    <Label className="text-sm font-semibold">Import from LinkedIn</Label>
                    <div className="flex gap-2">
                      <Input
                        type="url"
                        placeholder="https://linkedin.com/in/yourprofile"
                        value={formData.linkedinUrl}
                        onChange={(e) => setFormData({...formData, linkedinUrl: e.target.value})}
                      />
                      <Button 
                        type="button" 
                        onClick={handleLinkedInImport}
                        disabled={importing || !formData.linkedinUrl}
                      >
                        <Link2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Resume Upload */}
                  <div className="p-4 bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg space-y-3">
                    <Label className="text-sm font-semibold">Or Upload Resume</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleResumeUpload}
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                      />
                    </div>
                    {formData.resumeFile && (
                      <p className="text-xs text-green-600">✓ {formData.resumeFile.name} uploaded</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="domain">Preferred Domain</Label>
                    <Input
                      id="domain"
                      placeholder="johndoe"
                      value={formData.domain}
                      onChange={(e) => setFormData({...formData, domain: e.target.value})}
                    />
                    <p className="text-sm text-neutral-500">
                      Your site will be: {formData.domain || "yourname"}.resumint.dev
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Select Template</Label>
                    <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-2">
                      {portfolioTemplates.map((template) => {
                        const PreviewComponent = template.component
                        return (
                          <button
                            key={template.id}
                            type="button"
                            onClick={() => setFormData({...formData, template: template.id.toString()})}
                            className={`rounded-lg border-2 transition overflow-hidden ${
                              formData.template === template.id.toString()
                                ? "border-purple-500 ring-2 ring-purple-200"
                                : "border-neutral-200 dark:border-neutral-800 hover:border-purple-300"
                            }`}
                          >
                            <div className="h-40 flex items-center justify-center bg-gray-50 dark:bg-gray-900 overflow-hidden p-2">
                              <div className="transform scale-[0.28] origin-center w-[400px] h-[300px]">
                                <PreviewComponent name={formData.name || "Your Name"} title="Professional" />
                              </div>
                            </div>
                            <div className="p-2 bg-white dark:bg-neutral-900">
                              <p className="text-xs font-semibold truncate">{template.name}</p>
                              <p className="text-[10px] text-neutral-500 truncate">{template.category}</p>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    Generate Portfolio
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold mb-8">What You Get</h2>
            
            {[
              {
                icon: Globe,
                title: "Custom Domain",
                description: "Get your own subdomain or connect a custom domain"
              },
              {
                icon: Palette,
                title: "Beautiful Designs",
                description: "25 professionally designed portfolio templates"
              },
              {
                icon: Code,
                title: "Project Showcase",
                description: "Display your projects with live demos and code"
              },
              {
                icon: Sparkles,
                title: "Auto-Updated",
                description: "Updates automatically from your resume and LinkedIn"
              }
            ].map((feature, i) => (
              <Card key={i} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-lg">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{feature.title}</h3>
                    <p className="text-neutral-600 dark:text-neutral-400">{feature.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </motion.div>
        </div>

        {/* Template Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-center mb-8">All 25 Portfolio Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {portfolioTemplates.map((template) => {
              const PreviewComponent = template.component
              return (
                <Card key={template.id} className="overflow-hidden hover:shadow-2xl transition group cursor-pointer">
                  <div className="h-56 relative group-hover:scale-105 transition overflow-hidden flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                    <div className="transform scale-[0.35] origin-center w-[450px] h-[350px]">
                      <PreviewComponent name="Your Name" title="Professional" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg truncate">{template.name}</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 truncate">{template.category}</p>
                    <Button size="sm" className="w-full mt-3 bg-gradient-to-r from-purple-600 to-blue-600">
                      <Eye className="h-4 w-4 mr-2" />
                      Use Template
                    </Button>
                  </div>
                </Card>
              )
            })}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
