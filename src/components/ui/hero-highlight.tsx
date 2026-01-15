"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import React from "react"

export const HeroHighlight = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div
      className={cn(
        "relative h-full w-full flex items-center justify-center",
        className
      )}
    >
      {children}
    </div>
  )
}

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <motion.span
      initial={{
        backgroundSize: "0% 100%",
      }}
      animate={{
        backgroundSize: "100% 100%",
      }}
      transition={{
        duration: 2,
        ease: "linear",
        delay: 0.5,
      }}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
        display: "inline",
      }}
      className={cn(
        "relative inline-block pb-1 px-1 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 dark:from-purple-600 dark:to-blue-600",
        className
      )}
    >
      {children}
    </motion.span>
  )
}
