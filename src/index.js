import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
import { userRouter } from './routers/userRouter.js';
import { infoRouter } from './routers/infoRouter.js';
import { transactionsRouter } from './routers/transactionsRouter.js';

const server = express();
server.use(cors());
server.use(express.json());

server.use(userRouter);
server.use(infoRouter);
server.use(transactionsRouter);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});