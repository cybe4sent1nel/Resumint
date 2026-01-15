'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Star } from 'lucide-react'

interface FeedbackStepperProps {
  isOpen: boolean
  onClose: () => void
  userId: string
}

export function FeedbackStepper({ isOpen, onClose, userId }: FeedbackStepperProps) {
  const [step, setStep] = useState<'rating' | 'feedback'>('rating')
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (rating === 0) return

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          rating,
          comment: comment || `${rating} star${rating !== 1 ? 's' : ''}`,
        }),
      })

      if (response.ok) {
        onClose()
        setStep('rating')
        setRating(0)
        setComment('')
      }
    } catch (error) {
      console.error('Failed to submit feedback:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {step === 'rating' ? '💬 How was your experience?' : '✨ Tell us more'}
          </DialogTitle>
        </DialogHeader>

        {step === 'rating' ? (
          <div className="flex flex-col items-center gap-6 py-6">
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="transition-all hover:scale-110"
                >
                  <Star
                    size={40}
                    className={`${
                      star <= rating
                        ? 'fill-yellow-400 stroke-yellow-400'
                        : 'stroke-neutral-300'
                    }`}
                  />
                </button>
              ))}
            </div>

            <div className="flex gap-3 w-full">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Maybe Later
              </Button>
              <Button
                onClick={() => setStep('feedback')}
                disabled={rating === 0}
                className="flex-1"
              >
                Next
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4 py-6">
            <Textarea
              placeholder="Tell us what we can improve (optional)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[120px]"
            />

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setStep('rating')}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
