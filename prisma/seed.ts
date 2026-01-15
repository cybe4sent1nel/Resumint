import { PrismaClient } from '@prisma/client'
import { RESUME_TEMPLATES, PORTFOLIO_TEMPLATES } from '../src/lib/templates'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Seed Resume Templates
  console.log('📄 Seeding resume templates...')
  for (const template of RESUME_TEMPLATES) {
    await prisma.template.upsert({
      where: { id: template.id },
      update: {},
      create: {
        id: template.id,
        name: template.name,
        category: 'RESUME',
        thumbnail: template.previewImage,
        data: template.config as any,
        isPremium: template.isPremium || false,
        isActive: true,
      },
    })
  }

  // Seed Portfolio Templates
  console.log('🌐 Seeding portfolio templates...')
  for (const template of PORTFOLIO_TEMPLATES) {
    await prisma.template.upsert({
      where: { id: template.id },
      update: {},
      create: {
        id: template.id,
        name: template.name,
        category: 'PORTFOLIO',
        thumbnail: template.previewImage,
        data: template.config as any,
        isPremium: template.isPremium || false,
        isActive: true,
      },
    })
  }

  console.log('✅ Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
