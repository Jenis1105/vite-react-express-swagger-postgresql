// routes/userRoutes.js
const express = require('express');
const todoController = require('../controllers/todoController');
const router = express.Router();
const auth = require("../middleware/auth"); // auth middleware

router.get('/', auth, todoController.getAllTodos);
router.post('/', auth, todoController.createTodo);
router.put('/:id', auth, todoController.updateTodo);
router.delete('/:id', auth, todoController.deleteTodo);

router.delete('/delete/all', auth, todoController.deleteAllTodos);

module.exports = router;
