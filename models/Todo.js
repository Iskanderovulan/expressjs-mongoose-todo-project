import { Schema, model } from 'mongoose'


const TodoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    todoImage: {
        type: String, // or Uint8Array
    },

}, { timestamps: true });


export default model('Todo', TodoSchema)
