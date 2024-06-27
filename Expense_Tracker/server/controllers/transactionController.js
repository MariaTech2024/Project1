const db = require('../config/db');

exports.getAllTransactions = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM transactions');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.addTransaction = async (req, res) => {
  const { name, amount, date, type } = req.body;
  const values = [name, amount, date, type];
  const query = 'INSERT INTO transactions (name, amount, date, type) VALUES ($1, $2, $3, $4) RETURNING *';

  try {
    const { rows } = await db.query(query, values);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.deleteTransaction = async (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM transactions WHERE id = $1';

  try {
    await db.query(query, [id]);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};