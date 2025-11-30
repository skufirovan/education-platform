import { Request, Response } from "express";
import { AssignmentSubmissionService } from "../services/assignment.service";

export class AssignmentSubmissionController {
  static async gradeSubmission(req: Request, res: Response) {
    try {
      const { submissionId } = req.params;
      const { score, feedback } = req.body;

      // Validation
      if (score === undefined || score === null) {
        return res.status(400).json({ message: "Score is required" });
      }

      if (typeof score !== "number" || score < 0) {
        return res
          .status(400)
          .json({ message: "Score must be a non-negative number" });
      }

      if (feedback !== undefined && typeof feedback !== "string") {
        return res.status(400).json({ message: "Feedback must be a string" });
      }

      const submission = await AssignmentSubmissionService.gradeSubmission(
        submissionId,
        score,
        feedback || ""
      );

      res.json({
        message: "Grade submitted successfully",
        success: true,
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Submission not found") {
          return res.status(404).json({ message: error.message });
        }
        return res.status(400).json({ message: error.message });
      }

      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getSubmission(req: Request, res: Response) {
    try {
      const { submissionId } = req.params;
      const submission = await AssignmentSubmissionService.getSubmission(
        submissionId
      );

      res.json(submission);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Submission not found") {
          return res.status(404).json({ message: error.message });
        }
        return res.status(400).json({ message: error.message });
      }

      res.status(500).json({ message: "Internal server error" });
    }
  }
}
