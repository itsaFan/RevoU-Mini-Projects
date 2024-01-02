const { EntitySchema } = require("typeorm");

const Transaction = new EntitySchema({
  name: "transaction",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    transactionType: {
      type: "enum",
      enum: ["income", "expense"],
    },
    amount: {
      type: "decimal",
    },
  },
  relations: {
    user: {
      type: "many-to-one",
      target: "user",
      inverseSide: "transactions",
    },
  },
});

module.exports = { Transaction };
