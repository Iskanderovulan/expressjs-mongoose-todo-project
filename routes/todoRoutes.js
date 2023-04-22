// routes/todoRoutes.js

import express from 'express';
import { verifyToken } from '../middlewares/verifyToken.js';
import { upload } from '../middlewares/multer.js';
import { multerError } from '../middlewares/multerError.js';
import { createTodo } from '../controllers/createTodoController.js';
import { getAllTodos } from '../controllers/getAllTodosController.js';
import { deleteTodo } from '../controllers/deleteTodoController.js';
import { doneTodo } from '../controllers/doneController.js';
import { editTodo } from '../controllers/editController.js';
import { getInfo } from '../controllers/getInfoController.js';

const router = express.Router();

router.post('/create-todo', verifyToken, upload, multerError, createTodo);
router.get('/get-all-todos', verifyToken, getAllTodos);
router.delete('/delete-todo/:id', verifyToken, deleteTodo);
router.patch('/done-todo/:id', verifyToken, doneTodo);
router.put('/edit-todo/:id', verifyToken, upload, multerError, editTodo);
router.get('/get-info', verifyToken, getInfo);

export default router;
