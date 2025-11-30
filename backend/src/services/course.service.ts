import { PrismaClient } from "../../prisma/generated";

const prisma = new PrismaClient();

export class CourseService {
  static async listCourses() {
    return prisma.course.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  static async getCourseById(id: string) {
    return prisma.course.findUnique({
      where: { id },
      include: {
        modules: {
          orderBy: { orderIndex: "asc" },
          include: {
            lessons: {
              include: {
                materials: {
                  include: {
                    attachment: true,
                  },
                },
                assignment: {
                  include: {
                    submissions: {
                      include: {
                        student: true,
                      },
                    },
                  },
                },
                test: true,
              },
              orderBy: { orderIndex: "asc" },
            },
          },
        },
        enrollments: true,
      },
    });
  }

  static async getCoursesByTeacherId(teacherId: string) {
    return prisma.course.findMany({
      where: {
        teachers: {
          some: { teacherId },
        },
      },
      include: {
        enrollments: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  static async createCourse(data: { title: string; description?: string }) {
    return prisma.course.create({
      data: {
        title: data.title,
        description: data.description,
      },
    });
  }

  static async updateCourse(
    id: string,
    data: { title?: string; description?: string }
  ) {
    return prisma.course.update({
      where: { id },
      data,
    });
  }

  static async deleteCourse(id: string) {
    return prisma.course.delete({
      where: { id },
    });
  }
}
