import { Router } from "express";
import { ForumController } from "../Controllers/forum.controller";


const router = Router();
const forumController = new ForumController();



// Rutas públicas
router.post('/add', forumController.addComment);
router.get("/filter", forumController.filter)
router.get("/",forumController.getAll)
export default router;