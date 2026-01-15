"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import { Loader2, Plus, Edit, Trash2, DollarSign, Zap } from 'lucide-react'

interface SubscriptionPricing {
  id: string
  plan: 'FREE' | 'PRO' | 'ENTERPRISE'
  name: string
  monthlyPrice: number
  yearlyPrice: number
  credits: number
  features: string[]
  isActive: boolean
}

interface ApiPricing {
  id: string
  tier: string
  name: string
  monthlyPrice: number
  yearlyPrice: number
  requestsPerMonth: number
  features: string[]
  isActive: boolean
}

export default function PricingManagementPage() {
  const [subscriptionPricing, setSubscriptionPricing] = useState<SubscriptionPricing[]>([])
  const [apiPricing, setApiPricing] = useState<ApiPricing[]>([])
  const [loading, setLoading] = useState(true)
  const [editingSubscription, setEditingSubscription] = useState<SubscriptionPricing | null>(null)
  const [editingApi, setEditingApi] = useState<ApiPricing | null>(null)

  useEffect(() => {
    fetchPricing()
  }, [])

  const fetchPricing = async () => {
    try {
      setLoading(true)
      const [subRes, apiRes] = await Promise.all([
        fetch('/api/admin/pricing/subscription'),
        fetch('/api/admin/pricing/api')
      ])

      if (subRes.ok) {
        const subData = await subRes.json()
        setSubscriptionPricing(subData)
      }

      if (apiRes.ok) {
        const apiData = await apiRes.json()
        setApiPricing(apiData)
      }
    } catch (error) {
      console.error('Error fetching pricing:', error)
      toast.error('Failed to load pricing data')
    } finally {
      setLoading(false)
    }
  }

  const handleSaveSubscription = async (pricing: Partial<SubscriptionPricing>) => {
    try {
      const method = pricing.id ? 'PUT' : 'POST'
      const response = await fetch('/api/admin/pricing/subscription', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pricing)
      })

      if (!response.ok) {
        throw new Error('Failed to save subscription pricing')
      }

      toast.success(`Subscription pricing ${pricing.id ? 'updated' : 'created'} successfully`)
      setEditingSubscription(null)
      fetchPricing()
    } catch (error) {
      console.error('Error saving subscription pricing:', error)
      toast.error('Failed to save subscription pricing')
    }
  }

  const handleSaveApi = async (pricing: Partial<ApiPricing>) => {
    try {
      const method = pricing.id ? 'PUT' : 'POST'
      const response = await fetch('/api/admin/pricing/api', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pricing)
      })

      if (!response.ok) {
        throw new Error('Failed to save API pricing')
      }

      toast.success(`API pricing ${pricing.id ? 'updated' : 'created'} successfully`)
      setEditingApi(null)
      fetchPricing()
    } catch (error) {
      console.error('Error saving API pricing:', error)
      toast.error('Failed to save API pricing')
    }
  }

  const handleDeleteSubscription = async (id: string) => {
    if (!confirm('Are you sure you want to delete this pricing tier?')) return

    try {
      const response = await fetch(`/api/admin/pricing/subscription?id=${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to delete subscription pricing')
      }

      toast.success('Subscription pricing deleted successfully')
      fetchPricing()
    } catch (error) {
      console.error('Error deleting subscription pricing:', error)
      toast.error('Failed to delete subscription pricing')
    }
  }

  const handleDeleteApi = async (id: string) => {
    if (!confirm('Are you sure you want to delete this pricing tier?')) return

    try {
      const response = await fetch(`/api/admin/pricing/api?id=${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to delete API pricing')
      }

      toast.success('API pricing deleted successfully')
      fetchPricing()
    } catch (error) {
      console.error('Error deleting API pricing:', error)
      toast.error('Failed to delete API pricing')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div>
          <h1 className="text-4xl font-bold mb-2">Pricing Management</h1>
          <p className="text-muted-foreground">
            Manage subscription and API pricing tiers for your platform
          </p>
        </div>

        <Tabs defaultValue="subscription" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="subscription">
              <DollarSign className="w-4 h-4 mr-2" />
              Subscription Plans
            </TabsTrigger>
            <TabsTrigger value="api">
              <Zap className="w-4 h-4 mr-2" />
              API Pricing
            </TabsTrigger>
          </TabsList>

          {/* Subscription Pricing Tab */}
          <TabsContent value="subscription" className="space-y-6 mt-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Subscription Plans</h2>
              <Button onClick={() => setEditingSubscription({} as SubscriptionPricing)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Plan
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {subscriptionPricing.map((pricing) => (
                <Card key={pricing.id} className={!pricing.isActive ? 'opacity-60' : ''}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{pricing.name}</CardTitle>
                        <CardDescription className="uppercase text-xs font-semibold mt-1">
                          {pricing.plan}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => setEditingSubscription(pricing)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleDeleteSubscription(pricing.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-3xl font-bold">
                        ${pricing.monthlyPrice}
                        <span className="text-sm font-normal text-muted-foreground">/month</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        ${pricing.yearlyPrice}/year
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-purple-500" />
                      <span className="text-sm font-medium">{pricing.credits} credits</span>
                    </div>
                    <div className="space-y-2">
                      {pricing.features.map((feature, idx) => (
                        <div key={idx} className="text-sm flex items-start gap-2">
                          <span className="text-green-500 mt-0.5">✓</span>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    {!pricing.isActive && (
                      <div className="text-xs text-amber-500 font-medium">Inactive</div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* API Pricing Tab */}
          <TabsContent value="api" className="space-y-6 mt-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">API Pricing Tiers</h2>
              <Button onClick={() => setEditingApi({} as ApiPricing)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Tier
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {apiPricing.map((pricing) => (
                <Card key={pricing.id} className={!pricing.isActive ? 'opacity-60' : ''}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{pricing.name}</CardTitle>
                        <CardDescription className="uppercase text-xs font-semibold mt-1">
                          {pricing.tier}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => setEditingApi(pricing)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleDeleteApi(pricing.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-3xl font-bold">
                        ${pricing.monthlyPrice}
                        <span className="text-sm font-normal text-muted-foreground">/month</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        ${pricing.yearlyPrice}/year
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-medium">
                        {pricing.requestsPerMonth.toLocaleString()} requests/month
                      </span>
                    </div>
                    <div className="space-y-2">
                      {pricing.features.map((feature, idx) => (
                        <div key={idx} className="text-sm flex items-start gap-2">
                          <span className="text-green-500 mt-0.5">✓</span>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    {!pricing.isActive && (
                      <div className="text-xs text-amber-500 font-medium">Inactive</div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Subscription Pricing Edit Modal */}
      {editingSubscription && (
        <SubscriptionPricingModal
          pricing={editingSubscription}
          onSave={handleSaveSubscription}
          onClose={() => setEditingSubscription(null)}
        />
      )}

      {/* API Pricing Edit Modal */}
      {editingApi && (
        <ApiPricingModal
          pricing={editingApi}
          onSave={handleSaveApi}
          onClose={() => setEditingApi(null)}
        />
      )}
    </div>
  )
}

// Subscription Pricing Modal Component
function SubscriptionPricingModal({
  pricing,
  onSave,
  onClose
}: {
  pricing: Partial<SubscriptionPricing>
  onSave: (pricing: Partial<SubscriptionPricing>) => void
  onClose: () => void
}) {
  const [formData, setFormData] = useState({
    ...pricing,
    features: pricing.features || [],
    featuresText: pricing.features?.join('\n') || ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const features = formData.featuresText
      .split('\n')
      .map((f) => f.trim())
      .filter((f) => f.length > 0)

    onSave({
      ...formData,
      features,
      monthlyPrice: Number(formData.monthlyPrice),
      yearlyPrice: Number(formData.yearlyPrice),
      credits: Number(formData.credits)
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle>
            {pricing.id ? 'Edit Subscription Plan' : 'Create Subscription Plan'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Plan Type</Label>
              <select
                className="w-full p-2 border rounded-md"
                value={formData.plan || ''}
                onChange={(e) => setFormData({ ...formData, plan: e.target.value as any })}
                required
              >
                <option value="">Select Plan</option>
                <option value="FREE">FREE</option>
                <option value="PRO">PRO</option>
                <option value="ENTERPRISE">ENTERPRISE</option>
              </select>
            </div>

            <div>
              <Label>Plan Name</Label>
              <Input
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Professional Plan"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Monthly Price ($)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.monthlyPrice || 0}
                  onChange={(e) => setFormData({ ...formData, monthlyPrice: Number(e.target.value) })}
                  required
                />
              </div>
              <div>
                <Label>Yearly Price ($)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.yearlyPrice || 0}
                  onChange={(e) => setFormData({ ...formData, yearlyPrice: Number(e.target.value) })}
                  required
                />
              </div>
            </div>

            <div>
              <Label>Credits Included</Label>
              <Input
                type="number"
                value={formData.credits || 0}
                onChange={(e) => setFormData({ ...formData, credits: Number(e.target.value) })}
                required
              />
            </div>

            <div>
              <Label>Features (one per line)</Label>
              <Textarea
                value={formData.featuresText}
                onChange={(e) => setFormData({ ...formData, featuresText: e.target.value })}
                placeholder="Advanced AI features&#10;Priority support&#10;Custom templates"
                rows={5}
                required
              />
            </div>

            <div className="flex items-center gap-2">
              <Switch
                checked={formData.isActive ?? true}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
              <Label>Active</Label>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1">Save</Button>
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

// API Pricing Modal Component
function ApiPricingModal({
  pricing,
  onSave,
  onClose
}: {
  pricing: Partial<ApiPricing>
  onSave: (pricing: Partial<ApiPricing>) => void
  onClose: () => void
}) {
  const [formData, setFormData] = useState({
    ...pricing,
    features: pricing.features || [],
    featuresText: pricing.features?.join('\n') || ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const features = formData.featuresText
      .split('\n')
      .map((f) => f.trim())
      .filter((f) => f.length > 0)

    onSave({
      ...formData,
      features,
      monthlyPrice: Number(formData.monthlyPrice),
      yearlyPrice: Number(formData.yearlyPrice),
      requestsPerMonth: Number(formData.requestsPerMonth)
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle>{pricing.id ? 'Edit API Pricing' : 'Create API Pricing'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Tier ID</Label>
              <Input
                value={formData.tier || ''}
                onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                placeholder="e.g., starter, professional, enterprise"
                required
              />
            </div>

            <div>
              <Label>Tier Name</Label>
              <Input
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Professional API"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Monthly Price ($)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.monthlyPrice || 0}
                  onChange={(e) => setFormData({ ...formData, monthlyPrice: Number(e.target.value) })}
                  required
                />
              </div>
              <div>
                <Label>Yearly Price ($)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.yearlyPrice || 0}
                  onChange={(e) => setFormData({ ...formData, yearlyPrice: Number(e.target.value) })}
                  required
                />
              </div>
            </div>

            <div>
              <Label>Requests Per Month</Label>
              <Input
                type="number"
                value={formData.requestsPerMonth || 0}
                onChange={(e) => setFormData({ ...formData, requestsPerMonth: Number(e.target.value) })}
                placeholder="e.g., 10000"
                required
              />
            </div>

            <div>
              <Label>Features (one per line)</Label>
              <Textarea
                value={formData.featuresText}
                onChange={(e) => setFormData({ ...formData, featuresText: e.target.value })}
                placeholder="Resume parsing API&#10;Portfolio generation&#10;Webhook support"
                rows={5}
                required
              />
            </div>

            <div className="flex items-center gap-2">
              <Switch
                checked={formData.isActive ?? true}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
              <Label>Active</Label>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1">Save</Button>
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
