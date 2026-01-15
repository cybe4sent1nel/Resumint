'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart3, TrendingUp } from 'lucide-react'

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <BarChart3 className="h-8 w-8" />
          Analytics
        </h1>
        <p className="text-muted-foreground mt-2">View platform analytics and insights</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Growth Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Daily Active Users</span>
                <span className="font-semibold">247</span>
              </div>
              <div className="flex justify-between">
                <span>Weekly Active Users</span>
                <span className="font-semibold">1,243</span>
              </div>
              <div className="flex justify-between">
                <span>Monthly Active Users</span>
                <span className="font-semibold">5,847</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Daily Revenue</span>
                <span className="font-semibold">₹4,250</span>
              </div>
              <div className="flex justify-between">
                <span>Weekly Revenue</span>
                <span className="font-semibold">₹28,750</span>
              </div>
              <div className="flex justify-between">
                <span>Monthly Revenue</span>
                <span className="font-semibold">₹124,500</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Platform Statistics</CardTitle>
          <CardDescription>Key platform metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground">Total Users</p>
              <p className="text-2xl font-bold">12,458</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground">Resumes Created</p>
              <p className="text-2xl font-bold">34,921</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground">Portfolios Created</p>
              <p className="text-2xl font-bold">8,456</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
