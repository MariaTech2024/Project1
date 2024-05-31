const transactionModel = require('../models/transactionModel.js');

exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await transactionModel.getAllTransactions();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addTransaction = async (req, res) => {
  try {
    const transaction = req.body;
    const newTransaction = await transactionModel.addTransaction(transaction);
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    await transactionModel.deleteTransaction(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};