"use client"

import { useState, useEffect } from 'react'
import { Progress } from '@/components/ui/progress'
import { Check, X } from 'lucide-react'
import zxcvbn from 'zxcvbn'

interface PasswordStrengthIndicatorProps {
  password: string
}

// Client-side password strength check
function checkPasswordStrength(password: string) {
  const result = zxcvbn(password)
  
  const feedback: string[] = []
  
  if (password.length < 8) {
    feedback.push('Password should be at least 8 characters long')
  }
  if (!/[A-Z]/.test(password)) {
    feedback.push('Add uppercase letters')
  }
  if (!/[a-z]/.test(password)) {
    feedback.push('Add lowercase letters')
  }
  if (!/[0-9]/.test(password)) {
    feedback.push('Add numbers')
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    feedback.push('Add special characters')
  }
  
  return {
    score: result.score,
    feedback: feedback.length > 0 ? feedback : result.feedback.suggestions,
    isStrong: result.score >= 3 && password.length >= 8
  }
}

interface PasswordStrengthIndicatorProps {
  password: string
}

export function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  const [strength, setStrength] = useState<{
    score: number
    feedback: string[]
    isStrong: boolean
  }>({ score: 0, feedback: [], isStrong: false })

  useEffect(() => {
    if (password) {
      const result = checkPasswordStrength(password)
      setStrength(result)
    } else {
      setStrength({ score: 0, feedback: [], isStrong: false })
    }
  }, [password])

  if (!password) return null

  const scorePercentage = (strength.score / 4) * 100
  const scoreColor = 
    strength.score === 0 ? 'bg-red-500' :
    strength.score === 1 ? 'bg-orange-500' :
    strength.score === 2 ? 'bg-yellow-500' :
    strength.score === 3 ? 'bg-blue-500' :
    'bg-green-500'

  const scoreText = 
    strength.score === 0 ? 'Very Weak' :
    strength.score === 1 ? 'Weak' :
    strength.score === 2 ? 'Fair' :
    strength.score === 3 ? 'Good' :
    'Strong'

  const requirements = [
    { text: 'At least 8 characters', met: password.length >= 8 },
    { text: 'One uppercase letter', met: /[A-Z]/.test(password) },
    { text: 'One lowercase letter', met: /[a-z]/.test(password) },
    { text: 'One number', met: /[0-9]/.test(password) },
    { text: 'One special character', met: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
  ]

  return (
    <div className="space-y-3 mt-2">
      {/* Progress bar */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Password Strength:</span>
          <span className={`text-sm font-semibold ${
            strength.score <= 1 ? 'text-red-600' :
            strength.score === 2 ? 'text-yellow-600' :
            strength.score === 3 ? 'text-blue-600' :
            'text-green-600'
          }`}>
            {scoreText}
          </span>
        </div>
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className={`h-full transition-all duration-300 ${scoreColor}`}
            style={{ width: `${scorePercentage}%` }}
          />
        </div>
      </div>

      {/* Requirements checklist */}
      <div className="space-y-1">
        {requirements.map((req, index) => (
          <div
            key={index}
            className={`flex items-center gap-2 text-sm transition-colors ${
              req.met ? 'text-green-600' : 'text-gray-500'
            }`}
          >
            {req.met ? (
              <Check className="h-4 w-4" />
            ) : (
              <X className="h-4 w-4" />
            )}
            <span>{req.text}</span>
          </div>
        ))}
      </div>

      {/* Additional feedback */}
      {strength.feedback.length > 0 && (
        <div className="rounded-lg bg-yellow-50 dark:bg-yellow-950 p-3 border border-yellow-200 dark:border-yellow-800">
          <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-1">
            Suggestions:
          </p>
          <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
            {strength.feedback.slice(0, 3).map((item, index) => (
              <li key={index}>• {item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
