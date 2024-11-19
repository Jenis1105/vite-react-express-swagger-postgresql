const Todo = require('../models/Todo'); // Import Todo model
const AppDataSource = require("../data-source");


// Get all todos
exports.getAllTodos = async (req, res) => {
  try {
    const todoRepository = AppDataSource.getRepository(Todo);

    const { userId } = req.query; // Get userId from query

    const todos = await todoRepository.find({ where: { id: userId } }); // Find all todos with userId
    res.json(todos); // Send todos as json
  } catch (error) {
    res.status(500).json({ error: 'Server error' }); // If error, send server error
  }
};

// Create a new todo
exports.createTodo = async (req, res) => {
  try {
    const todoRepository = AppDataSource.getRepository(Todo);

    const { task } = req.body; // Get task from body
    const { userId } = req.query; // Get userId from query
    // create new todo

    const todo = todoRepository.create({
      task: task,
      userId: userId,
    });
    await todoRepository.save(todo); // Save todo
    console.log(todo);

    res.status(201).json(todo); // Send todo as json
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Server error' + error });
  }
};

// Update a todo
exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params; // Get id from params
    // const { task, completed, completed_time } = req.body; // Get task, completed, completed_time from body
    const { task, completed } = req.body; // Get task, completed, completed_time from body
    // console.log(id)
    const todo = await todoRepository.findByIdAndUpdate(
      id, // Find todo by id
      { task, completed }, // Update task, completed, completed_time
      { new: true } // Return updated todo
    );
    // console.log(todo)
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete a todo
exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params; // Get id from params
    await todoRepository.findOneAndDelete({ _id: id }); // Find todo by id and delete
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete all todos
exports.deleteAllTodos = async (req, res) => {
  try {
    const { userId } = req.query; // Get userId from query
    await todoRepository.deleteMany({ userId }); // Find all todos with userId and delete
    res.json({ message: 'All todos deleted successfully', status: 200 });
  } catch (error) {
    res.status(500).json({ message: 'Server error', status: 500 });
  }
};
