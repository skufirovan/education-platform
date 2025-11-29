import { LessonType, PrismaClient } from "../../prisma/generated";

const prisma = new PrismaClient();

export class LessonService {
  static async getLessonById(id: string) {
    return prisma.lesson.findUnique({
      where: { id },
      include: { materials: true, assignment: true, test: true },
    });
  }

  static async createLesson(
    moduleId: string,
    data: {
      title: string;
      type: LessonType;
      orderIndex: number;
      durationMinutes?: number;
      contentUrl?: string;
    }
  ) {
    const module = await prisma.module.findUnique({ where: { id: moduleId } });
    if (!module) throw new Error("module not found");

    return prisma.lesson.create({
      data: {
        moduleId,
        title: data.title,
        type: data.type,
        orderIndex: data.orderIndex,
        durationMinutes: data.durationMinutes || null,
      },
    });
  }

  static async updateLesson(
    id: string,
    data: {
      title?: string;
      type?: LessonType;
      orderIndex?: number;
      durationMinutes?: number;
      contentUrl?: string;
    }
  ) {
    return prisma.lesson.update({
      where: { id },
      data,
    });
  }

  static async deleteLesson(id: string) {
    return prisma.lesson.delete({
      where: { id },
    });
  }
}
