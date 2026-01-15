'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText } from 'lucide-react'

export default function AdminResumesPage() {
  const [resumes, setResumes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchResumes()
  }, [])

  const fetchResumes = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/resumes')
      if (res.ok) {
        const data = await res.json()
        setResumes(data.resumes || [])
      }
    } catch (error) {
      console.error('Failed to fetch resumes:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <FileText className="h-8 w-8" />
          Resumes Management
        </h1>
        <p className="text-muted-foreground mt-2">Manage all created resumes</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resumes</CardTitle>
          <CardDescription>Total resumes created: {resumes.length}</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading resumes...</div>
          ) : resumes.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No resumes created yet</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Title</th>
                    <th className="text-left py-3 px-4 font-semibold">Template</th>
                    <th className="text-left py-3 px-4 font-semibold">Public</th>
                    <th className="text-left py-3 px-4 font-semibold">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {resumes.map((resume) => (
                    <tr key={resume.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="py-3 px-4">{resume.title}</td>
                      <td className="py-3 px-4 text-sm">{resume.templateId}</td>
                      <td className="py-3 px-4">
                        <span className={`text-sm px-2 py-1 rounded ${
                          resume.isPublic 
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {resume.isPublic ? 'Public' : 'Private'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {new Date(resume.createdAt).toLocaleDateString()}
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
