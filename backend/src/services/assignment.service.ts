import { PrismaClient } from "../../prisma/generated";

const prisma = new PrismaClient();

export class AssignmentSubmissionService {
  static async gradeSubmission(
    submissionId: string,
    score: number,
    feedback: string
  ) {
    if (!submissionId) {
      throw new Error("Submission ID is required");
    }

    if (score < 0) {
      throw new Error("Score cannot be negative");
    }

    try {
      const submission = await prisma.assignmentSubmission.update({
        where: { id: submissionId },
        data: {
          score,
          feedback,
          status: "GRADED",
          gradedAt: new Date(),
        },
        include: {
          assignment: true,
          student: true,
        },
      });

      return submission;
    } catch (error) {
      if (error instanceof Error && error.message.includes("not found")) {
        throw new Error("Submission not found");
      }
      throw error;
    }
  }

  static async getSubmission(submissionId: string) {
    if (!submissionId) {
      throw new Error("Submission ID is required");
    }

    const submission = await prisma.assignmentSubmission.findUnique({
      where: { id: submissionId },
      include: {
        assignment: true,
        student: true,
      },
    });

    if (!submission) {
      throw new Error("Submission not found");
    }

    return submission;
  }
}
