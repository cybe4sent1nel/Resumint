"use client"

import { CreditCard, Sparkles } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

interface CreditBalanceProps {
  credits: number
  subscriptionTier: "FREE" | "PRO" | "ENTERPRISE"
}

export function CreditBalance({ credits, subscriptionTier }: CreditBalanceProps) {
  const maxCredits = subscriptionTier === "FREE" ? 10 : subscriptionTier === "PRO" ? 100 : Infinity
  const percentage = subscriptionTier === "ENTERPRISE" ? 100 : (credits / maxCredits) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-yellow-500" />
          Credit Balance
        </CardTitle>
        <CardDescription>
          {subscriptionTier === "ENTERPRISE" 
            ? "Unlimited credits available" 
            : `${credits} / ${maxCredits} credits remaining`}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {subscriptionTier !== "ENTERPRISE" && (
          <Progress value={percentage} className="h-2" />
        )}
        
        {credits < 5 && subscriptionTier === "FREE" && (
          <div className="rounded-lg bg-yellow-50 dark:bg-yellow-950 p-4 border border-yellow-200 dark:border-yellow-800">
            <p className="text-sm text-yellow-800 dark:text-yellow-200 mb-2">
              You're running low on credits!
            </p>
            <Button size="sm" className="w-full">
              <CreditCard className="h-4 w-4 mr-2" />
              Upgrade to Pro
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
