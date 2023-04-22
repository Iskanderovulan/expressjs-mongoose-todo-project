import Todo from "../models/Todo.js"
import { deleteTodoImage } from "../helpers/deleteTodoImage.js"
import cloudinary from 'cloudinary';


const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params
        const todo = await Todo.findById(id)
        if (todo?.userId === req.user.userId) {
            if (todo.todoImage) {
                await cloudinary.v2.uploader.destroy(todo.todoImage);
            }
            await Todo.findByIdAndDelete(id)
            return res.status(200).send({
                message: 'TODO IS DELETED'
            })
        } else {
            return res.status(400).send({
                message: 'USER VALIDATION FAILED'
            })
        }
    } catch (error) {
        console.error(error)
        return res.status(500).send("Internal Server Error")
    }
}

export { deleteTodo }