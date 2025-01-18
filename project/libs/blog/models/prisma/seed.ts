import { PrismaClient } from '@prisma/client'
const FIRST_CATEGORY_UUID = '766430f0-5a4d-4ec3-b18f-513af50d5827';
const SECOND_CATEGORY_UUID = '1ce84ceb-310f-432e-b401-74ad0e32e74b';

const FIRST_POST_UUID = 'a60b178a-db9d-410e-bb62-7bed804e9e9b';
const SECOND_POST__UUID = '95819252-b542-483a-969a-0489522b2503';

const FIRST_USER_ID = '85a807314f27';
const SECOND_USER_ID = '44b26d46d961';

function getCategory() {
  return [
    {
      id: FIRST_CATEGORY_UUID, title: 'Видео'
    },
    {
      id: SECOND_CATEGORY_UUID, title: 'Текст'
    }
  ];
}

function getPosts() {
  return [
    {
      id: FIRST_POST_UUID,
      title: 'текст',
      content: 'контент',
      userId: FIRST_USER_ID,
      tags: 'hello',
      preview: 'bay',
      category: {
        connect: [{ id: FIRST_CATEGORY_UUID}]
      },
      comments: [
        {
          message: 'Это действительно отличная книга!',
          userId: FIRST_USER_ID,
        },
        {
          message: 'Надо будет обязательно перечитать. Слишком много информации.',
          userId: SECOND_USER_ID,
        }
      ]
    },
    {
      id: SECOND_POST__UUID,
      title: 'текст2',
      content: 'контент2',
      userId: SECOND_USER_ID,
      tags: 'hello',
      preview: 'bay',
      category: {
        connect: [{ id: SECOND_CATEGORY_UUID}]
      },
      comments: [
        {
          message: 'Это действительно отличная книга!',
          userId: FIRST_USER_ID,
        },
        {
          message: 'Надо будет обязательно перечитать. Слишком много информации.',
          userId: SECOND_USER_ID,
        }
      ]
    }
  ]
}

async function seedDb(prismaClient: PrismaClient) {
  const mocksCategories = getCategory();
  for (const category of mocksCategories) {
    await prismaClient.category.upsert({
      where: { id: category.id },
      update: {},
      create: {
        id: category.id,
        title: category.title
      }
    });
  }

  const mockPosts = getPosts();
  for (const text of mockPosts) {
    await prismaClient.text.create({
      data: {
        id: text.id,
        tags: text.tags,
        preview: text.preview,
        title: text.title,
        content: text.content,
        category: text.category,
        userId: text.userId,
        comments: text.comments ? { create: text.comments } : undefined
      }
    })
  }

}

async function bootstrap() {
  const prismaClient = new PrismaClient();

  try {
    await seedDb(prismaClient);
    globalThis.process.exit(0);
  } catch ( error: unknown) {
    console.error(error);
    globalThis.process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
}

bootstrap()
