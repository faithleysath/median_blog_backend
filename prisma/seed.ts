import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const post1 = await prisma.article.upsert({
    where: { title: 'Post 1' },
    update: {},
    create: {
      title: 'Post 1',
      body: 'Post 1 body',
      description: 'Post 1 description',
      published: true,
    },
  });

  const post2 = await prisma.article.upsert({
    where: { title: 'Post 2' },
    update: {},
    create: {
      title: 'Post 2',
      body: 'Post 2 body',
      description: 'Post 2 description',
      published: true,
    },
  });

  console.log({ post1, post2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
