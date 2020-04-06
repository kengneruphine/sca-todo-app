import express from 'express';
import TodoController from '../controllers/todo.controller';
import verify from './verifyToken'

const todoRouter = express.Router();

todoRouter.get('/', verify, TodoController.getAllTodo);
todoRouter.post('/:todoListId', verify, TodoController.createTodo); //creating todo for a particular todolist
todoRouter.get('/:todoId', verify, TodoController.getTodo);
todoRouter.put('/:todoId', verify, TodoController.updateTodo);
todoRouter.delete('/:todoId', verify, TodoController.deleteTodo);
todoRouter.get('/:todoId', verify, TodoController.completeTodo); //complete a todo
todoRouter.get('/:todoId', verify, TodoController.dueTodo); //setting a todo to due

export default todoRouter;
