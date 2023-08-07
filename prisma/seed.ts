import { PrismaClient } from '@prisma/client';
import * as bycrpt from 'bcrypt';

const prisma = new PrismaClient();
const roundsOfHashing = 10;

async function main() {
  // create two dummy users
  const passwordSabin = await bycrpt.hash('password-sabin', roundsOfHashing);
  const user1 = await prisma.user.upsert({
    where: { email: 'sabin@adams.com' },
    update: { password: passwordSabin },
    create: {
      email: 'sabin@adams.com',
      name: 'Sabin Adams',
      password: passwordSabin,
    },
  });

  const passwordAlex = await bycrpt.hash('password-alex', roundsOfHashing);
  const user2 = await prisma.user.upsert({
    where: { email: 'alex@ruheni.com' },
    update: { password: passwordAlex },
    create: {
      email: 'alex@ruheni.com',
      name: 'Alex Ruheni',
      password: passwordAlex,
    },
  });

  // create three dummy articles
  const post1 = await prisma.article.upsert({
    where: { title: 'Post 1' },
    update: { authorId: user1.id },
    create: {
      title: 'Post 1',
      body: 'Post 1 body',
      description: 'Post 1 description',
      published: true,
    },
  });

  const post2 = await prisma.article.upsert({
    where: { title: 'Post 2' },
    update: { authorId: user2.id },
    create: {
      title: 'Post 2',
      body: 'Post 2 body',
      description: 'Post 2 description',
      published: true,
    },
  });

  const post3 = await prisma.article.upsert({
    where: { title: 'Prisma Client Just Became a Lot More Flexible' },
    update: {},
    create: {
      title: 'Prisma Client Just Became a Lot More Flexible',
      body: 'Prisma Client extensions provide a powerful new way to add functionality to Prisma in a type-safe manner...',
      description:
        'This article will explore various ways you can use Prisma Client extensions to add custom functionality to Prisma Client..',
      published: true,
    },
  });

  console.log({ user1, user2, post1, post2, post3 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
