// routes/authRoutes.js

import express from 'express';
import { registerUser } from '../controllers/regController.js';
import { loginUser } from '../controllers/authController.js';
import { validateRegistration } from '../validators/regValidator.js';
import { validationErrors } from '../middlewares/validationErrors.js';
import { verifyEmail } from '../controllers/verifyController.js';

const router = express.Router();
const validateLogin = validateRegistration.filter((_, index) => index !== 0);

router.post('/reg', validateRegistration, validationErrors, registerUser);
router.post('/login', validateLogin, validationErrors, loginUser);
router.get('/verify-email/:token', verifyEmail);


export default router;