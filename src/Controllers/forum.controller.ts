import { ForumServices } from "../Services/forum.services";
import { Response, Request } from "express";
const forumServices = new ForumServices();

export class ForumController {
  public async addComment(req: Request, res: Response): Promise<void> {
    try {
      // const userData = req.user
      // console.log("acá",userData)
      const comment = req.body;
      const result = await forumServices.addComment({
        ...comment,
        owner: "68f13923d81dec6b66297f47",
      });

      res.status(201).json({
        success: true,
        message: "Comentario agregado exitosamente",
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  public async filter(req: Request, res: Response): Promise<void> {
    try {
      const { grupo } = req.query;
      if (typeof grupo != "string")
        throw new Error("Grupo debe ser de tipo string.");
      const result = await forumServices.filterComments("group", grupo);

      res.status(201).json({
        success: true,
        message: "Obtenido todos los comentarios",
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      const result = await forumServices.getComments();

      res.status(201).json({
        success: true,
        message: "Obtenido todos los comentarios",
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}
