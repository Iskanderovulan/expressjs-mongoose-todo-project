.env представляет собой файл конфигурации, используемый для хранения переменных среды. Переменные среды — это значения, которые можно использовать в приложении для управления его поведением в зависимости от среды, в которой оно выполняется.

Например, у вас может быть среда разработки и производственная среда, и вы можете захотеть использовать разные настройки для каждой среды. Сохраняя эти настройки в переменных среды, вы можете легко переключаться между средами, не изменяя код.

API_KEY=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


import Todo from "../models/Todo.js"
import cloudinary from 'cloudinary';


const getAllTodos = async (req, res) => {
    try {
        console.log(req.user)
        const { userId } = req.user
        console.log(req.params.page, 'check')
        const page = req.params.page || 1; // default to page 1 if no page parameter is provided
        const limit = 5; // number of items to return per page
        const skip = (page - 1) * limit; // calculate the number of items to skip based on the current page and the limit

        const todos = await Todo.find({ userId }).skip(skip).limit(limit);
        const totalTodos = await Todo.countDocuments({ userId });
        const totalPages = Math.ceil(totalTodos / limit) || 1

        const clientTodos = [];

        for (const todo of todos) {
            const { userId, __v, ...rest } = todo.toObject();
            if (rest.todoImage) {
                const result = await cloudinary.uploader.upload(rest.todoImage);
                rest.todoImage = result.secure_url;
            }
            clientTodos.push(rest);
        }
        console.log(todos.length)
        return res.status(200).send({
            todos: clientTodos,
            currentPage: page,
            totalPages: totalPages
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            error: {
                message: 'Internal Server Error'
            }
        });
    }
}

export { getAllTodos }


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
        if (!title && !description && !req.file) {
            return res.status(400).send({ message: 'Title, description or image is required' });
        }

        let updateObject = {};
        if (title) updateObject.title = title;
        if (description) updateObject.description = description;

        if (req.file) {
            // Delete old image from Cloudinary
            await cloudinary.uploader.destroy(todo.todoImage);

            // Upload new image to Cloudinary and store URL in updateObject
            const result = await cloudinary.v2.uploader.upload(req.file.path);
            updateObject.todoImage = result.secure_url;
        } else {
            // If no image uploaded, keep the existing image URL
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