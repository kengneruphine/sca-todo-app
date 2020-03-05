import mongoose from 'mongoose'

const listTodoSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    createdBy: {type:String},
    // A list has many todos
    todos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Todo'
    }]
},{
    timestamps: true
})

const List = mongoose.model('List', listTodoSchema);

export default List;
