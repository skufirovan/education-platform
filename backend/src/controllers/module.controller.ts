import { Request, Response } from "express";
import { ModuleService } from "../services";

export class ModuleController {
  static async listModules(req: Request, res: Response) {
    try {
      const modules = await ModuleService.listModulesByCourse(
        req.params.courseId
      );
      res.json(modules);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal" });
    }
  }

  static async getModule(req: Request, res: Response) {
    try {
      const module = await ModuleService.getModuleById(req.params.id);
      if (!module) return res.status(404).json({ error: "not found" });
      res.json(module);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal" });
    }
  }

  static async createModule(req: Request, res: Response) {
    try {
      const module = await ModuleService.createModule(
        req.params.courseId,
        req.body
      );
      res.status(201).json(module);
    } catch (err: any) {
      console.error(err);
      if (err.message.includes("not found"))
        return res.status(404).json({ error: err.message });
      res.status(500).json({ error: "internal" });
    }
  }

  static async updateModule(req: Request, res: Response) {
    try {
      const module = await ModuleService.updateModule(req.params.id, req.body);
      res.json(module);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal" });
    }
  }

  static async deleteModule(req: Request, res: Response) {
    try {
      await ModuleService.deleteModule(req.params.id);
      res.status(204).send();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal" });
    }
  }
}
