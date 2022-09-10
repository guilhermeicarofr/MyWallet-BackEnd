import { Router } from 'express';

import { validateAuthToken } from '../middlewares/tokenValidationMiddleware.js';
import { validateTransactionSchema } from '../middlewares/transactionSchemaValidationMiddleware.js';
import { createTransaction } from '../controllers/transactionsControllers.js';

const transactionsRouter = Router();

transactionsRouter.use(validateAuthToken);
transactionsRouter.post('/transactions', validateTransactionSchema, createTransaction);



export { transactionsRouter };