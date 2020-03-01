import mongoose from 'mongoose'

const todoSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true, enum:['Active','Complete','Pastdue'],default:'Active' },
    dueDate: { type: Date, required: true },
    createdBy: { type: Number, required: true },
}, {
    timestamps: true
})

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;
