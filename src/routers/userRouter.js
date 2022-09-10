import { Router } from 'express';

import { signUp, signIn } from '../controllers/userControllers.js';
import { signUpValidation, signInValidation } from '../middlewares/userValidationsMiddleware.js';

const userRouter = Router();

userRouter.post('/signup', signUpValidation, signUp);
userRouter.post('/signin', signInValidation, signIn);

export { userRouter };