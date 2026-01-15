"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, Zap, Star, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { LottieAnimation } from "@/components/animations"

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for getting started",
    icon: Star,
    features: [
      "5 Resume Creations",
      "3 Basic Templates",
      "PDF Export",
      "Email Support",
      "Watermark on Downloads"
    ],
    cta: "Start Free",
    popular: false,
    gradient: "from-neutral-600 to-neutral-800"
  },
  {
    name: "Pro",
    price: "$19",
    description: "For serious job seekers",
    icon: Zap,
    features: [
      "Unlimited Resume Creations",
      "50+ Premium Templates",
      "25+ Portfolio Designs",
      "PDF & DOC Export",
      "No Watermark",
      "LinkedIn Import",
      "AI Resume Scoring",
      "Priority Support",
      "ATS Optimization"
    ],
    cta: "Go Pro",
    popular: true,
    gradient: "from-purple-600 to-blue-600"
  },
  {
    name: "Enterprise",
    price: "$49",
    description: "For teams and agencies",
    icon: Crown,
    features: [
      "Everything in Pro",
      "API Access",
      "White-label Solution",
      "Custom Branding",
      "Team Collaboration (5 users)",
      "Dedicated Support",
      "Custom Integrations",
      "Analytics Dashboard",
      "Priority Feature Requests"
    ],
    cta: "Contact Sales",
    popular: false,
    gradient: "from-orange-600 to-red-600"
  }
]

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly")

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-neutral-950 dark:via-purple-950/20 dark:to-blue-950/20 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your career journey. All plans include 14-day money-back guarantee.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 bg-white dark:bg-neutral-900 p-2 rounded-full shadow-lg">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                billingPeriod === "monthly"
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                  : "text-neutral-600 dark:text-neutral-400"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod("yearly")}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                billingPeriod === "yearly"
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                  : "text-neutral-600 dark:text-neutral-400"
              }`}
            >
              Yearly
              <span className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Revenue Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center mb-16"
        >
          <LottieAnimation
            animationPath="/animations/Revenue.json"
            className="w-full max-w-sm h-64"
          />
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative ${plan.popular ? "md:-mt-4" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold z-10">
                  Most Popular
                </div>
              )}
              <Card className={`p-6 md:p-8 h-full flex flex-col ${
                plan.popular
                  ? "border-4 border-purple-500 shadow-2xl scale-105"
                  : "border-2 border-neutral-200 dark:border-neutral-800"
              }`}>
                <div className={`w-16 h-16 bg-gradient-to-br ${plan.gradient} rounded-2xl flex items-center justify-center mb-6`}>
                  <plan.icon className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className="text-neutral-600 dark:text-neutral-400">/month</span>
                  {billingPeriod === "yearly" && plan.price !== "$0" && (
                    <div className="text-sm text-green-600 dark:text-green-400 mt-1">
                      Billed yearly at {parseInt(plan.price.slice(1)) * 12 * 0.8}/year
                    </div>
                  )}
                </div>

                <Link href="/signup">
                  <Button
                    className={`w-full mb-6 text-white ${
                      plan.popular
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                        : "bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-800 dark:hover:bg-neutral-700"
                    }`}
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                </Link>

                <ul className="space-y-3 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-neutral-700 dark:text-neutral-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "Can I switch plans anytime?",
                a: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately."
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, debit cards, and digital wallets through Cashfree."
              },
              {
                q: "Is there a free trial?",
                a: "Yes! Start with our Free plan and upgrade when you're ready. No credit card required."
              },
              {
                q: "Can I cancel my subscription?",
                a: "Absolutely. You can cancel anytime with no questions asked. We also offer a 14-day money-back guarantee."
              }
            ].map((faq, i) => (
              <Card key={i} className="p-6">
                <h3 className="text-lg font-bold mb-2">{faq.q}</h3>
                <p className="text-neutral-600 dark:text-neutral-400">{faq.a}</p>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
