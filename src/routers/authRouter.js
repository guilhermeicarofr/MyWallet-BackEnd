import { Router } from 'express';

import { signUp } from '../controllers/authControllers.js';
import { signUpValidation } from '../middlewares/signUpValidationMiddleware.js';

const authRouter = Router();

authRouter.post('/signup', signUpValidation, signUp);

export { authRouter };