"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Home, Search, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LottieAnimation } from "@/components/animations"

export default function NotFound() {
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
            animationPath="/animations/Error 404 Animation.json"
            className="w-full max-w-lg mx-auto h-96 mb-8"
          />
          
          <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            404
          </h1>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Oops! Page Not Found
          </h2>
          
          <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto">
            The page you're looking for seems to have wandered off. Don't worry, we'll help you get back on track!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                <Home className="mr-2 h-5 w-5" />
                Back to Home
              </Button>
            </Link>
            
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-2 border-purple-600">
                <Search className="mr-2 h-5 w-5" />
                Contact Support
              </Button>
            </Link>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Link href="/templates">
              <div className="p-6 bg-white dark:bg-neutral-900 rounded-xl shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-purple-500 cursor-pointer">
                <h3 className="font-bold mb-2">Browse Templates</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Check out our 50+ resume templates
                </p>
              </div>
            </Link>
            
            <Link href="/pricing">
              <div className="p-6 bg-white dark:bg-neutral-900 rounded-xl shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-purple-500 cursor-pointer">
                <h3 className="font-bold mb-2">View Pricing</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Find the perfect plan for you
                </p>
              </div>
            </Link>
            
            <Link href="/about">
              <div className="p-6 bg-white dark:bg-neutral-900 rounded-xl shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-purple-500 cursor-pointer">
                <h3 className="font-bold mb-2">About Us</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Learn more about ResumINT
                </p>
              </div>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
