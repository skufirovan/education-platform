import { PrismaClient } from "./generated"; // или "@/prisma" как у тебя
const prisma = new PrismaClient();

async function main() {
  // 1. Препод
  const teacher = await prisma.teacher.upsert({
    where: { email: "teacher@example.com" },
    update: {},
    create: {
      fullName: "Иван Петрович",
      email: "teacher@example.com",
    },
  });

  console.log("Teacher:", teacher.id);

  // 2. Курс
  const course = await prisma.course.create({
    data: {
      title: "Основы веб-разработки",
      description:
        "Курс introducing студентов в базовые принципы создания сайтов.",
      teachers: {
        create: [{ teacherId: teacher.id }],
      },
      modules: {
        create: [
          {
            title: "Введение в веб",
            description: "Базовое понимание веб-технологий.",
            orderIndex: 1,
            lessons: {
              create: [
                {
                  title: "Что такое интернет",
                  type: "ARTICLE",
                  orderIndex: 1,
                  contentUrl: "https://example.com/lesson1",
                  createdByTeacherId: teacher.id,
                },
                {
                  title: "Как работает браузер",
                  type: "ARTICLE",
                  orderIndex: 2,
                  contentUrl: "https://example.com/lesson2",
                  createdByTeacherId: teacher.id,
                },
              ],
            },
          },
          {
            title: "HTML базовый уровень",
            description: "Разметка страниц и структура HTML.",
            orderIndex: 2,
            lessons: {
              create: [
                {
                  title: "HTML теги",
                  type: "ARTICLE",
                  orderIndex: 1,
                  contentUrl: "https://example.com/lesson3",
                  createdByTeacherId: teacher.id,
                },
                {
                  title: "Формы и ввод данных",
                  type: "ARTICLE",
                  orderIndex: 2,
                  contentUrl: "https://example.com/lesson4",
                  createdByTeacherId: teacher.id,
                },
              ],
            },
          },
          {
            title: "CSS основа",
            description: "Стилизация страниц и работа с layout.",
            orderIndex: 3,
            lessons: {
              create: [
                {
                  title: "Основы CSS",
                  type: "ARTICLE",
                  orderIndex: 1,
                  contentUrl: "https://example.com/lesson5",
                  createdByTeacherId: teacher.id,
                },
                {
                  title: "Flexbox и Grid",
                  type: "ARTICLE",
                  orderIndex: 2,
                  contentUrl: "https://example.com/lesson6",
                  createdByTeacherId: teacher.id,
                },
              ],
            },
          },
        ],
      },
    },
    include: {
      modules: {
        include: {
          lessons: true,
        },
      },
    },
  });

  console.log("Created course:", course.id);
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
