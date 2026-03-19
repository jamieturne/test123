import { prisma } from './db';
import bcrypt from 'bcryptjs';

async function seed() {
  console.log('Seeding database...');

  const passwordHash = await bcrypt.hash('demo123', 12);

  const user = await prisma.user.upsert({
    where: { email: 'demo@alfabank.ru' },
    update: {},
    create: {
      email: 'demo@alfabank.ru',
      name: 'Демо Пользователь',
      passwordHash,
    },
  });

  console.log('Created demo user:', user.email);

  const team = await prisma.team.create({
    data: {
      name: 'Команда Тарифов',
      product: 'Тарифы и остатки',
      description: 'Отображение тарифов и остатков через AI-канал Spotlight',
      ownerId: user.id,
    },
  });

  console.log('Created demo team:', team.name);
  console.log('Seed complete!');
  console.log('Login: demo@alfabank.ru / demo123');
}

seed()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
