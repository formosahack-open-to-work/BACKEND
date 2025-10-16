import mongoose from 'mongoose';
import { MONGOURI } from './constants';

class ConnectDB {
  private static instancia: ConnectDB;
  private uri: string;
  private constructor() {
    this.uri = MONGOURI || '' ;
  }

  static getInstancia(): ConnectDB {
    if (!ConnectDB.instancia) {
      ConnectDB.instancia = new ConnectDB();
    }
    return ConnectDB.instancia;
  }

  async conectar(): Promise<void> {
    try {
      await mongoose.connect(this.uri, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });
      
      console.log(`Conectado a MongoDB: ${this.uri}`);
      
    } catch (error: any) {
      console.error('Error conectando a MongoDB:', error.message);
    
    }
  }

  async desconectar(): Promise<void> {
    try {
      await mongoose.disconnect();
      console.log('🔌 Desconectado de MongoDB');
    } catch (error) {
      console.error('Error al desconectar:', error);
    }
  }

  estaConectado(): boolean {
    return mongoose.connection.readyState === 1;
  }
}

const database = ConnectDB.getInstancia();
export default database 
