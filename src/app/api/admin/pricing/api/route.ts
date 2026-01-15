import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'

// GET - Get all API pricing tiers
export async function GET() {
  try {
    const pricingTiers = await prisma.apiPricing.findMany({
      orderBy: { monthlyPrice: 'asc' }
    })

    return NextResponse.json(pricingTiers)
  } catch (error) {
    console.error('Error fetching API pricing:', error)
    return NextResponse.json(
      { error: 'Failed to fetch API pricing' },
      { status: 500 }
    )
  }
}

// POST - Create new API pricing tier (Admin only)
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
      tier,
      name, 
      monthlyPrice, 
      yearlyPrice, 
      requestsPerMonth,
      features,
      isActive 
    } = body

    // Validate required fields
    if (!tier || !name || monthlyPrice === undefined || yearlyPrice === undefined || requestsPerMonth === undefined || !features) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const pricing = await prisma.apiPricing.create({
      data: {
        tier,
        name,
        monthlyPrice,
        yearlyPrice,
        requestsPerMonth,
        features,
        isActive: isActive ?? true,
        updatedBy: currentUser.id
      }
    })

    // Log admin action
    await prisma.adminAction.create({
      data: {
        userId: currentUser.id,
        action: 'CREATE_API_PRICING',
        targetId: pricing.id,
        targetType: 'ApiPricing',
        metadata: { tier: pricing.tier }
      }
    })

    return NextResponse.json(pricing, { status: 201 })
  } catch (error) {
    console.error('Error creating API pricing:', error)
    return NextResponse.json(
      { error: 'Failed to create API pricing' },
      { status: 500 }
    )
  }
}

// PUT - Update API pricing tier (Admin only)
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
      tier,
      name, 
      monthlyPrice, 
      yearlyPrice, 
      requestsPerMonth,
      features,
      isActive 
    } = body

    if (!id) {
      return NextResponse.json({ error: 'Pricing ID required' }, { status: 400 })
    }

    const updateData: any = { updatedBy: currentUser.id }
    
    if (tier !== undefined) updateData.tier = tier
    if (name !== undefined) updateData.name = name
    if (monthlyPrice !== undefined) updateData.monthlyPrice = monthlyPrice
    if (yearlyPrice !== undefined) updateData.yearlyPrice = yearlyPrice
    if (requestsPerMonth !== undefined) updateData.requestsPerMonth = requestsPerMonth
    if (features !== undefined) updateData.features = features
    if (isActive !== undefined) updateData.isActive = isActive

    const pricing = await prisma.apiPricing.update({
      where: { id },
      data: updateData
    })

    // Log admin action
    await prisma.adminAction.create({
      data: {
        userId: currentUser.id,
        action: 'UPDATE_API_PRICING',
        targetId: pricing.id,
        targetType: 'ApiPricing',
        metadata: { tier: pricing.tier }
      }
    })

    return NextResponse.json(pricing)
  } catch (error) {
    console.error('Error updating API pricing:', error)
    return NextResponse.json(
      { error: 'Failed to update API pricing' },
      { status: 500 }
    )
  }
}

// DELETE - Delete API pricing tier (Admin only)
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

    const pricing = await prisma.apiPricing.delete({
      where: { id }
    })

    // Log admin action
    await prisma.adminAction.create({
      data: {
        userId: currentUser.id,
        action: 'DELETE_API_PRICING',
        targetId: id,
        targetType: 'ApiPricing',
        metadata: { tier: pricing.tier }
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting API pricing:', error)
    return NextResponse.json(
      { error: 'Failed to delete API pricing' },
      { status: 500 }
    )
  }
}
