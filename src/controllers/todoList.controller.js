import TodoList from '../models/list'
import User from '../models/users'

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

exports.createTodoList = function (req, res) {
const todoList = new TodoList();
    todoList.name = req.body.name,
    todoList.description = req.body.description,
    todoList.createdBy = req.body.createdBy
todoList.save()
    .then(function (TodoList) {
        return User.findOneAndUpdate({ _id: req.params.userId }, { $push: { todoList: TodoList._id } }, { new: true });
    })
    .then(function (User) {
        res.json(User);
    }).catch(function (err) {
        res.json(err);
    })
}

//delete a todoList with its corresponding todos
exports.deleteTodoList = async function (req, res) {
    try {
        const removeTodoList = await TodoList.remove({ _id: req.params.todoListId })
        res.status(200).json(removeTodoList);
    } catch (err) {
        res.json({ message: err });
    }
}

