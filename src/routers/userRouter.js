import { Router } from 'express';

import { signUp, signIn } from '../controllers/userControllers.js';
import { signUpValidation } from '../middlewares/userValidationsMiddleware.js';

const authRouter = Router();

authRouter.post('/signup', signUpValidation, signUp);
//authRouter.post('/signin', signIn);

export { authRouter };