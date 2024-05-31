const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController.js');

// Get all transactions
router.get('/', transactionController.getAllTransactions);

// Add a new transaction
router.post('/', transactionController.addTransaction);

// Delete a transaction
router.delete('/:id', transactionController.deleteTransaction);

module.exports = router;