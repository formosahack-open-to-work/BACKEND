import { Router } from 'express';
import { AuthController } from '../Controllers/auth.controllers';
import { authenticateToken } from '../Middlewares/auth-middleware';

const router = Router();
const authController = new AuthController();


router.post(
  '/first-user',
  authController.register
);


// Rutas públicas
router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/profile', authenticateToken, authController.getProfile);

export default router;