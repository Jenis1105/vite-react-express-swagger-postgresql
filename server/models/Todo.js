
const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Todo", // Name of the entity
    tableName: "todo", // Table name
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        userId: {
            type: "int",
        },
        task: {
            type: "varchar",
        },
        // completed: {
        //     type: "boolean",
        // },
        // completed_time: {
        //     type: "date",
        // },
        // created_at: {
        //     type: "date",
        // },
    },
});