import { Types } from "mongoose";
import UserModel from "../Models/user.model";
import { JWTHelper } from "../Helpers/jwt";

export class AuthService {
  private toUserResponse(user: any): any {
    return {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt!,
    };
  }

  // REGISTRO
  public async register(userData: any): Promise<{ user: any; token: string }> {
    const existingUser = await UserModel.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error("El email ya está registrado");
    }

    const user = await UserModel.create({
      ...userData,
      password: userData.password,
    });

    const userResponse = this.toUserResponse(user);
    const token = JWTHelper.generateToken(userResponse);

    return { user: userResponse, token };
  }



  // INICIO DE SESION
  public async login(credentials: any): Promise<{ user: any; token: string }> {
    const user = await UserModel.findOne({ email: credentials.email });
    if (!user) {
      throw new Error("Credenciales inválidas");
    }

    const isPasswordValid = credentials.password == (user as any).password;
    if (!isPasswordValid) {
      throw new Error("Credenciales inválidas");
    }

    const userResponse = this.toUserResponse(user);
    const token = JWTHelper.generateToken(userResponse);

    return { user: userResponse, token };
  }

  public async getProfile(userId: string): Promise<any> {
    const user = await UserModel.findById(userId).select("-password");
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    return this.toUserResponse(user);
  }

  // ! Verifica si es el primer usuario del sistema
  public static async isFirstUser(): Promise<boolean> {
    const userCount = await UserModel.countDocuments();
    return userCount === 0;
  }
}
