import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    password: { type: String },
    // A user can create many list of todos
    listTodos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'List'  // get us to get full fields of List
        }
    ]
});

const User = mongoose.model('User', userSchema);

export default User;
