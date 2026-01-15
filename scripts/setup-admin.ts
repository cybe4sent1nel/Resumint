const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function setupAdmin() {
  try {
    const adminEmail = 'resumint.info@gmail.com'
    const adminPassword = process.env.ADMIN_PASSWORD || 'ChangeMe@123456'

    console.log('Setting up admin account...')

    // Check if admin exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminEmail },
    })

    if (existingAdmin) {
      console.log('Admin account already exists:', adminEmail)
      
      // Update if not admin
      if (existingAdmin.adminRole === 'NONE') {
        await prisma.user.update({
          where: { email: adminEmail },
          data: {
            adminRole: 'SUPER_ADMIN',
            plan: 'ENTERPRISE',
            credits: 999999,
            emailVerified: true,
          },
        })
        console.log('✅ Updated existing account to SUPER_ADMIN')
      }
      return
    }

    // Create admin account
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(adminPassword, salt)

    const admin = await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        name: 'Resumint Admin',
        emailVerified: true,
        adminRole: 'SUPER_ADMIN',
        plan: 'ENTERPRISE',
        credits: 999999,
      },
    })

    console.log('✅ Admin account created successfully!')
    console.log('Email:', admin.email)
    console.log('Role:', admin.adminRole)
    console.log('\nNote: Change the admin password on first login!')
  } catch (error) {
    console.error('❌ Error setting up admin:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

setupAdmin()
