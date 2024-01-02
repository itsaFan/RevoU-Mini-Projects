const { EntitySchema } = require("typeorm");

const User = new EntitySchema({
  name: "user",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    username: {
      type: "varchar",
      nullable: false,
    },
    address: {
      type: "varchar",
      nullable: true,
    },
    balance: {
      type: "varchar",
      default: 0,
    },
    totalAccumulatedExpenses: {
      type: "decimal",
      default: 0,
    },
  },
  relations: {
    transactions: {
      type: "one-to-many",
      target: "transaction",
      inverseSide: "user",
    },
  },
});

module.exports = { User };
