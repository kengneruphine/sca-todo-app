import express from 'express';
import userRouter from './userRouter';
import todoListRouter from './todoListRouter'
import todoRouter from './todoRouter'

const apiRouter = express.Router();

apiRouter.use('/user', userRouter);
apiRouter.use('/list', todoListRouter);
apiRouter.use('/todo', todoRouter);

export default apiRouter;
