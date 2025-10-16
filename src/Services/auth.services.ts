import { Types } from 'mongoose';
import UserModel from '../Models/user.model';
 
export class AuthService {
   
  private toUserResponse(user: any): any {
    return {
      _id: user._id.toString(), 
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt!
    };
  }
   
  public async register(userData: any): Promise<{ user: any; token: string }> {
    const existingUser = await UserModel.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error('El email ya está registrado');
    }
    // Crear el usuario
    const user = await UserModel.create({
      ...userData,
      password: userData.password
    });

    // Generar token
    const userResponse = this.toUserResponse(user);
    const token = userResponse

    return { user: userResponse, token };
  }

  // Inicia sesión de un usuario
   
  public async login(credentials: any): Promise<{ user: any; token: string }> {
    // Buscar usuario por email
    const user = await UserModel.findOne({ email: credentials.email });
    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    // Verificar contraseña
    const isPasswordValid = credentials.password == ((user as any).password)
    if (!isPasswordValid) {
      throw new Error('Credenciales inválidas');
    }

    // Generar token
    const userResponse = this.toUserResponse(user);
    const token = userResponse

    return { user: userResponse, token };
  }

}