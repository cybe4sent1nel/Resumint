"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LottieAnimation } from "@/components/animations"
import { Star, TrendingUp, Award } from "lucide-react"

interface ScoreCalculatorProps {
  score?: number
  onComplete?: (score: number) => void
  className?: string
}

export function ScoreCalculator({ 
  score = 85, 
  onComplete,
  className = "" 
}: ScoreCalculatorProps) {
  const [calculating, setCalculating] = useState(true)
  const [displayScore, setDisplayScore] = useState(0)

  useEffect(() => {
    // Simulate calculation time
    const timer = setTimeout(() => {
      setCalculating(false)
      
      // Animate score counting up
      let current = 0
      const increment = score / 50 // 50 frames
      const countInterval = setInterval(() => {
        current += increment
        if (current >= score) {
          setDisplayScore(score)
          clearInterval(countInterval)
          onComplete?.(score)
        } else {
          setDisplayScore(Math.floor(current))
        }
      }, 20)
    }, 2500)

    return () => clearTimeout(timer)
  }, [score, onComplete])

  const getScoreColor = () => {
    if (score >= 80) return "from-green-600 to-emerald-600"
    if (score >= 60) return "from-yellow-600 to-orange-600"
    return "from-red-600 to-orange-600"
  }

  const getScoreLabel = () => {
    if (score >= 80) return "Excellent"
    if (score >= 60) return "Good"
    return "Needs Improvement"
  }

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        {calculating ? (
          <motion.div
            key="calculating"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center p-8 bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border-2 border-purple-500"
          >
            <LottieAnimation
              animationPath="/animations/saas cloud.json"
              className="w-full max-w-sm mx-auto h-64 mb-4"
            />
            <h3 className="text-2xl font-bold mb-2">Analyzing Your Resume...</h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Our AI is evaluating your resume quality, ATS compatibility, and content optimization
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center p-8 bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border-2 border-purple-500"
          >
            <div className="mb-6">
              <div className={`text-8xl font-bold bg-gradient-to-r ${getScoreColor()} bg-clip-text text-transparent mb-4`}>
                {displayScore}
              </div>
              <div className="flex items-center justify-center gap-2 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-6 w-6 ${
                      i < Math.floor(score / 20)
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-neutral-300 dark:text-neutral-700"
                    }`}
                  />
                ))}
              </div>
              <p className={`text-2xl font-bold bg-gradient-to-r ${getScoreColor()} bg-clip-text text-transparent`}>
                {getScoreLabel()}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                <TrendingUp className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <p className="text-sm font-semibold">ATS Score</p>
                <p className="text-2xl font-bold">{Math.min(95, score + 10)}%</p>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <Award className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <p className="text-sm font-semibold">Quality</p>
                <p className="text-2xl font-bold">{Math.min(98, score + 8)}%</p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <Star className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <p className="text-sm font-semibold">Impact</p>
                <p className="text-2xl font-bold">{Math.min(92, score + 5)}%</p>
              </div>
            </div>

            <p className="text-neutral-600 dark:text-neutral-400">
              Your resume has been scored and optimized for maximum impact
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
