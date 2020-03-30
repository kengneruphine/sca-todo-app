import express from 'express';
import TodoListController from '../controllers/todoList.controller';
import verify from './verifyToken'

const todoListRouter = express.Router();

todoListRouter.get('/:todoListId', verify, TodoListController.getTodoList); //getting a todolist with all its todos
todoListRouter.post('/:userId', verify, TodoListController.createTodoList); //creating todolist for a particular user
todoListRouter.delete('/:todoListId', verify, TodoListController.deleteTodoList);
todoListRouter.get('/',verify, TodoListController.getAllTodoList);

export default todoListRouter;
