import { Router } from 'express';

import { validateAuthToken } from '../middlewares/tokenValidationMiddleware.js';
import { readUserName, readUserBalance } from '../controllers/infoControllers.js';

const infoRouter = Router();

infoRouter.use(validateAuthToken);
infoRouter.get('/name', readUserName);
infoRouter.get('/balance', readUserBalance);

export { infoRouter };