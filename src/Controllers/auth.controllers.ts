import { AuthService } from "../Services/auth.services";
import {Request, Response} from "express"

const authService = new AuthService();

export class AuthController {
  
  // Registra un nuevo usuario
   
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

  // Inicia sesión de usuario
   
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
}
