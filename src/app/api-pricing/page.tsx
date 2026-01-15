"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, X, Zap, Code, TrendingUp, Shield, Clock, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Lottie from 'lottie-react'
import saasCloudAnimation from '@/../public/animations/saas cloud.json'
import revenueAnimation from '@/../public/animations/Revenue.json'
import programmingAnimation from '@/../public/animations/Programming.json'

export default function APIPricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly')

  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for testing and small projects',
      price: {
        monthly: 0,
        annual: 0,
      },
      requests: '1,000 requests/month',
      features: [
        { text: '1,000 API requests per month', included: true },
        { text: 'Resume parsing & generation', included: true },
        { text: 'Basic AI enhancement', included: true },
        { text: 'JSON response format', included: true },
        { text: 'Email support', included: true },
        { text: 'Rate limit: 10 req/min', included: true },
        { text: 'Advanced AI models', included: false },
        { text: 'Priority support', included: false },
        { text: 'Custom webhooks', included: false },
        { text: 'Dedicated support', included: false },
      ],
      cta: 'Start Free',
      popular: false,
    },
    {
      name: 'Professional',
      description: 'For growing businesses and applications',
      price: {
        monthly: 29,
        annual: 290, // ~$24/month
      },
      requests: '10,000 requests/month',
      features: [
        { text: '10,000 API requests per month', included: true },
        { text: 'Resume parsing & generation', included: true },
        { text: 'Advanced AI enhancement', included: true },
        { text: 'JSON/XML response format', included: true },
        { text: 'LinkedIn import API', included: true },
        { text: 'Rate limit: 100 req/min', included: true },
        { text: 'All AI models (Groq, OpenRouter)', included: true },
        { text: 'Priority email support', included: true },
        { text: 'Webhook notifications', included: true },
        { text: 'Dedicated support', included: false },
      ],
      cta: 'Get Started',
      popular: true,
    },
    {
      name: 'Enterprise',
      description: 'For large-scale applications',
      price: {
        monthly: 99,
        annual: 990, // ~$82/month
      },
      requests: 'Unlimited requests',
      features: [
        { text: 'Unlimited API requests', included: true },
        { text: 'Resume parsing & generation', included: true },
        { text: 'Premium AI enhancement', included: true },
        { text: 'All response formats', included: true },
        { text: 'LinkedIn + GitHub import', included: true },
        { text: 'No rate limits', included: true },
        { text: 'All AI models + custom training', included: true },
        { text: '24/7 priority support', included: true },
        { text: 'Custom webhooks & integrations', included: true },
        { text: 'Dedicated account manager', included: true },
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ]

  const features = [
    {
      icon: Code,
      title: 'Easy Integration',
      description: 'RESTful API with comprehensive documentation. Get started in minutes with our SDKs.',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Average response time under 500ms. Powered by Groq for instant AI processing.',
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'OAuth 2.0, API key authentication, and encrypted data transmission.',
    },
    {
      icon: TrendingUp,
      title: 'Scalable',
      description: 'From 1,000 to unlimited requests. Scale as your business grows.',
    },
    {
      icon: Clock,
      title: '99.9% Uptime',
      description: 'Reliable infrastructure with automatic failover and load balancing.',
    },
    {
      icon: Users,
      title: 'Developer Support',
      description: 'Dedicated support team, Discord community, and extensive documentation.',
    },
  ]

  const useCases = [
    {
      title: 'Job Boards',
      description: 'Automatically parse and enhance candidate resumes',
      animation: programmingAnimation,
    },
    {
      title: 'Recruitment Software',
      description: 'Integrate AI-powered resume scoring and ATS optimization',
      animation: saasCloudAnimation,
    },
    {
      title: 'Career Platforms',
      description: 'Offer resume building as a white-label service',
      animation: revenueAnimation,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
              Resumint API Pricing
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
              Power your applications with AI-driven resume building, parsing, and optimization.
              Choose the plan that fits your needs.
            </p>
            
            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-4 p-1 bg-white dark:bg-gray-800 rounded-full shadow-lg">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-full transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-6 py-2 rounded-full transition-all ${
                  billingCycle === 'annual'
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                Annual <span className="text-green-500 text-sm ml-1">Save 17%</span>
              </button>
            </div>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`relative p-8 ${plan.popular ? 'ring-2 ring-purple-500 shadow-2xl scale-105' : ''} bg-white dark:bg-gray-800`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{plan.description}</p>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold">
                        ${plan.price[billingCycle]}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      {plan.requests}
                    </p>
                  </div>

                  <Button
                    className={`w-full mb-6 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
                        : ''
                    }`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {plan.cta}
                  </Button>

                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        ) : (
                          <X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                        )}
                        <span className={feature.included ? '' : 'text-gray-400 line-through'}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">API Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 text-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-800">
                  <feature.icon className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Use Cases</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 text-center bg-white dark:bg-gray-800">
                  <div className="w-40 h-40 mx-auto mb-4">
                    <Lottie animationData={useCase.animation} loop />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{useCase.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{useCase.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join hundreds of developers building with Resumint API
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" variant="secondary">
              View Documentation
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-purple-600">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
