import express from 'express';
import cors from 'cors';

import { authRouter } from './routers/authRouter.js';

const server = express();
server.use(cors());
server.use(express.json());

server.use(authRouter);

server.listen(5000, () => {
    console.log('Server listening on port 5000...')
});