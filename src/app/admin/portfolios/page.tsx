'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Globe } from 'lucide-react'

export default function AdminPortfoliosPage() {
  const [portfolios, setPortfolios] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPortfolios()
  }, [])

  const fetchPortfolios = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/portfolios')
      if (res.ok) {
        const data = await res.json()
        setPortfolios(data.portfolios || [])
      }
    } catch (error) {
      console.error('Failed to fetch portfolios:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Globe className="h-8 w-8" />
          Portfolios Management
        </h1>
        <p className="text-muted-foreground mt-2">Manage all portfolio websites</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Portfolios</CardTitle>
          <CardDescription>Total portfolios created: {portfolios.length}</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading portfolios...</div>
          ) : portfolios.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No portfolios created yet</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Title</th>
                    <th className="text-left py-3 px-4 font-semibold">Slug</th>
                    <th className="text-left py-3 px-4 font-semibold">Public</th>
                    <th className="text-left py-3 px-4 font-semibold">AI Generated</th>
                    <th className="text-left py-3 px-4 font-semibold">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {portfolios.map((portfolio) => (
                    <tr key={portfolio.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="py-3 px-4">{portfolio.title}</td>
                      <td className="py-3 px-4 text-sm font-mono">{portfolio.slug}</td>
                      <td className="py-3 px-4">
                        <span className={`text-sm px-2 py-1 rounded ${
                          portfolio.isPublic 
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {portfolio.isPublic ? 'Public' : 'Private'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-sm px-2 py-1 rounded ${
                          portfolio.aiGenerated 
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {portfolio.aiGenerated ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {new Date(portfolio.createdAt).toLocaleDateString()}
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
