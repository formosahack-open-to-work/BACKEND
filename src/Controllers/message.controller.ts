import { MessageServices } from "../Services/message.services";
import { Response, Request } from "express";
import { IAuthRequest } from "../types/IAuthRequest";
const messageServices = new MessageServices();

export class MessageController {
  public async send(req: IAuthRequest, res: Response): Promise<void> {
    try {
        const {message, to } = req.body
        if (!req.user) throw new Error("No existe el emisor.")
        const {_id} = req.user 
    console.log("acá", _id)
        const result = messageServices.sendMessage(message,_id,to)
      res.status(201).json({
        success: true,
        message: "Mensaje enviado correctamente.",
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  public async get(req: IAuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) throw new Error("No existe el emisor.")
      const result = await messageServices.getMessages(req.user)
      console.log("acáaaa",result)
      res.status(201).json({
        success: true,
        message: `Obtenido los comentarios enviados a: ${req.user._id}`,
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
