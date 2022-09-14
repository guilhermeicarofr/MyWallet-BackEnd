import express from 'express';
import cors from 'cors';

import { userRouter } from './routers/userRouter.js';
import { infoRouter } from './routers/infoRouter.js';
import { transactionsRouter } from './routers/transactionsRouter.js';

const server = express();
server.use(cors());
server.use(express.json());

server.use(userRouter);
server.use(infoRouter);
server.use(transactionsRouter);

server.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}...`);
});