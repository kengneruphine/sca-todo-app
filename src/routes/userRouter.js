import express from 'express';
import UserController from '../controllers/user.controller';
import verify from './verifyToken';

const userRouter = express.Router();

userRouter.post('/register', UserController.registerUser);
userRouter.post('/login', UserController.loginUser);
userRouter.get('/:userId',verify, UserController.getUser);

export default userRouter;