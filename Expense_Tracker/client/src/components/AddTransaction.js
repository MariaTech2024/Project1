import React, { useState } from 'react';
import { addTransaction } from '../services/api';

const AddTransaction = ({ onAddTransaction }) => {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    date: '',
    type: 'expense', // Default to expense
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTransaction = await addTransaction(formData);
      onAddTransaction(newTransaction); // Ensure onAddTransaction is called as a function
      setFormData({ name: '', amount: '', date: '', type: 'expense' });
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  return (
    <section>
      <h3>Add Transaction</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="type">
            <input
              type="checkbox"
              name="type"
              id="type"
              checked={formData.type === 'income'}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.checked ? 'income' : 'expense' })
              }
            />
            <div className="option">
              <span>Expense</span>
              <span>Income</span>
            </div>
          </label>
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            min="0.01"
            step="0.01"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default AddTransaction;