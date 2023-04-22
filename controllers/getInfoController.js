import Auth from "../models/Auth.js"

const getInfo = async (req, res) => {
    try {

        const user = await Auth.findById(req.user.userId)

        if (!user) {
            return res.status(400).send("user not found")
        }
        const { email, name, verified } = user

        const info = {
            email,
            name,
            verified
        }

        return res.status(200).send(info)
    } catch (error) {
        console.error(error)
        return res.status(500).send("Internal Server Error")
    }
}

export { getInfo }