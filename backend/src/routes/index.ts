import { Router } from "express";
import { PrismaClient } from "../../prisma/generated";
import {
  CourseController,
  ModuleController,
  LessonController,
  AssignmentSubmissionController,
} from "../controllers";

const router = Router();

const prisma = new PrismaClient();

router.get("/me", async (req, res) => {
  const teacher = await prisma.teacher.findFirst();

  if (!teacher) {
    return res.status(500).json({ message: "Teacher not found" });
  }

  res.json({
    id: teacher.id,
    fullName: teacher.fullName,
    email: teacher.email,
  });
});

router.get("/courses", (req, res) => CourseController.listCourses(req, res));
router.get("/teachers/:teacherId/courses", (req, res) =>
  CourseController.getTeacherCourses(req, res)
);
router.post("/courses", (req, res) => CourseController.createCourse(req, res));
router.get("/courses/:id", (req, res) => CourseController.getCourse(req, res));
router.patch("/courses/:id", (req, res) =>
  CourseController.updateCourse(req, res)
);
router.delete("/courses/:id", (req, res) =>
  CourseController.deleteCourse(req, res)
);

router.get("/courses/:courseId/modules", (req, res) =>
  ModuleController.listModules(req, res)
);
router.post("/courses/:courseId/modules", (req, res) =>
  ModuleController.createModule(req, res)
);
router.get("/modules/:id", (req, res) => ModuleController.getModule(req, res));
router.patch("/modules/:id", (req, res) =>
  ModuleController.updateModule(req, res)
);
router.delete("/modules/:id", (req, res) =>
  ModuleController.deleteModule(req, res)
);

router.post("/modules/:moduleId/lessons", (req, res) =>
  LessonController.createLesson(req, res)
);
router.get("/lessons/:id", (req, res) => LessonController.getLesson(req, res));
router.patch("/lessons/:id", (req, res) =>
  LessonController.updateLesson(req, res)
);
router.delete("/lessons/:id", (req, res) =>
  LessonController.deleteLesson(req, res)
);
router.post("/lessons/:lessonId/materials", (req, res) =>
  LessonController.addMaterial(req, res)
);
router.delete("/materials/:materialId", (req, res) =>
  LessonController.deleteMaterial(req, res)
);

router.get("/submissions/:submissionId", (req, res) =>
  AssignmentSubmissionController.getSubmission(req, res)
);
router.patch("/submissions/:submissionId/grade", (req, res) =>
  AssignmentSubmissionController.gradeSubmission(req, res)
);

export default router;
