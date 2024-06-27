import React, { useState, useEffect } from 'react';
import { getAllTransactions, deleteTransaction } from '../services/api';
import AddTransaction from './AddTransaction';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const data = await getAllTransactions();
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id);
      setTransactions(transactions.filter((trx) => trx.id !== id));
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  // Function to add a new transaction to the list
  const addNewTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
  };

  // Calculate total income and expense
  const totalIncome = transactions
    .filter((trx) => trx.type === 'income')
    .reduce((total, trx) => total + parseFloat(trx.amount), 0);

  const totalExpense = transactions
    .filter((trx) => trx.type === 'expense')
    .reduce((total, trx) => total + parseFloat(trx.amount), 0);

  const totalBalance = totalIncome - totalExpense;

  return (
    <section>
      <div className="form-container">
        <div className="totals-container">
          <div className="total-balance">
            <h5>Total Balance</h5>
            <span>₪{totalBalance.toFixed(2)}</span>
          </div>
          <div className="income-expense-container">
            <div className="income">
              <h5>Income</h5>
              <span>₪{totalIncome.toFixed(2)}</span>
            </div>
            <div className="expense">
              <h5>Expense</h5>
              <span>₪{totalExpense.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <h3>Transactions</h3>
        <ul className="transaction-list">
          {transactions.length === 0 ? (
            <div id="status">No transactions.</div>
          ) : (
            transactions.map(({ id, name, amount, date, type }) => (
              <li key={id}>
                <div className="name">
                  <h4>{name}</h4>
                  <p>{new Date(date).toLocaleDateString()}</p>
                </div>
                <div className={`amount ${type}`}>
                  <span>
                    {type === 'income'
                      ? `+₪${parseFloat(amount).toFixed(2)}`
                      : `-₪${parseFloat(amount).toFixed(2)}`}
                  </span>
                </div>
                <div className="action">
                  <button className="delete-btn" onClick={() => handleDelete(id)}>
                    X
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
        <AddTransaction onAddTransaction={addNewTransaction} />
      </div>
    </section>
  );
};

export default TransactionList;