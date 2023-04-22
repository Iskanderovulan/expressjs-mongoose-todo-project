import Todo from "../models/Todo.js";
import cloudinary from "cloudinary";

const getAllTodos = async (req, res) => {
    try {
        console.log(req.user);
        const { userId } = req.user;

        const todos = await Todo.find({ userId });

        const clientTodos = [];

        for (const todo of todos) {
            const { userId, __v, ...rest } = todo.toObject();
            if (rest.todoImage) {
                const result = await cloudinary.uploader.upload(rest.todoImage);
                rest.todoImage = result.secure_url;
            }
            clientTodos.push(rest);
        }

        return res.status(200).send({
            todos: clientTodos,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            error: {
                message: "Internal Server Error",
            },
        });
    }
};

export { getAllTodos };