const { DataSource } = require("typeorm");

const AppDataSource = new DataSource({
    type: "postgres", // Or your database type
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: " ",
    database: "mydb",
    synchronize: true, // Automatically syncs tables (disable in production)
    logging: true,
    entities: [__dirname + "/models/*.js"], // Path to your models
});

module.exports = AppDataSource;
