import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const deleteTodoImage = async (todoImage) => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url))
    if (todoImage) {
        const imagePath = path.join(__dirname, '..', 'public', 'uploads', todoImage.toString())
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.log(err)
            }
        })
    }
}
export { deleteTodoImage }