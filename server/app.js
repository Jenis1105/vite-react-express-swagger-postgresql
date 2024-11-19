// app.js
const express = require('express');
const cors = require('cors');
const AppDataSource = require("./data-source");
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const dotenv = require('dotenv');


// const sequelize = require('./config/db'); // Database connection
const swaggerUi = require('swagger-ui-express');

const $RefParser = require("@apidevtools/json-schema-ref-parser");

const test = require('./routes/test');
const userRoutes = require('./routes/userRoutes'); // Your routes
const todoRoutes = require('./routes/todoRoutes'); // Your routes

// const fs = require('fs');
// const path = require('path');

// Load the JSON file
// const swaggerDocument = JSON.parse(fs.readFileSync(path.join(__dirname, './swagger/swagger.json'), 'utf-8'));

dotenv.config();
const app = express();

// Middleware setup
app.use(cors());                  // Enable CORS
app.use(helmet());                // Set security headers
app.use(morgan('dev'));           // Log requests to the console
app.use(bodyParser.json());       // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// API routes
$RefParser.dereference("./swagger/swagger.json", (err, schema) => {
  if (err) {
    console.error(err);
  } else {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(schema));
  }
});
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/test', test);
app.use('/api/users', userRoutes);
app.use('/api/todos', todoRoutes);
const PORT = process.env.PORT || 8000;

// Sync database and start server
// sequelize.sync().then(() => {
//   console.log('Database synced');
//   const PORT = process.env.PORT || 8000;
//   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// });
AppDataSource.initialize()
    .then(() => {
        console.log("Data Source initialized successfully!");
        // const userRepository = AppDataSource.getRepository(User);
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error during Data Source initialization:", error);
    });