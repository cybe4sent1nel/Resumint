"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Loader2, Link2, Zap, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import { LottieAnimation } from "@/components/animations"
import type { ResumeAnalysis } from "@/lib/ai/resume-analyzer"

interface ScrapedData {
  name?: string
  email?: string
  phone?: string
  headline?: string
  summary?: string
  experience?: string
  education?: string
  skills?: string[]
}

export default function GenerateResumePage() {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [scrapedData, setScrapedData] = useState<ScrapedData | null>(null)
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null)
  const [error, setError] = useState("")
  const [step, setStep] = useState<"input" | "preview" | "analysis">("input")

  const handleScrape = async () => {
    if (!url.trim()) {
      setError("Please enter a valid URL")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/scrape-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url })
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to scrape profile")
      }

      setScrapedData(result.data)
      setStep("preview")

      // Auto-analyze the extracted data
      if (result.data) {
        analyzeExtractedData(result.data)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to scrape profile")
    } finally {
      setLoading(false)
    }
  }

  const analyzeExtractedData = async (data: ScrapedData) => {
    try {
      // Combine scraped data into resume text format
      const resumeText = `
${data.name || "Professional"}
${data.headline || ""}
${data.email || ""} | ${data.phone || ""}

SUMMARY
${data.summary || "Professional with diverse experience"}

EXPERIENCE
${data.experience || "Experience details coming from profile"}

EDUCATION
${data.education || "Education details coming from profile"}

SKILLS
${(data.skills || []).join(", ")}
      `.trim()

      const response = await fetch("/api/analyze-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText })
      })

      const result = await response.json()

      if (result.success) {
        setAnalysis(result.analysis)
        setStep("analysis")
      }
    } catch (err) {
      console.error("Analysis error:", err)
    }
  }

  const handleCreateResume = () => {
    // Create a new resume with the scraped data
    const resumeData = JSON.stringify({
      personalInfo: {
        fullName: scrapedData?.name || "",
        email: scrapedData?.email || "",
        phone: scrapedData?.phone || "",
        headline: scrapedData?.headline || ""
      },
      summary: scrapedData?.summary || "",
      experience: scrapedData?.experience || "",
      education: scrapedData?.education || "",
      skills: scrapedData?.skills || []
    })

    // Redirect to editor with data
    window.location.href = `/editor/resume/1?data=${encodeURIComponent(resumeData)}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-lemon-50 via-white to-lemon-50 py-20 relative overflow-hidden" style={{
      background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(197, 225, 165, 0.05) 100%)'
    }}>
      {/* Animated Background - Right Side */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-full opacity-50 dark:opacity-30 pointer-events-none hidden lg:flex items-center justify-end">
        <div className="w-full h-96 max-w-sm">
          <LottieAnimation
            animationPath="/animations/generate resume.json"
            className="w-full h-full"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        {/* Header */}
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
          suppressHydrationWarning
        >
          <h1 className="heading-h1 mb-4 text-gray-900">
            Generate Your Resume
          </h1>
          <p className="body-large text-gray-600 max-w-2xl mx-auto">
            Paste a link to your LinkedIn, portfolio, or website. We'll automatically extract your
            information and create a professional resume with AI analysis.
          </p>
        </motion.div>

        {/* Step 1: URL Input */}
        {step === "input" && (
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
            suppressHydrationWarning
          >
            <Card className="card-wispr accent p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    <div className="flex items-center gap-2">
                      <Link2 className="w-5 h-5 text-purple-600" />
                      Paste your profile URL
                    </div>
                  </label>
                  <Input
                    type="url"
                    placeholder="https://linkedin.com/in/yourprofile or https://yourportfolio.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="text-lg p-4"
                    disabled={loading}
                  />
                  <p className="text-sm text-neutral-500 mt-2">
                    Supports LinkedIn, portfolio websites, GitHub profiles, and personal websites
                  </p>
                </div>

                {error && (
                  <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-4 flex gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-red-700 dark:text-red-200">{error}</p>
                  </div>
                )}

                <Button
                  onClick={handleScrape}
                  disabled={loading || !url.trim()}
                  className="btn-primary w-full py-4 text-lg font-semibold"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Analyzing Your Profile...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5 mr-2" />
                      Extract & Analyze
                    </>
                  )}
                </Button>
              </div>
            </Card>

            {/* Info Cards */}
            <div className="grid md:grid-cols-3 gap-4 mt-8">
              {[
                { title: "Fast", desc: "Extract data in seconds" },
                { title: "Accurate", desc: "AI-powered extraction" },
                { title: "Smart", desc: "Instant quality analysis" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Card className="p-6 text-center">
                    <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{item.desc}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2: Preview */}
        {step === "preview" && scrapedData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <Card className="p-8 border-2 border-green-500">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <h2 className="text-2xl font-bold">Profile Data Extracted</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {scrapedData.name && (
                  <div>
                    <label className="text-sm font-semibold text-neutral-600 dark:text-neutral-400">
                      Name
                    </label>
                    <p className="text-lg font-semibold">{scrapedData.name}</p>
                  </div>
                )}

                {scrapedData.email && (
                  <div>
                    <label className="text-sm font-semibold text-neutral-600 dark:text-neutral-400">
                      Email
                    </label>
                    <p className="text-lg font-semibold">{scrapedData.email}</p>
                  </div>
                )}

                {scrapedData.phone && (
                  <div>
                    <label className="text-sm font-semibold text-neutral-600 dark:text-neutral-400">
                      Phone
                    </label>
                    <p className="text-lg font-semibold">{scrapedData.phone}</p>
                  </div>
                )}

                {scrapedData.headline && (
                  <div>
                    <label className="text-sm font-semibold text-neutral-600 dark:text-neutral-400">
                      Headline
                    </label>
                    <p className="text-lg font-semibold">{scrapedData.headline}</p>
                  </div>
                )}
              </div>

              {scrapedData.summary && (
                <div className="mt-6">
                  <label className="text-sm font-semibold text-neutral-600 dark:text-neutral-400">
                    Summary
                  </label>
                  <p className="mt-2">{scrapedData.summary}</p>
                </div>
              )}

              {scrapedData.skills && scrapedData.skills.length > 0 && (
                <div className="mt-6">
                  <label className="text-sm font-semibold text-neutral-600 dark:text-neutral-400">
                    Skills
                  </label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {scrapedData.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </Card>

            {/* Waiting for analysis */}
            {!analysis && (
              <Card className="p-8 border-2 border-blue-500">
                <div className="flex items-center gap-3">
                  <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
                  <div>
                    <h3 className="font-semibold">Analyzing Resume Quality...</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Our AI is reviewing your resume for improvements
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* Step 3: Analysis Results */}
            {analysis && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="p-8 border-2 border-purple-500">
                  <h3 className="text-2xl font-bold mb-6">Resume Analysis Results</h3>

                  {/* Scores */}
                  <div className="grid md:grid-cols-3 gap-4 mb-8">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-purple-600 mb-1">
                        {analysis.overallScore}
                      </div>
                      <p className="text-sm font-semibold text-neutral-600">Overall Score</p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-blue-600 mb-1">
                        {analysis.atsScore}
                      </div>
                      <p className="text-sm font-semibold text-neutral-600">ATS Score</p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-600 mb-1">
                        {analysis.readabilityScore}
                      </div>
                      <p className="text-sm font-semibold text-neutral-600">Readability</p>
                    </div>
                  </div>

                  {/* Strengths */}
                  {analysis.strengths.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        Strengths
                      </h4>
                      <ul className="space-y-2">
                        {analysis.strengths.map((strength, i) => (
                          <li key={i} className="text-sm text-neutral-700 dark:text-neutral-300">
                            ✓ {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Improvements */}
                  {analysis.improvements.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-amber-600" />
                        Recommended Improvements
                      </h4>
                      <div className="space-y-3">
                        {analysis.improvements.slice(0, 3).map((imp, i) => (
                          <div
                            key={i}
                            className="p-3 bg-neutral-50 dark:bg-neutral-900 rounded-lg border-l-4 border-amber-500"
                          >
                            <div className="font-semibold text-sm">{imp.suggestion}</div>
                            <div className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                              {imp.impact}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                onClick={() => setStep("input")}
                variant="outline"
                className="flex-1 py-4 text-lg"
              >
                Back
              </Button>
              <Button
                onClick={handleCreateResume}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 text-lg font-semibold"
              >
                Create Resume
              </Button>
            </div>
          </motion.div>
        )}

        {/* Footer Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">Or start from scratch:</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/templates">
              <Button variant="outline" className="px-6">
                Browse Templates
              </Button>
            </Link>
            <Link href="/generate-portfolio">
              <Button variant="outline" className="px-6">
                Generate Portfolio
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
