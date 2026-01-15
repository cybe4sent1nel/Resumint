'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail } from 'lucide-react'

export default function AdminEmailsPage() {
  const [emails, setEmails] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEmails()
  }, [])

  const fetchEmails = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/emails')
      if (res.ok) {
        const data = await res.json()
        setEmails(data.emails || [])
      }
    } catch (error) {
      console.error('Failed to fetch emails:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Mail className="h-8 w-8" />
          Email Queue
        </h1>
        <p className="text-muted-foreground mt-2">Manage email queue and delivery status</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Email Queue</CardTitle>
          <CardDescription>Total emails in queue: {emails.length}</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading emails...</div>
          ) : emails.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No emails in queue</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">To</th>
                    <th className="text-left py-3 px-4 font-semibold">Subject</th>
                    <th className="text-left py-3 px-4 font-semibold">Template</th>
                    <th className="text-left py-3 px-4 font-semibold">Status</th>
                    <th className="text-left py-3 px-4 font-semibold">Scheduled</th>
                  </tr>
                </thead>
                <tbody>
                  {emails.map((email) => (
                    <tr key={email.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="py-3 px-4">{email.to}</td>
                      <td className="py-3 px-4">{email.subject}</td>
                      <td className="py-3 px-4 text-sm">{email.template}</td>
                      <td className="py-3 px-4">
                        <span className={`text-sm px-2 py-1 rounded ${
                          email.status === 'SENT'
                            ? 'bg-green-100 text-green-700'
                            : email.status === 'FAILED'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {email.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {email.scheduledFor ? new Date(email.scheduledFor).toLocaleDateString() : 'Immediate'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
