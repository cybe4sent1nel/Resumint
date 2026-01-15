'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Star, Trash2, Eye, EyeOff } from 'lucide-react'

interface Feedback {
  id: string
  rating: number
  comment: string
  isDisplayed: boolean
  createdAt: string
  user: {
    name: string
    email: string
  }
}

export default function FeedbackManagement() {
  const [feedback, setFeedback] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'displayed' | 'pending'>('all')

  useEffect(() => {
    fetchFeedback()
  }, [filter])

  const fetchFeedback = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/feedback')
      if (response.ok) {
        let data = await response.json()
        if (filter === 'displayed') {
          data = data.filter((f: Feedback) => f.isDisplayed)
        } else if (filter === 'pending') {
          data = data.filter((f: Feedback) => !f.isDisplayed)
        }
        setFeedback(data)
      }
    } catch (error) {
      console.error('Failed to fetch feedback:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleDisplay = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/feedback/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isDisplayed: !currentStatus }),
      })

      if (response.ok) {
        fetchFeedback()
      }
    } catch (error) {
      console.error('Failed to update feedback:', error)
    }
  }

  const deleteFeedback = async (id: string) => {
    if (!confirm('Delete this feedback?')) return

    try {
      const response = await fetch(`/api/admin/feedback/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchFeedback()
      }
    } catch (error) {
      console.error('Failed to delete feedback:', error)
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading feedback...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-4">Feedback Management</h1>
        
        <div className="flex gap-2 mb-6">
          {(['all', 'displayed', 'pending'] as const).map((f) => (
            <Button
              key={f}
              variant={filter === f ? 'default' : 'outline'}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        {feedback.length === 0 ? (
          <div className="text-center py-8 text-neutral-500">
            No feedback found
          </div>
        ) : (
          feedback.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg p-4 hover:shadow-lg transition"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="font-semibold">{item.user.name}</h3>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={`${
                            i < item.rating
                              ? 'fill-yellow-400 stroke-yellow-400'
                              : 'stroke-neutral-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      item.isDisplayed
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.isDisplayed ? 'Displayed' : 'Pending'}
                    </span>
                  </div>

                  <p className="text-sm text-neutral-700 mb-2">{item.comment}</p>
                  <p className="text-xs text-neutral-500">{item.user.email}</p>
                  <p className="text-xs text-neutral-400 mt-2">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleDisplay(item.id, item.isDisplayed)}
                  >
                    {item.isDisplayed ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteFeedback(item.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
