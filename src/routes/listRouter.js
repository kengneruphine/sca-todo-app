import express from 'express';
import ListController from '../controllers/list.controller';
import verify from './verifyToken'

const listRouter = express.Router();

listRouter.get('/',verify, ListController.getList);


export default listRouter;