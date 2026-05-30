import { Router } from 'express';
import { signup, login, getMe } from '../controllers/authController.js';
import validate from '../middlewares/validationMiddleware.js';
import { signupSchema, loginSchema } from '../validations/authValidation.js';
import protect from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/signup', validate(signupSchema), signup);
router.post('/login', validate(loginSchema), login);
router.get('/me', protect, getMe);

export default router;
