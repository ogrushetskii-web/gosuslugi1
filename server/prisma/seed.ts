import { PrismaClient, UserRole } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await hash('password123', 10);
  const family = await prisma.family.upsert({
    where: { id: 'demo-family' },
    create: {
      id: 'demo-family',
      name: 'Семья Петровых',
      securitySetting: { create: {} }
    },
    update: {}
  });

  const admin = await prisma.user.upsert({
    where: { email: 'maria@example.com' },
    create: {
      email: 'maria@example.com',
      passwordHash,
      firstName: 'Мария',
      lastName: 'Петрова',
      role: UserRole.ADMIN,
      familyId: family.id,
      emailVerified: true
    },
    update: {}
  });

  await prisma.agency.upsert({
    where: { id: 'demo-agency' },
    create: {
      id: 'demo-agency',
      name: 'МФЦ Центральный'
    },
    update: {}
  });

  await prisma.case.upsert({
    where: { id: 'demo-case' },
    create: {
      id: 'demo-case',
      title: 'Субсидия на ЖКХ',
      familyId: family.id,
      ownerId: admin.id,
      agencyId: 'demo-agency',
      status: 'REVIEW',
      progress: 40
    },
    update: {}
  });

  console.log('Demo data ready');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
