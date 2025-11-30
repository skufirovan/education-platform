import { Request, Response } from "express";
import { LessonService } from "../services";

export class LessonController {
  static async getLesson(req: Request, res: Response) {
    try {
      const lesson = await LessonService.getLessonById(req.params.id);
      if (!lesson) return res.status(404).json({ error: "not found" });
      res.json(lesson);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal" });
    }
  }

  static async createLesson(req: Request, res: Response) {
    try {
      const lesson = await LessonService.createLesson(
        req.params.moduleId,
        req.body
      );
      res.status(201).json(lesson);
    } catch (err: any) {
      console.error(err);
      if (err.message.includes("not found"))
        return res.status(404).json({ error: err.message });
      if (err.message.includes("invalid"))
        return res.status(400).json({ error: err.message });
      res.status(500).json({ error: "internal" });
    }
  }

  static async updateLesson(req: Request, res: Response) {
    try {
      const lesson = await LessonService.updateLesson(req.params.id, req.body);
      res.json(lesson);
    } catch (err: any) {
      console.error(err);
      if (err.message.includes("invalid"))
        return res.status(400).json({ error: err.message });
      res.status(500).json({ error: "internal" });
    }
  }

  static async deleteLesson(req: Request, res: Response) {
    try {
      await LessonService.deleteLesson(req.params.id);
      res.status(204).send();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal" });
    }
  }

  static async addMaterial(req: Request, res: Response) {
    try {
      const material = await LessonService.addMaterial(
        req.params.lessonId,
        req.body
      );
      res.status(201).json(material);
    } catch (err: any) {
      console.error(err);
      if (err.message.includes("not found"))
        return res.status(404).json({ error: err.message });
      if (err.message.includes("invalid"))
        return res.status(400).json({ error: err.message });
      res.status(500).json({ error: "internal" });
    }
  }

  static async deleteMaterial(req: Request, res: Response) {
    try {
      await LessonService.deleteMaterial(req.params.materialId);
      res.status(204).send();
    } catch (err: any) {
      console.error(err);
      if (err.message.includes("not found"))
        return res.status(404).json({ error: err.message });
      res.status(500).json({ error: "internal" });
    }
  }
}
