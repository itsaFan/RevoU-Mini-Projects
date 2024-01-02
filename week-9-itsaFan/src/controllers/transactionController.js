const { getRepository } = require("typeorm");
const { User } = require("../entities/user");
const { Transaction } = require("../entities/transaction");

const createTransaction = async (req, res) => {
  try {
    const { userId, transactionType, amount } = req.body;
    const userRepo = getRepository(User);
    const transactionRepo = getRepository(Transaction);

    const user = await userRepo.createQueryBuilder("user")
    .leftJoinAndSelect("user.transactions", "transaction")
    .where("user.id = :id", { id: userId })
    .getOne();

    if (!user) {
      return res.status(404).json({ message: "User not found :(" });
    }

    const newTransaction = transactionRepo.create({
      transactionType,
      amount,
      userId: user.username,
    });
    await transactionRepo.save(newTransaction);

    if (transactionType === "income") {
      user.balance = +user.balance + amount;
    } else if (transactionType === "expense") {
        user.balance -= amount;
      user.totalAccumulatedExpenses = +user.totalAccumulatedExpenses + amount;
    }

    await userRepo.save(user);
    res.status(201).json({
      message: "Your transaction has been successfully registered. You can check your balance.",
      user,
      transaction: newTransaction,
    });

  } catch (error) {
    console.error("Transaction process failed: ", error);
    res.status(500).json({ message: "Transaction process failed" });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const transactionId = req.params.id;
    const { transactionType, amount } = req.body;

    const transactionRepo = getRepository(Transaction);

    const transaction = await transactionRepo
    .createQueryBuilder()
    .update(Transaction)
    .set({transactionType, amount})
    .where("id = :id", {id : transactionId})
    .execute();

    if(transaction.affected === 0) {
      return res.status(404).json({message: "Transaction not found"})
    }
    res.status(200).json({
      message: "You have successfully update your transaction",
      transaction,
    });
  }catch(error) {
    console.error("Failed to update transaction: ", error);
    res.status(500).json({message: "Failed to update transaction"})
  }
}

const deleteTransaction = async (req, res) => {
  try {
    const transactionId = req.params.id;
    const transRepo = getRepository(Transaction);

    const transaction = await transRepo
    .createQueryBuilder()
    .delete()
    .from(Transaction)
    .where("id = :id", { id: transactionId })
    .execute();

    if(transaction.affected === 0) {
      return res.status(404).json({message: "No Transaction Found!!!"})
    }
    res.status(200).json({message: "Transaction have been successfuly deleted"})
  } catch (error) {
    console.error("Fail to delete transaction: ", error)
    res.status(500).json({message: "Failed to delete transaction"})
  }
}

const getAllTransactions = async (req, res) => {
  try {
    const transRepo = getRepository(Transaction);

    const transactions = await transRepo.find();
    res.status(200).json(transactions);
  } catch (error) {
    console.error("Failed to get all the transactions", error)
    res.status(500).json({message: "Failed to get all the transactions"})
  }
}



module.exports = { createTransaction, updateTransaction, deleteTransaction, getAllTransactions };


