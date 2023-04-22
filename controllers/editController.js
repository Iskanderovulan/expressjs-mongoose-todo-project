import Todo from "../models/Todo.js";
import { deleteTodoImage } from "../helpers/deleteTodoImage.js";
import cloudinary from 'cloudinary';


const editTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const todo = await Todo.findById(id);

        if (todo.userId !== req.user.userId) {
            return res.status(400).send({ message: 'User validation failed' });
        }

        // Validate input
        if (!title || !description) {
            return res.status(400).send({ message: 'Title and description are required' });
        }

        let updateObject = {
            title,
            description,
            status: todo.status,
            userId: todo.userId,
        };

        if (req.file) {
            await cloudinary.uploader.destroy(todo.todoImage);

            const result = await cloudinary.v2.uploader.upload(req.file.path);
            updateObject.todoImage = result.secure_url;
        } else {
            updateObject.todoImage = todo.todoImage;
        }

        await Todo.findByIdAndUpdate(id, updateObject);
        res.status(200).send({ message: 'TODO IS EDITED' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error' });
    }
};

export { editTodo };