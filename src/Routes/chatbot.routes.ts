import { Router } from 'express';
import { authenticateToken } from '../Middlewares/auth-middleware';
import { ChatbotController } from '../Controllers/chatbot.controllers';

const router = Router();
const chatbotController= new ChatbotController();

// Rutas públicas
router.post('/send',authenticateToken, chatbotController.send);


export default router;