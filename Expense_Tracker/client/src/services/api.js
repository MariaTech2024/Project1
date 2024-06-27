import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Adjust the URL based on your server setup

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAllTransactions = async () => {
  try {
    const response = await api.get('/transactions');
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};

export const addTransaction = async (transaction) => {
  try {
    const response = await api.post('/transactions', transaction);
    return response.data;
  } catch (error) {
    console.error('Error adding transaction:', error);
    throw error;
  }
};

export const deleteTransaction = async (id) => {
  try {
    await api.delete(`/transactions/${id}`);
  } catch (error) {
    console.error('Error deleting transaction:', error);
    throw error;
  }
};