"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FileUpload } from "@/components/ui/file-upload"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { DownloadProgress } from "@/components/ui/download-progress"
import { ScoreCalculator } from "@/components/ui/score-calculator"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, Download, Calculator, Loader } from "lucide-react"

export default function DemoPage() {
  const [showUpload, setShowUpload] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const [showDownload, setShowDownload] = useState(false)
  const [showScore, setShowScore] = useState(false)
  const [downloadProgress, setDownloadProgress] = useState(0)

  const simulateDownload = () => {
    setShowDownload(true)
    setDownloadProgress(0)
    
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setShowDownload(false), 1000)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-neutral-950 dark:via-purple-950/20 dark:to-blue-950/20 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Animation Showcase
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Experience all the interactive animations and UI components in action
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          {/* Upload Demo */}
          <Card className="p-8">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Upload className="h-8 w-8 text-purple-600" />
              File Upload
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              Drag & drop file upload with animation
            </p>
            {!showUpload ? (
              <Button
                onClick={() => setShowUpload(true)}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600"
              >
                Show Upload
              </Button>
            ) : (
              <div>
                <FileUpload
                  onUpload={async (file) => {
                    await new Promise(resolve => setTimeout(resolve, 2000))
                  }}
                />
                <Button
                  onClick={() => setShowUpload(false)}
                  variant="outline"
                  className="w-full mt-4"
                >
                  Hide
                </Button>
              </div>
            )}
          </Card>

          {/* Loading Demo */}
          <Card className="p-8">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Loader className="h-8 w-8 text-blue-600" />
              Loading State
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              Animated loading spinner
            </p>
            {!showLoading ? (
              <Button
                onClick={() => {
                  setShowLoading(true)
                  setTimeout(() => setShowLoading(false), 3000)
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
              >
                Show Loading
              </Button>
            ) : (
              <LoadingSpinner message="Processing your request..." />
            )}
          </Card>

          {/* Download Demo */}
          <Card className="p-8">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Download className="h-8 w-8 text-green-600" />
              Download Progress
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              Download progress with animation
            </p>
            {!showDownload ? (
              <Button
                onClick={simulateDownload}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600"
              >
                Start Download
              </Button>
            ) : (
              <DownloadProgress
                fileName="My-Resume.pdf"
                progress={downloadProgress}
              />
            )}
          </Card>

          {/* Score Calculator Demo */}
          <Card className="p-8">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Calculator className="h-8 w-8 text-orange-600" />
              Score Calculator
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              AI resume score analysis
            </p>
            {!showScore ? (
              <Button
                onClick={() => setShowScore(true)}
                className="w-full bg-gradient-to-r from-orange-600 to-red-600"
              >
                Calculate Score
              </Button>
            ) : (
              <div>
                <ScoreCalculator
                  score={Math.floor(Math.random() * 30) + 70}
                  onComplete={() => {
                    setTimeout(() => setShowScore(false), 5000)
                  }}
                />
              </div>
            )}
          </Card>
        </div>

        {/* Navigation Links */}
        <div className="text-center">
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            Try navigating to error pages to see more animations:
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/not-found-test" className="text-purple-600 hover:underline font-semibold">
              404 Error Page
            </a>
            <a href="/offline" className="text-purple-600 hover:underline font-semibold">
              Offline Page
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
