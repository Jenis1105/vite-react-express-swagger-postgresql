const Todo = require('../models/Todo'); // Import Todo model
const AppDataSource = require("../data-source");


// Get all todos
exports.getAllTodos = async (req, res) => {
  try {
    const todoRepository = AppDataSource.getRepository(Todo);

    const { userId } = req.query; // Get userId from query

    const todos = await todoRepository.find(); // Find all todos with userId
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
    const { id } = req.params; // Get the ID from the request parameters
    const { task } = req.body; // Get the task from the request body

    console.log("id")
    const todoRepository = AppDataSource.getRepository(Todo); // Get the Todo repository

    // Find the todo by ID
    const todo = await todoRepository.findOneBy({ id });
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" }); // Return a 404 if the todo doesn't exist
    }

    // Update the task
    todo.task = task;

    // Save the updated todo
    const updatedTodo = await todoRepository.save(todo);

    res.json(updatedTodo); // Respond with the updated todo
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "Server error" }); // Return a 500 status for server errors
  }
};


// Delete a todo
exports.deleteTodo = async (req, res) => {
  try {
    const todoRepository = AppDataSource.getRepository(Todo);

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
    const todoRepository = AppDataSource.getRepository(Todo);

    const { userId } = req.query; // Get userId from query
    await todoRepository.deleteMany({ userId }); // Find all todos with userId and delete
    res.json({ message: 'All todos deleted successfully', status: 200 });
  } catch (error) {
    res.status(500).json({ message: 'Server error', status: 500 });
  }
};
