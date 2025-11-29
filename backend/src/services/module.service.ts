import { PrismaClient } from "../../prisma/generated";

const prisma = new PrismaClient();

export class ModuleService {
  static async listModulesByCourse(courseId: string) {
    return prisma.module.findMany({
      where: { courseId },
      orderBy: { orderIndex: "asc" },
    });
  }

  static async getModuleById(id: string) {
    return prisma.module.findUnique({
      where: { id },
      include: {
        lessons: { orderBy: { orderIndex: "asc" } },
        course: true,
      },
    });
  }

  static async createModule(
    courseId: string,
    data: { title: string; description?: string; orderIndex: number }
  ) {
    const course = await prisma.course.findUnique({ where: { id: courseId } });
    if (!course) throw new Error("course not found");

    return prisma.module.create({
      data: {
        courseId,
        title: data.title,
        description: data.description || "",
        orderIndex: data.orderIndex,
      },
    });
  }

  static async updateModule(
    id: string,
    data: { title?: string; description?: string; orderIndex?: number }
  ) {
    return prisma.module.update({
      where: { id },
      data,
    });
  }

  static async deleteModule(id: string) {
    return prisma.module.delete({
      where: { id },
    });
  }
}
