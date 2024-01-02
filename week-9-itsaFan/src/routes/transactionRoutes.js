const express = require("express");
const { createTransaction, updateTransaction, deleteTransaction, getAllTransactions } = require("../controllers/transactionController");

const router = express.Router();

router.post("/transactions", createTransaction);
router.put("/transactions/:id", updateTransaction);
router.delete("/transactions/:id", deleteTransaction);
router.get("/transactions", getAllTransactions);

module.exports = router;
