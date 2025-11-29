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
                  createdByTeacherId: teacher.id,
                  materials: {
                    create: [
                      {
                        title: "Статья на Habr",
                        type: "LINK",
                        createdByTeacherId: teacher.id,
                        attachment: {
                          create: {
                            url: "https://habr.com/articles/internet-intro",
                            filename: "Habr Article",
                            uploadedByTeacherId: teacher.id,
                          },
                        },
                      },
                    ],
                  },
                },
                {
                  title: "Как работает браузер",
                  type: "ARTICLE",
                  orderIndex: 2,
                  createdByTeacherId: teacher.id,
                  materials: {
                    create: [
                      {
                        title: "Конспект",
                        type: "FILE",
                        createdByTeacherId: teacher.id,
                        attachment: {
                          create: {
                            url: "https://example.com/browser-guide.pdf",
                            filename: "browser-guide.pdf",
                            mimeType: "application/pdf",
                            uploadedByTeacherId: teacher.id,
                          },
                        },
                      },
                    ],
                  },
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
                  createdByTeacherId: teacher.id,
                  materials: {
                    create: [
                      {
                        title: "Справочник тегов",
                        type: "LINK",
                        createdByTeacherId: teacher.id,
                        attachment: {
                          create: {
                            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element",
                            filename: "MDN HTML Reference",
                            uploadedByTeacherId: teacher.id,
                          },
                        },
                      },
                      {
                        title: "Примеры кода",
                        type: "FILE",
                        createdByTeacherId: teacher.id,
                        attachment: {
                          create: {
                            url: "https://example.com/html-examples.zip",
                            filename: "html-examples.zip",
                            mimeType: "application/zip",
                            uploadedByTeacherId: teacher.id,
                          },
                        },
                      },
                    ],
                  },
                },
                {
                  title: "Формы и ввод данных",
                  type: "ARTICLE",
                  orderIndex: 2,
                  createdByTeacherId: teacher.id,
                  materials: {
                    create: [
                      {
                        title: "Презентация",
                        type: "FILE",
                        createdByTeacherId: teacher.id,
                        attachment: {
                          create: {
                            url: "https://example.com/forms-presentation.pptx",
                            filename: "forms-presentation.pptx",
                            mimeType:
                              "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                            uploadedByTeacherId: teacher.id,
                          },
                        },
                      },
                    ],
                  },
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
                  createdByTeacherId: teacher.id,
                  materials: {
                    create: [
                      {
                        title: "Видеотуториал",
                        type: "LINK",
                        createdByTeacherId: teacher.id,
                        attachment: {
                          create: {
                            url: "https://youtube.com/css-basics",
                            filename: "CSS Basics Tutorial",
                            uploadedByTeacherId: teacher.id,
                          },
                        },
                      },
                    ],
                  },
                },
                {
                  title: "Flexbox и Grid",
                  type: "ARTICLE",
                  orderIndex: 2,
                  createdByTeacherId: teacher.id,
                  materials: {
                    create: [
                      {
                        title: "Практические примеры",
                        type: "FILE",
                        createdByTeacherId: teacher.id,
                        attachment: {
                          create: {
                            url: "https://example.com/flexbox-grid-examples.html",
                            filename: "flexbox-grid-examples.html",
                            mimeType: "text/html",
                            uploadedByTeacherId: teacher.id,
                          },
                        },
                      },
                    ],
                  },
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
          lessons: {
            include: {
              materials: {
                include: {
                  attachment: true,
                },
              },
            },
          },
        },
      },
    },
  });

  console.log("Created course:", course.id);
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
