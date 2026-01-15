'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, Loader } from 'lucide-react'

function VerifyEmailContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get('token')

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!token) {
      setStatus('error')
      setMessage('No verification token provided')
      return
    }

    verifyEmail()
  }, [token])

  const verifyEmail = async () => {
    try {
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })

      if (response.ok) {
        setStatus('success')
        setMessage('Email verified successfully! Redirecting to login...')
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      } else {
        const data = await response.json()
        setStatus('error')
        setMessage(data.error || 'Failed to verify email')
      }
    } catch (error) {
      setStatus('error')
      setMessage('An error occurred while verifying your email')
      console.error('Verification error:', error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          {status === 'loading' && (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="mb-6 flex justify-center"
              >
                <Loader className="h-12 w-12 text-emerald-500" />
              </motion.div>
              <h1 className="text-2xl font-bold mb-2">Verifying your email...</h1>
              <p className="text-neutral-600">Please wait while we confirm your email address.</p>
            </>
          )}

          {status === 'success' && (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-6 flex justify-center"
              >
                <CheckCircle className="h-16 w-16 text-green-500" />
              </motion.div>
              <h1 className="text-2xl font-bold mb-2 text-green-600">Email Verified!</h1>
              <p className="text-neutral-600 mb-6">{message}</p>
              <Button
                onClick={() => router.push('/login')}
                className="w-full"
              >
                Go to Login
              </Button>
            </>
          )}

          {status === 'error' && (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-6 flex justify-center"
              >
                <XCircle className="h-16 w-16 text-red-500" />
              </motion.div>
              <h1 className="text-2xl font-bold mb-2 text-red-600">Verification Failed</h1>
              <p className="text-neutral-600 mb-6">{message}</p>
              <div className="space-y-3">
                <Button
                  onClick={() => router.push('/signup')}
                  className="w-full"
                >
                  Try Again
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push('/login')}
                  className="w-full"
                >
                  Go to Login
                </Button>
              </div>
            </>
          )}
        </div>

        <div className="mt-6 text-center text-sm text-neutral-600">
          <img
            src="https://xerothermic-beige-i5tbo3rmdi.edgeone.dev/resumint.png"
            alt="Resumint"
            className="h-8 w-8 mx-auto mb-2"
          />
          <p>Resumint - AI-Powered Resume Builder</p>
        </div>
      </motion.div>
    </div>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  )
}
