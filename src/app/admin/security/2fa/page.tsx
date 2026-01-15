'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { AlertCircle, CheckCircle, QrCode } from 'lucide-react'

export default function TwoFactorAuthPage() {
  const [step, setStep] = useState<'disabled' | 'setup' | 'verify' | 'enabled'>('disabled')
  const [qrCode, setQrCode] = useState('')
  const [secret, setSecret] = useState('')
  const [manualKey, setManualKey] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    check2FAStatus()
  }, [])

  const check2FAStatus = async () => {
    try {
      const response = await fetch('/api/auth/profile')
      if (response.ok) {
        const data = await response.json()
        if (data.twoFAEnabled) {
          setStep('enabled')
        } else {
          setStep('disabled')
        }
      }
    } catch (error) {
      console.error('Failed to check 2FA status:', error)
    }
  }

  const setupTwoFA = async () => {
    setIsLoading(true)
    setError('')
    try {
      const response = await fetch('/api/auth/2fa/setup', {
        method: 'POST',
      })

      if (response.ok) {
        const data = await response.json()
        setQrCode(data.qrCode)
        setSecret(data.secret)
        setManualKey(data.manualEntryKey)
        setStep('verify')
      } else {
        setError('Failed to generate 2FA setup')
      }
    } catch (err) {
      setError('An error occurred')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const verifyAndEnable = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      setError('Please enter a valid 6-digit code')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/2fa/setup', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret, code: verificationCode }),
      })

      if (response.ok) {
        setStep('enabled')
        setVerificationCode('')
        setSecret('')
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to enable 2FA')
      }
    } catch (err) {
      setError('An error occurred')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  if (step === 'disabled') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Two-Factor Authentication</h1>
          <p className="text-neutral-600">Secure your admin account with 2FA</p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex gap-3">
          <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-yellow-900 mb-1">2FA Not Enabled</h3>
            <p className="text-sm text-yellow-800">
              Protect your account by enabling two-factor authentication. You'll need an authenticator app like Google Authenticator or Authy.
            </p>
          </div>
        </div>

        <Button onClick={setupTwoFA} disabled={isLoading} size="lg">
          {isLoading ? 'Setting up...' : 'Enable 2FA'}
        </Button>
      </div>
    )
  }

  if (step === 'verify') {
    return (
      <Dialog open={step === 'verify'} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Set Up Two-Factor Authentication</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-6">
            <div>
              <h3 className="font-semibold mb-4">Step 1: Scan QR Code</h3>
              <p className="text-sm text-neutral-600 mb-4">
                Use an authenticator app (Google Authenticator, Authy, Microsoft Authenticator, etc.) to scan this QR code:
              </p>
              
              <div className="flex justify-center p-4 bg-neutral-100 rounded-lg">
                <div dangerouslySetInnerHTML={{ __html: qrCode }} />
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Can't scan? Enter manually:</h3>
              <div className="bg-neutral-100 p-4 rounded-lg font-mono text-sm break-all text-center">
                {manualKey}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Step 2: Enter Verification Code</h3>
              <p className="text-sm text-neutral-600 mb-4">
                Enter the 6-digit code from your authenticator app:
              </p>
              
              <Input
                type="text"
                placeholder="000000"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.slice(0, 6))}
                maxLength={6}
                className="text-center text-2xl tracking-widest"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex gap-2">
                <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setStep('disabled')}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={verifyAndEnable}
                disabled={isLoading || verificationCode.length !== 6}
                className="flex-1"
              >
                {isLoading ? 'Verifying...' : 'Enable 2FA'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  if (step === 'enabled') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Two-Factor Authentication</h1>
          <p className="text-neutral-600">Your account is protected with 2FA</p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-green-900 mb-1">2FA Enabled</h3>
            <p className="text-sm text-green-800">
              Your admin account is now protected with two-factor authentication. You'll need to enter a code from your authenticator app when logging in.
            </p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">Important:</h3>
          <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
            <li>Keep your authenticator app secure</li>
            <li>Backup codes aren't available yet - we'll add that soon</li>
            <li>You'll need your authenticator app every time you login</li>
          </ul>
        </div>
      </div>
    )
  }

  return null
}
