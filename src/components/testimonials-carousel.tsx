'use client'

import { useEffect, useState } from 'react'
import { Star } from 'lucide-react'
import { motion } from 'framer-motion'

interface Testimonial {
  id: string
  rating: number
  comment: string
  user: {
    name: string
    email: string
  }
  createdAt: string
}

export function TestimonialsCarousel() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/feedback')
      if (response.ok) {
        const data = await response.json()
        setTestimonials(data)
      }
    } catch (error) {
      console.error('Failed to fetch testimonials:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center text-neutral-400">Loading testimonials...</div>
  }

  if (testimonials.length === 0) {
    return (
      <div className="text-center py-8 text-neutral-400">
        Be the first to share your experience!
      </div>
    )
  }

  // Duplicate testimonials for infinite scroll effect
  const displayTestimonials = [...testimonials, ...testimonials]

  return (
    <div className="w-full overflow-hidden bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 rounded-lg p-8">
      <div className="flex gap-6 animate-scroll">
        {displayTestimonials.map((testimonial, index) => (
          <motion.div
            key={`${testimonial.id}-${index}`}
            className="flex-shrink-0 w-80 bg-white rounded-lg p-6 shadow-md border border-neutral-200"
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-neutral-900">{testimonial.user.name}</h3>
                <p className="text-sm text-neutral-500">{testimonial.user.email}</p>
              </div>
            </div>

            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={`${
                    i < testimonial.rating
                      ? 'fill-yellow-400 stroke-yellow-400'
                      : 'stroke-neutral-300'
                  }`}
                />
              ))}
            </div>

            <p className="text-neutral-600 text-sm leading-relaxed">
              "{testimonial.comment}"
            </p>

            <p className="text-xs text-neutral-400 mt-4">
              {new Date(testimonial.createdAt).toLocaleDateString()}
            </p>
          </motion.div>
        ))}
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}
