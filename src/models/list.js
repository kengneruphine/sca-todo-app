import mongoose from 'mongoose'

const todoListSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    // A list has many todos
    todos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Todo'
    }]
},{
    timestamps: true
})

const TodoList = mongoose.model('TodoList', todoListSchema);

export default TodoList;
