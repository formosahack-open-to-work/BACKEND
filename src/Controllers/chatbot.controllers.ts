import { ChatbotService } from "../Services/chatbot.services";
import { Request, Response } from "express";
import { IAuthRequest } from "../types/IAuthRequest";
import { CHATBOTURL } from "../Config/constants";
const chatbotService = new ChatbotService();

export class ChatbotController {
  public async send(req: IAuthRequest, res: Response): Promise<void> {
    try {
      const { message } = req.body;
      if (!CHATBOTURL) throw new Error("No existe la ruta al chatbot");
      if (!req.user) throw new Error("No existe el usuario.");
      const response = await chatbotService.send(message,req.user)
      res.json({
        success: true,
        data: response,
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }
}
