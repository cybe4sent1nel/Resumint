'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Settings, Bell, Database } from 'lucide-react'
import { useState } from 'react'

export default function AdminSettingsPage() {
  const [isDirty, setIsDirty] = useState(false)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Settings className="h-8 w-8" />
          Admin Settings
        </h1>
        <p className="text-muted-foreground mt-2">Configure platform settings and preferences</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>Basic platform configuration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="text-sm font-medium">Platform Name</label>
            <Input defaultValue="Resumint" className="mt-1" />
          </div>
          <div>
            <label className="text-sm font-medium">Support Email</label>
            <Input type="email" defaultValue="support@resumint.com" className="mt-1" />
          </div>
          <div>
            <label className="text-sm font-medium">Support URL</label>
            <Input type="url" defaultValue="https://resumint.com/support" className="mt-1" />
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
          <CardDescription>Configure notification preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-muted-foreground">Receive alerts about user activity</p>
            </div>
            <input type="checkbox" defaultChecked className="h-4 w-4" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Admin Actions Log</p>
              <p className="text-sm text-muted-foreground">Log all admin actions for audit</p>
            </div>
            <input type="checkbox" defaultChecked className="h-4 w-4" />
          </div>
          <Button>Save Preferences</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Database
          </CardTitle>
          <CardDescription>Database maintenance and backups</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Database: MongoDB | Status: Connected
          </p>
          <div className="flex gap-2">
            <Button variant="outline">Optimize Database</Button>
            <Button variant="outline">View Backups</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
