import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'

// GET - Get all subscription pricing tiers
export async function GET() {
  try {
    const pricingTiers = await prisma.subscriptionPricing.findMany({
      orderBy: { monthlyPrice: 'asc' }
    })

    return NextResponse.json(pricingTiers)
  } catch (error) {
    console.error('Error fetching subscription pricing:', error)
    return NextResponse.json(
      { error: 'Failed to fetch subscription pricing' },
      { status: 500 }
    )
  }
}

// POST - Create new subscription pricing tier (Admin only)
export async function POST(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser()
    
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: currentUser.id },
      select: { adminRole: true }
    })

    if (!user || user.adminRole === 'NONE') {
      return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 })
    }

    const body = await req.json()
    const { 
      plan, 
      name, 
      monthlyPrice, 
      yearlyPrice, 
      credits, 
      features,
      isActive 
    } = body

    // Validate required fields
    if (!plan || !name || monthlyPrice === undefined || yearlyPrice === undefined || credits === undefined || !features) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const pricing = await prisma.subscriptionPricing.create({
      data: {
        plan,
        name,
        monthlyPrice,
        yearlyPrice,
        credits,
        features,
        isActive: isActive ?? true,
        updatedBy: currentUser.id
      }
    })

    // Log admin action
    await prisma.adminAction.create({
      data: {
        userId: currentUser.id,
        action: 'CREATE_SUBSCRIPTION_PRICING',
        targetId: pricing.id,
        targetType: 'SubscriptionPricing',
        metadata: { plan: pricing.plan }
      }
    })

    return NextResponse.json(pricing, { status: 201 })
  } catch (error) {
    console.error('Error creating subscription pricing:', error)
    return NextResponse.json(
      { error: 'Failed to create subscription pricing' },
      { status: 500 }
    )
  }
}

// PUT - Update subscription pricing tier (Admin only)
export async function PUT(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser()
    
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: currentUser.id },
      select: { adminRole: true }
    })

    if (!user || user.adminRole === 'NONE') {
      return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 })
    }

    const body = await req.json()
    const { 
      id,
      plan, 
      name, 
      monthlyPrice, 
      yearlyPrice, 
      credits, 
      features,
      isActive 
    } = body

    if (!id) {
      return NextResponse.json({ error: 'Pricing ID required' }, { status: 400 })
    }

    const updateData: any = { updatedBy: currentUser.id }
    
    if (plan !== undefined) updateData.plan = plan
    if (name !== undefined) updateData.name = name
    if (monthlyPrice !== undefined) updateData.monthlyPrice = monthlyPrice
    if (yearlyPrice !== undefined) updateData.yearlyPrice = yearlyPrice
    if (credits !== undefined) updateData.credits = credits
    if (features !== undefined) updateData.features = features
    if (isActive !== undefined) updateData.isActive = isActive

    const pricing = await prisma.subscriptionPricing.update({
      where: { id },
      data: updateData
    })

    // Log admin action
    await prisma.adminAction.create({
      data: {
        userId: currentUser.id,
        action: 'UPDATE_SUBSCRIPTION_PRICING',
        targetId: pricing.id,
        targetType: 'SubscriptionPricing',
        metadata: { plan: pricing.plan }
      }
    })

    return NextResponse.json(pricing)
  } catch (error) {
    console.error('Error updating subscription pricing:', error)
    return NextResponse.json(
      { error: 'Failed to update subscription pricing' },
      { status: 500 }
    )
  }
}

// DELETE - Delete subscription pricing tier (Admin only)
export async function DELETE(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser()
    
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: currentUser.id },
      select: { adminRole: true }
    })

    if (!user || user.adminRole === 'NONE') {
      return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 })
    }

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Pricing ID required' }, { status: 400 })
    }

    const pricing = await prisma.subscriptionPricing.delete({
      where: { id }
    })

    // Log admin action
    await prisma.adminAction.create({
      data: {
        userId: currentUser.id,
        action: 'DELETE_SUBSCRIPTION_PRICING',
        targetId: id,
        targetType: 'SubscriptionPricing',
        metadata: { plan: pricing.plan }
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting subscription pricing:', error)
    return NextResponse.json(
      { error: 'Failed to delete subscription pricing' },
      { status: 500 }
    )
  }
}
