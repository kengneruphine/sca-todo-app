import express from 'express';
import TodoListController from '../controllers/todoList.controller';
import verify from './verifyToken'

const todoListRouter = express.Router();

todoListRouter.get('/:todoListId', verify, TodoListController.getTodoList); //getting a todolist with all its todos
todoListRouter.post('/', verify, TodoListController.createTodoList); //creating todolist for a particular user
todoListRouter.delete('/:todoListId', verify, TodoListController.deleteTodoList);
todoListRouter.get('/', verify, TodoListController.getAllTodoList);
todoListRouter.put('/todoListId', verify, TodoListController.updateTodoList);

export default todoListRouter;
