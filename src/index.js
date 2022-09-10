import express from 'express';
import cors from 'cors';

import { userRouter } from './routers/userRouter.js';
import { infoRouter } from './routers/infoRouter.js';

const server = express();
server.use(cors());
server.use(express.json());

server.use(userRouter);
server.use(infoRouter);

server.listen(5000, () => {
    console.log('Server listening on port 5000...')
});