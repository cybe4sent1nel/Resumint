'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ShieldAlert, Lock, Key, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export default function AdminSecurityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <ShieldAlert className="h-8 w-8" />
          Security Settings
        </h1>
        <p className="text-muted-foreground mt-2">Manage security and authentication settings</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Two-Factor Authentication
            </CardTitle>
            <CardDescription>Secure your admin account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Enable two-factor authentication for your admin account to add an extra layer of security.
            </p>
            <Link href="/admin/security/2fa" className="block">
              <Button className="w-full">Configure 2FA</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Password Policy
            </CardTitle>
            <CardDescription>Manage password requirements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Set password policies for all users including minimum length, complexity requirements, and expiration.
            </p>
            <Button variant="outline" className="w-full">Configure Policy</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Security Alerts
            </CardTitle>
            <CardDescription>Monitor suspicious activity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              View and manage security alerts, including failed login attempts and unusual account activity.
            </p>
            <Button variant="outline" className="w-full">View Alerts</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5" />
              IP Whitelist
            </CardTitle>
            <CardDescription>Restrict admin access by IP</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Optionally restrict admin panel access to specific IP addresses for added security.
            </p>
            <Button variant="outline" className="w-full">Manage IPs</Button>
          </CardContent>
        </Card>
      </div>

      <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20">
        <CardHeader>
          <CardTitle className="text-yellow-900 dark:text-yellow-300">Security Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-yellow-800 dark:text-yellow-200">
            <li>✓ Enable 2FA on your admin account</li>
            <li>✓ Use strong, unique passwords</li>
            <li>✓ Regularly review admin access logs</li>
            <li>✓ Keep security software up to date</li>
            <li>✓ Use IP whitelist for additional protection</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
