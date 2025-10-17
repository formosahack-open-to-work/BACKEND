import { DataServices } from "../Services/data.services";
import { Request, Response } from "express";
import { IAuthRequest } from "../types/IAuthRequest";


const dataServices = new DataServices();

export class DataController {
  public async send(req: IAuthRequest, res: Response): Promise<void> {
    try {
      const { message } = req.body;
      if (!req.user) throw new Error("No existe el usuario.");
      const response = await dataServices.sendData()
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
