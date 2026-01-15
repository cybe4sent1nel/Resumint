"use client"

import { LottieAnimation } from "@/components/animations"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl"
  message?: string
  className?: string
}

export function LoadingSpinner({ 
  size = "md", 
  message = "Loading...",
  className = "" 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-24",
    md: "h-48",
    lg: "h-64",
    xl: "h-96"
  }

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <LottieAnimation
        animationPath="/animations/Sandy Loading.json"
        className={`w-full max-w-md ${sizeClasses[size]}`}
      />
      {message && (
        <p className="text-lg text-neutral-600 dark:text-neutral-400 mt-4 animate-pulse">
          {message}
        </p>
      )}
    </div>
  )
}
