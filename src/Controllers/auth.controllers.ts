import { AuthService } from "../Services/auth.services";
import {Request, Response} from "express"
import { IAuthRequest } from "../types/IAuthRequest";
const authService = new AuthService();

export class AuthController {
  public async register(req: Request, res: Response): Promise<void> {
    try {
      const userData = req.body;
      const result = await authService.register(userData);

      res.status(201).json({
        success: true,
        message: 'Usuario registrado exitosamente',
        data: result
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }


  public async login(req: Request, res: Response): Promise<void> {
    try {
      const credentials = req.body;
      const result = await authService.login(credentials);

      res.json({
        success: true,
        message: 'Inicio de sesión exitoso',
        data: result
      });
    } catch (error: any) {
      res.status(401).json({
        success: false,
        message: error.message
      });
    }
  }

   public async getProfile(req: IAuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?._id;
      const user = await authService.getProfile(userId);
      res.json({
        success: true,
        data: user
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }
}
