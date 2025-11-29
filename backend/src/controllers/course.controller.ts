import { Request, Response } from "express";
import { CourseService } from "../services";

export class CourseController {
  static async listCourses(req: Request, res: Response) {
    try {
      const courses = await CourseService.listCourses();
      res.json(courses);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal" });
    }
  }

  static async getCourse(req: Request, res: Response) {
    try {
      const course = await CourseService.getCourseById(req.params.id);
      if (!course) return res.status(404).json({ error: "not found" });
      res.json(course);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal" });
    }
  }

  static async getTeacherCourses(req: Request, res: Response) {
    try {
      const courses = await CourseService.getCoursesByTeacherId(
        req.params.teacherId
      );
      res.json(courses);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal" });
    }
  }

  static async createCourse(req: Request, res: Response) {
    try {
      const course = await CourseService.createCourse(req.body);
      res.status(201).json(course);
    } catch (err: any) {
      console.error(err);
      if (err.message.includes("required"))
        return res.status(400).json({ error: err.message });
      res.status(500).json({ error: "internal" });
    }
  }

  static async updateCourse(req: Request, res: Response) {
    try {
      const course = await CourseService.updateCourse(req.params.id, req.body);
      res.json(course);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal" });
    }
  }

  static async deleteCourse(req: Request, res: Response) {
    try {
      await CourseService.deleteCourse(req.params.id);
      res.status(204).send();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal" });
    }
  }
}
