import TodoList from '../models/list'
import Todo from '../models/todos'

exports.getAllTodo = async function (req, res) {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (err) {
        res.status(500).json({ message: err });
    }
}

//getting a particular todo
exports.getTodo = async function (req, res) {
    try {
        const todo = await Todo.findById(req.params.todoId);
        res.status(200).json(todo);
    } catch (err) {
        res.status(500).json({ message: err });
    }
}

exports.createTodo = async function (req, res) {
    const todoList = await TodoList.findOne({ _id: req.params.todoListId })

    const todo = new Todo();
        todo.title = req.body.title,
        todo.description = req.body.description,
        todo.status = req.body.status,
        todo.dueDate = req.body.dueDate,
        todo.createdBy = todoList._id
        todo.save()
        .then(function (Todo) {
            return TodoList.findByIdAndUpdate({ _id: req.params.todoListId }, { $push: { todos: Todo._id } }, { new: true });
        })
        .then(function (TodoList) {
            res.json(TodoList);
        }).catch(function (err) {
            res.json(err);
        })
    }

exports.updateTodo = async function (req, res) {
    try {
        const updatedTodo = await Todo.updateOne({ _id: req.params.todoId },
            {
                $set: {
                    title: req.body.title,
                    description: req.body.description,
                    status: req.body.status,
                    dueDate: req.body.dueDate,
                    //createdBy: req.body.createdBy
                }
            });
        res.status(200).json(updatedTodo);
    } catch (err) {
        res.json({ message: err });
    }
}

exports.deleteTodo = async function (req, res) {
    try {
        const removeTodo = await Todo.deleteOne({ _id: req.params.todoId });
        res.status(200).json(removeTodo);
    } catch (err) {
        res.json({ message: err });
    }
}
