'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Home, Wifi } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LottieAnimation } from '@/components/animations'

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-8"
          >
            {/* Large Lottie Animation */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <LottieAnimation
                animationPath="/animations/No Connection.json"
                className="w-full h-[500px] md:h-[600px]"
              />
            </motion.div>

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-6xl md:text-7xl font-bold mb-4 text-neutral-900">
                You're Offline
              </h1>
              <p className="text-2xl text-neutral-600">
                No internet connection detected
              </p>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed"
            >
              It looks like you've lost your internet connection. Don't worry, we'll automatically reconnect as soon as you're back online. Some features may be unavailable while offline.
            </motion.p>

            {/* Status Message */}
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-neutral-500 text-sm font-medium"
            >
              Waiting for connection...
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
            >
              <Button
                size="lg"
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 text-lg"
              >
                <Wifi className="mr-2 h-5 w-5" />
                Retry Connection
              </Button>

              <Link href="/">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-neutral-300 hover:bg-neutral-50 px-8 py-6 text-lg"
                >
                  <Home className="mr-2 h-5 w-5" />
                  Back to Home
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Pastel Footer */}
      <footer className="bg-gradient-to-r from-rose-100 via-pink-100 to-orange-100 py-12 border-t border-rose-200">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img
              src="https://xerothermic-beige-i5tbo3rmdi.edgeone.dev/resumint.png"
              alt="Resumint"
              className="h-6 w-6 rounded"
              width={24}
              height={24}
            />
            <span className="text-lg font-semibold text-rose-900">Resumint</span>
          </div>
          <p className="text-rose-700 mb-3">
            We're here when you're ready
          </p>
          <p className="text-sm text-rose-600">
            © 2026 Resumint. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
