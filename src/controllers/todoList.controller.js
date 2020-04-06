import TodoList from '../models/list'
import User from '../models/users'
import { todoListValidation } from '../validation'

exports.getAllTodoList = async function (req, res) {
    try {
        const todoLists = await TodoList.find();
        res.status(200).json(todoLists);
    } catch (err) {
        res.status(500).json({ message: err });
    }
}

//getting a particular todolist
exports.getTodoList = async function (req, res) {
    //get id of the currently logged in user
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (user.todoList._id.toString() !== todoListId.toString()) {
        return res.status(401).json({ message: 'This todo list does not belong of this user' });
    }

    try {
        await TodoList.findOne({ _id: req.params.todoListId })
           .populate('todos')
            .then(function(TodoList) {
               res.json(TodoList);
       })
   } catch (err) {
       res.status(500).json({ message: err });
   }
}

exports.createTodoList = async function (req, res) {
    //validating input data
    const { error } = todoListValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //get the id of the currently logged user
    const userId = req.user._id;

    const todoList = new TodoList();
    todoList.name = req.body.name,
        todoList.description = req.body.description,
        todoList.createdBy = user._id;
todoList.save()
    .then(function (TodoList) {
        return User.findByIdAndUpdate({ _id: userId }, { $push: { todoList: TodoList._id } }, { new: true });
    })
    .then(function (User) {
        res.json({ User, todoList, message: 'TodoList has been created ' });
    }).catch(function (err) {
        res.json(err);
    })
}

//delete a todoList with its corresponding todos
exports.deleteTodoList = async function (req, res) {
    try {
        const id = req.params.todoListId;
        await TodoList.findByIdAndDelete(id);
        res.status(200).json({ message: 'TodoList has been deleted' });
    } catch (err) {
        res.json({ message: err });
    }
}

exports.updateTodoList = async function (req, res) {
    try {
        const update = req.body;
        const id = req.params.todoListId;
        
        const updateTodoList = await TodoList.findByIdAndUpdate(id, { $set: update }, { new: true });
        res.status(200).json({ updateTodoList, message: 'TodoList has been updated' });

    } catch (err) {
        res.json({ message: err });
    }
}
