// models/User.js
// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/db');
const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "User", // Name of the entity
  tableName: "users", // Table name
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: "increment",
      
    },
    first_name: {
      type: "varchar",
    },
    last_name: {
      type: "varchar",
    },
    email: {
      type: "varchar",
    },
    password: {
      type: "varchar",
    },
    token: {
      type: "varchar"
    }
  },
});
