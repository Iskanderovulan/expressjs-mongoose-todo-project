import Todo from "../models/Todo.js"

const doneTodo = async (req, res) => {
    try {
        const { id } = req.params
        const todo = await Todo.findById(id)
        if (todo.userId == req.user.userId) {
            await Todo.findByIdAndUpdate(id, { status: !todo.status })
            return res.status(200).send({
                message: 'todo completed'
            })
        } else {
            return res.status(400).send({
                message: 'error'
            })
        }
    } catch (error) {
        console.error(error)
        return res.status(500).send("Internal Server Error")
    }
}

export { doneTodo }