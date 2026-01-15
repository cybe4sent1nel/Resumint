"use client"

export const dynamic = 'force-dynamic'

import { useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Home, RefreshCw, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LottieAnimation } from "@/components/animations"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-neutral-950 dark:via-purple-950/20 dark:to-blue-950/20 p-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <LottieAnimation
            animationPath="/animations/error maintenance.json"
            className="w-full max-w-lg mx-auto h-96 mb-8"
          />
          
          <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            Oops!
          </h1>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Something Went Wrong
          </h2>
          
          <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto">
            We're experiencing technical difficulties. Our team has been notified and we're working on a fix.
          </p>
          
          {error.digest && (
            <p className="text-sm text-neutral-500 mb-6 font-mono">
              Error ID: {error.digest}
            </p>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={reset}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <RefreshCw className="mr-2 h-5 w-5" />
              Try Again
            </Button>
            
            <Link href="/">
              <Button size="lg" variant="outline" className="border-2 border-purple-600">
                <Home className="mr-2 h-5 w-5" />
                Back to Home
              </Button>
            </Link>
            
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-2 border-neutral-400">
                <MessageSquare className="mr-2 h-5 w-5" />
                Contact Support
              </Button>
            </Link>
          </div>
          
          <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl max-w-2xl mx-auto">
            <h3 className="font-bold text-lg mb-2">What you can do:</h3>
            <ul className="text-left space-y-2 text-neutral-700 dark:text-neutral-300">
              <li>• Try refreshing the page</li>
              <li>• Clear your browser cache and cookies</li>
              <li>• Check your internet connection</li>
              <li>• Contact our support team if the problem persists</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
