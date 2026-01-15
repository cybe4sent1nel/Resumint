'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { UserCog } from 'lucide-react'

export default function AdminAdminsPage() {
  const [admins, setAdmins] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAdmins()
  }, [])

  const fetchAdmins = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/admins')
      if (res.ok) {
        const data = await res.json()
        setAdmins(data.admins || [])
      }
    } catch (error) {
      console.error('Failed to fetch admins:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <UserCog className="h-8 w-8" />
            Admin Users
          </h1>
          <p className="text-muted-foreground mt-2">Manage admin accounts and permissions</p>
        </div>
        <Button>Add Admin User</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Admin Accounts</CardTitle>
          <CardDescription>Total admin users: {admins.length}</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading admin users...</div>
          ) : admins.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No admin users found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Name</th>
                    <th className="text-left py-3 px-4 font-semibold">Email</th>
                    <th className="text-left py-3 px-4 font-semibold">Role</th>
                    <th className="text-left py-3 px-4 font-semibold">Status</th>
                    <th className="text-left py-3 px-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {admins.map((admin) => (
                    <tr key={admin.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="py-3 px-4">{admin.name || 'N/A'}</td>
                      <td className="py-3 px-4">{admin.email}</td>
                      <td className="py-3 px-4">
                        <span className="text-sm px-2 py-1 bg-purple-100 text-purple-700 rounded">
                          {admin.adminRole}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm px-2 py-1 bg-green-100 text-green-700 rounded">
                          Active
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Button variant="outline" size="sm">Edit</Button>
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
