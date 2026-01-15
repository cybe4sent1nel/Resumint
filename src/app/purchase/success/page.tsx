"use client"

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { CheckCircle2, Download, Home, Mail, Sparkles, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'

function PurchaseSuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [purchaseData, setPurchaseData] = useState<any>(null)

  const orderId = searchParams.get('orderId')
  const type = searchParams.get('type') // 'subscription', 'api', 'credits'
  const plan = searchParams.get('plan')

  useEffect(() => {
    // Trigger confetti celebration
    const duration = 3 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      })
    }, 250)

    // Fetch purchase details
    if (orderId) {
      fetchPurchaseDetails(orderId)
    }

    return () => clearInterval(interval)
  }, [orderId])

  const fetchPurchaseDetails = async (id: string) => {
    try {
      const response = await fetch(`/api/purchase/details?orderId=${id}`)
      if (response.ok) {
        const data = await response.json()
        setPurchaseData(data)
      }
    } catch (error) {
      console.error('Error fetching purchase details:', error)
    }
  }

  const getPurchaseIcon = () => {
    switch (type) {
      case 'subscription':
        return <Sparkles className="w-16 h-16 text-purple-500" />
      case 'api':
        return <Zap className="w-16 h-16 text-blue-500" />
      case 'credits':
        return <Sparkles className="w-16 h-16 text-amber-500" />
      default:
        return <CheckCircle2 className="w-16 h-16 text-green-500" />
    }
  }

  const getPurchaseTitle = () => {
    switch (type) {
      case 'subscription':
        return `Welcome to ${plan || 'Premium'}! 🎉`
      case 'api':
        return `API Access Activated! ⚡`
      case 'credits':
        return `Credits Added Successfully! ✨`
      default:
        return 'Purchase Successful! 🎊'
    }
  }

  const getPurchaseMessage = () => {
    switch (type) {
      case 'subscription':
        return `Your ${plan || 'Premium'} subscription is now active. Enjoy unlimited access to all premium features!`
      case 'api':
        return `Your API access has been activated. Start integrating our powerful APIs into your applications!`
      case 'credits':
        return `Your credits have been added to your account. Start creating amazing resumes and portfolios!`
      default:
        return 'Your purchase has been completed successfully. Check your email for confirmation.'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="border-2 border-purple-200 dark:border-purple-800 shadow-2xl">
          <CardContent className="p-8 md:p-12 text-center space-y-6">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="flex justify-center"
            >
              <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                {process.env.NEXT_PUBLIC_LOGO_URL ? (
                  <Image
                    src={process.env.NEXT_PUBLIC_LOGO_URL}
                    alt="Logo"
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                ) : (
                  getPurchaseIcon()
                )}
              </div>
            </motion.div>

            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            >
              <CheckCircle2 className="w-20 h-20 mx-auto text-green-500" />
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
            >
              {getPurchaseTitle()}
            </motion.h1>

            {/* Message */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-muted-foreground max-w-md mx-auto"
            >
              {getPurchaseMessage()}
            </motion.p>

            {/* Order Details */}
            {orderId && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 max-w-md mx-auto"
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Order ID:</span>
                  <span className="font-mono font-semibold">{orderId}</span>
                </div>
              </motion.div>
            )}

            {/* Email Notification */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-center justify-center gap-2 text-sm text-muted-foreground"
            >
              <Mail className="w-4 h-4" />
              <span>A confirmation email has been sent to your inbox</span>
            </motion.div>

            {/* Purchase Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid gap-4 max-w-md mx-auto mt-6"
            >
              {type === 'subscription' && (
                <>
                  <BenefitItem icon={<Sparkles className="w-5 h-5" />} text="Unlimited AI-powered resumes" />
                  <BenefitItem icon={<Download className="w-5 h-5" />} text="Export to PDF & DOCX" />
                  <BenefitItem icon={<Zap className="w-5 h-5" />} text="Priority support" />
                </>
              )}
              {type === 'api' && (
                <>
                  <BenefitItem icon={<Zap className="w-5 h-5" />} text="Full API access" />
                  <BenefitItem icon={<Sparkles className="w-5 h-5" />} text="Webhook support" />
                  <BenefitItem icon={<Mail className="w-5 h-5" />} text="Developer documentation" />
                </>
              )}
              {type === 'credits' && (
                <>
                  <BenefitItem icon={<Sparkles className="w-5 h-5" />} text="AI resume generation" />
                  <BenefitItem icon={<Zap className="w-5 h-5" />} text="Portfolio builder" />
                  <BenefitItem icon={<Download className="w-5 h-5" />} text="Instant exports" />
                </>
              )}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
            >
              <Button
                size="lg"
                onClick={() => router.push('/dashboard')}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Go to Dashboard
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => router.push('/')}
              >
                <Home className="w-5 h-5 mr-2" />
                Back to Home
              </Button>
            </motion.div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-6 text-sm text-muted-foreground"
        >
          <p>Need help? Contact us at{' '}
            <a href="mailto:resumint.info@gmail.com" className="text-purple-600 hover:underline">
              resumint.info@gmail.com
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default function PurchaseSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    }>
      <PurchaseSuccessContent />
    </Suspense>
  )
}

function BenefitItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3 text-left p-3 rounded-lg bg-white dark:bg-gray-800 border border-purple-100 dark:border-purple-800">
      <div className="text-purple-600 dark:text-purple-400">{icon}</div>
      <span className="text-sm font-medium">{text}</span>
    </div>
  )
}
