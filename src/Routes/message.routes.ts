import { Router } from "express";
import { MessageController } from "../Controllers/message.controller";
import { authenticateToken } from "../Middlewares/auth-middleware";

const router = Router();
const messageController = new MessageController();

// Rutas de mensajes
router.post("/  ",authenticateToken, messageController.send)
router.get("/:id",authenticateToken, messageController.get)

export default router;