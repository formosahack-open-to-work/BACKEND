import { Router } from 'express';
import { AuthController } from '../Controllers/auth.controllers';

const router = Router();
const authController = new AuthController();


router.post(
  '/first-user',
  authController.register
);


// Rutas públicas
router.post('/register', authController.register);
router.post('/login', authController.login);

export default router;