import { Response,NextFunction } from "express";
import { JWTHelper } from "../Helpers/jwt";
import UserModel from "../Models/user.model"
import { IUser } from "../types/IUser";

export const authenticateToken = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    
    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Token de acceso requerido'
      });
      return;
    }

    const decoded = JWTHelper.verifyToken(token);
    const user = await UserModel.findById(decoded.id).select('-password');
    
    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Usuario no encontrado'
      });
      return;
    }

    req.user = user as IUser
    next();
  } catch (error) {
    res.status(403).json({
      success: false,
      message: 'Token inválido o expirado'
    });
  }
};


