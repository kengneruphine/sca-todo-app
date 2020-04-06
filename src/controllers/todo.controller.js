import TodoList from '../models/list'
import Todo from '../models/todos'
import { todoValidation } from '../validation'

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
    //validating input data
    const { error } = todoValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const todoList = await TodoList.findOne({ _id: req.params.todoListId });
    if (!todoList) {
        return res.status(400).json({ message: 'TodoList does not exist' });
    }

    const todo = new Todo();
        todo.title = req.body.title,
        todo.description = req.body.description,
        todo.status = 'Active',
        todo.dueDate = req.body.dueDate,
        todo.createdBy = todoList._id
        todo.save()
        .then(function (Todo) {
            return TodoList.findByIdAndUpdate({ _id: req.params.todoListId }, { $push: { todos: Todo._id } }, { new: true });
        })
        .then(function (TodoList) {
            res.status(200).json({ TodoList, todo, message: 'Todo has been created' });
        }).catch(function (err) {
            res.json(err.message);
        })
    }

exports.updateTodo = async function (req, res) {
    try {
        const update = req.body;
        const id = req.params.todoId;
        
        const updateTodo = await Todo.findByIdAndUpdate(id, { $set: update }, { new: true });
        res.status(200).json({ updateTodo, message: 'Todo has been updated' });

    } catch (err) {
        res.json({ message: err });
    }
}

exports.deleteTodo = async function (req, res) {
    try {
        const id = req.params.todoId;
        await Todo.findByIdAndDelete(id);
        res.status(200).json({ message: 'Todo has been deleted' });
    } catch (err) {
        res.json({ message: err });
    }
}

exports.completeTodo = async function (req, res) {
    try {
        const id = req.params.todoId;
        const todo = await Todo.findById(id);
        if (!todo) {
            return res.status(401).json({ message: 'Todo does not exist' });
        }

        todo.status = 'Complete';
        await todo.save();
        res.status(200).json({todo, message:'Todo has been updated'})
    } catch (err) {
        res.status(500).json({message:err})
    }
}

exports.dueTodo = async function (req, res) {
    try {
        const id = req.params.todoId;
        const todo = await Todo.findById(id);

        if (!todo) {
            return res.status(401).json({ message: 'Todo does not exist' });
        }

        if (todo.dueDate.getTime() > Date.now.getTime()) {
            return res.json({ message: 'There is time left for this todo' });
        }

        else if (todo.dueDate.getTime() == Date.now.getTime()) {
            return res.json({ message: 'Today is the last day for this todo' });
        }
        else {
            todo.status = 'Pastdue';
            await todo.save();
            return res.status(200).json({todo, message:'Todo is past due'})
        }

    } catch (err) {
        res.status(500).json({message:err.message})
    }
}
