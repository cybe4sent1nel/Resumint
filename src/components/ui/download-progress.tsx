"use client"

import { motion } from "framer-motion"
import { LottieAnimation } from "@/components/animations"

interface DownloadProgressProps {
  fileName?: string
  progress?: number
  className?: string
}

export function DownloadProgress({ 
  fileName = "Resume.pdf", 
  progress = 0,
  className = "" 
}: DownloadProgressProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`text-center p-8 bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border-2 border-blue-500 ${className}`}
    >
      <LottieAnimation
        animationPath="/animations/downloading.json"
        className="w-full max-w-xs mx-auto h-48 mb-4"
      />
      <h3 className="text-xl font-bold mb-2">Downloading...</h3>
      <p className="text-neutral-600 dark:text-neutral-400 mb-4">
        {fileName}
      </p>
      
      {/* Progress Bar */}
      <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2 mb-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
        />
      </div>
      <p className="text-sm text-neutral-500">{progress}%</p>
    </motion.div>
  )
}
