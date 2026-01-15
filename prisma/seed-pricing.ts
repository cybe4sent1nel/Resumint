import { PrismaClient, Plan } from '@prisma/client'

const prisma = new PrismaClient()

async function seedPricing() {
  console.log('Seeding pricing data...')

  // Seed Subscription Pricing
  const subscriptionPlans = [
    {
      plan: Plan.FREE,
      name: 'Free Plan',
      monthlyPrice: 0,
      yearlyPrice: 0,
      credits: 50,
      features: [
        '50 AI credits per month',
        '3 resume templates',
        'Basic portfolio builder',
        'PDF export',
        'Community support'
      ],
      isActive: true
    },
    {
      plan: Plan.PRO,
      name: 'Professional',
      monthlyPrice: 19.99,
      yearlyPrice: 199.99,
      credits: 500,
      features: [
        '500 AI credits per month',
        'All resume templates',
        'Advanced portfolio builder',
        'Custom domain support',
        'PDF & DOCX export',
        'Priority support',
        'Remove watermarks',
        'LinkedIn import'
      ],
      isActive: true
    },
    {
      plan: Plan.ENTERPRISE,
      name: 'Enterprise',
      monthlyPrice: 99.99,
      yearlyPrice: 999.99,
      credits: 5000,
      features: [
        '5000 AI credits per month',
        'Unlimited templates',
        'White-label solution',
        'Custom branding',
        'API access',
        'Dedicated support',
        'Custom integrations',
        'Team collaboration',
        'Analytics dashboard'
      ],
      isActive: true
    }
  ]

  for (const plan of subscriptionPlans) {
    await prisma.subscriptionPricing.upsert({
      where: { plan: plan.plan },
      update: plan,
      create: plan
    })
    console.log(`✓ Created/Updated ${plan.name} subscription plan`)
  }

  // Seed API Pricing
  const apiTiers = [
    {
      tier: 'starter',
      name: 'Starter API',
      monthlyPrice: 0,
      yearlyPrice: 0,
      requestsPerMonth: 1000,
      features: [
        '1,000 requests/month',
        'Resume parsing',
        'Basic portfolio generation',
        'Email support',
        'Standard rate limits'
      ],
      isActive: true
    },
    {
      tier: 'professional',
      name: 'Professional API',
      monthlyPrice: 29,
      yearlyPrice: 290,
      requestsPerMonth: 10000,
      features: [
        '10,000 requests/month',
        'Resume parsing & scoring',
        'Advanced portfolio generation',
        'LinkedIn import API',
        'Webhook support',
        'Priority support',
        'Higher rate limits'
      ],
      isActive: true
    },
    {
      tier: 'enterprise',
      name: 'Enterprise API',
      monthlyPrice: 99,
      yearlyPrice: 990,
      requestsPerMonth: 100000,
      features: [
        '100,000 requests/month',
        'Full API access',
        'Custom integrations',
        'Dedicated support',
        'No rate limits',
        'SLA guarantee',
        'Custom branding',
        'White-label option'
      ],
      isActive: true
    }
  ]

  for (const tier of apiTiers) {
    await prisma.apiPricing.upsert({
      where: { tier: tier.tier },
      update: tier,
      create: tier
    })
    console.log(`✓ Created/Updated ${tier.name} tier`)
  }

  console.log('✅ Pricing data seeded successfully!')
}

seedPricing()
  .catch((error) => {
    console.error('Error seeding pricing:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
