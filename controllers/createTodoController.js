import Todo from "../models/Todo.js"
import cloudinary from 'cloudinary';


const createTodo = async (req, res) => {
    try {
        const { title, description } = req.body;

        // Check if title, description, or file is not provided
        if (!title || !description) {
            return res.status(400).send({ message: 'Title and description required' });
        }

        const todo = {
            title,
            description,
            userId: req.user.userId,
        };

        if (req.file) {
            const result = await cloudinary.v2.uploader.upload(req.file.path);
            todo.todoImage = result.secure_url;
        }

        const todoForMongoose = new Todo(todo);
        await todoForMongoose.save();
        return res.status(200).send({
            success: {
                message: 'Todo has been added successfully'
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
};

export { createTodo }