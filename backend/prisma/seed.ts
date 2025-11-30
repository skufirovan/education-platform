import { PrismaClient } from "./generated";

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

  // 2. Студенты (5 штук)
  const students = await Promise.all([
    prisma.student.upsert({
      where: { email: "anna.petrova@example.com" },
      update: {},
      create: {
        fullName: "Анна Петрова",
        email: "anna.petrova@example.com",
      },
    }),
    prisma.student.upsert({
      where: { email: "mikhail.ivanov@example.com" },
      update: {},
      create: {
        fullName: "Михаил Иванов",
        email: "mikhail.ivanov@example.com",
      },
    }),
    prisma.student.upsert({
      where: { email: "daria.smirnova@example.com" },
      update: {},
      create: {
        fullName: "Дарья Смирнова",
        email: "daria.smirnova@example.com",
      },
    }),
    prisma.student.upsert({
      where: { email: "oleg.sidorov@example.com" },
      update: {},
      create: {
        fullName: "Олег Сидоров",
        email: "oleg.sidorov@example.com",
      },
    }),
    prisma.student.upsert({
      where: { email: "elena.kuznetsova@example.com" },
      update: {},
      create: {
        fullName: "Елена Кузнецова",
        email: "elena.kuznetsova@example.com",
      },
    }),
  ]);

  console.log(
    "Students:",
    students.map((s) => s.id)
  );

  // 3. Курс + модули + уроки + материалы + одно ДЗ
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
                  // ЭТО БУДЕТ УРОК С ДОМАШКОЙ
                  title: "ДЗ 1: Анализ личного бюджета",
                  type: "ASSIGNMENT",
                  orderIndex: 2,
                  createdByTeacherId: teacher.id,
                  assignment: {
                    create: {
                      createdByTeacherId: teacher.id,
                      title: "ДЗ 1: Анализ личного бюджета",
                      description:
                        "Проанализируйте свой личный бюджет за последний месяц и предложите план оптимизации.",
                      maxScore: 100,
                      status: "PUBLISHED",
                      dueAt: new Date("2025-12-10T21:00:00.000Z"),
                      allowMultipleSubmissions: false,
                    },
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
              assignment: true,
            },
          },
        },
      },
    },
  });

  console.log("Created course:", course.id);

  // 4. Запишем всех студентов на курс
  await prisma.courseEnrollment.createMany({
    data: students.map((s) => ({
      courseId: course.id,
      studentId: s.id,
    })),
    skipDuplicates: true,
  });

  // 5. Находим наше ДЗ (урок с type = ASSIGNMENT и созданным assignment)
  const assignmentLesson = course.modules
    .flatMap((m) => m.lessons)
    .find((l) => l.type === "ASSIGNMENT" && l.assignment);

  if (!assignmentLesson || !assignmentLesson.assignment) {
    throw new Error("Assignment lesson not found in seeded course");
  }

  const assignment = assignmentLesson.assignment;
  console.log("Assignment id:", assignment.id);

  const [anna, mikhail, daria, oleg, elena] = students;

  // 6. Создаём несколько сабмитов ДЗ с разными статусами

  // Анна — сдала, не проверено (PENDING)
  await prisma.assignmentSubmission.create({
    data: {
      assignmentId: assignment.id,
      studentId: anna.id,
      status: "PENDING",
      attachments: {
        create: {
          url: "https://example.com/homeworks/anna-budget.pdf",
          filename: "anna-budget.pdf",
          mimeType: "application/pdf",
          uploadedByStudentId: anna.id,
        },
      },
    },
  });

  // Михаил — проверено, есть оценка
  await prisma.assignmentSubmission.create({
    data: {
      assignmentId: assignment.id,
      studentId: mikhail.id,
      status: "GRADED",
      score: 92,
      feedback: 'Хороший анализ, чуть больше деталей по категории "Транспорт".',
      gradedAt: new Date(),
      gradedByTeacherId: teacher.id,
      attachments: {
        create: {
          url: "https://example.com/homeworks/mikhail-budget.pdf",
          filename: "mikhail-budget.pdf",
          mimeType: "application/pdf",
          uploadedByStudentId: mikhail.id,
        },
      },
    },
  });

  // Дарья — сдала, но отправлена на доработку
  await prisma.assignmentSubmission.create({
    data: {
      assignmentId: assignment.id,
      studentId: daria.id,
      status: "NEEDS_REVISION",
      score: 70,
      feedback:
        "Не хватает вывода и рекомендаций, допишите причины перерасхода.",
      gradedAt: new Date(),
      gradedByTeacherId: teacher.id,
      attachments: {
        create: {
          url: "https://example.com/homeworks/daria-budget.docx",
          filename: "daria-budget.docx",
          mimeType:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          uploadedByStudentId: daria.id,
        },
      },
    },
  });

  // Олег и Елена — пока НИЧЕГО не сдали → в UI ты покажешь "Не сдано"
  console.log("Created assignment submissions");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
