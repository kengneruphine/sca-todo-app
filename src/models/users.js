import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    lastName: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min:6
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    // A user can create many list of todos
    todoList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'TodoList'  // get us to get full fields of List
        }
    ]
});

const User = mongoose.model('User', userSchema);

export default User;
