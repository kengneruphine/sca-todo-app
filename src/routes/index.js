import express from 'express';
import userRouter from './userRouter';
import listRouter from './listRouter';

const apiRouter = express.Router();

apiRouter.use('/user', userRouter);
apiRouter.use('/list', listRouter);

export default apiRouter;
