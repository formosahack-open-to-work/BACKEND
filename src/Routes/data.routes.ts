import { Router } from 'express';
import { DataController } from '../Controllers/data.controllers';
import { authenticateToken } from '../Middlewares/auth-middleware';

const router = Router();
const dataController= new DataController();

// Rutas públicas

router.get("/",authenticateToken,dataController.send)
// router.post('/send',authenticateToken, chatbotController.send);

