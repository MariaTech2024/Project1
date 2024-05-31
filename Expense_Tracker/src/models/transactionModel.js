const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

exports.getAllTransactions = async () => {
  const result = await pool.query('SELECT * FROM transactions');
  return result.rows;
};

exports.addTransaction = async (transaction) => {
  const { name, amount, date, type } = transaction;
  const result = await pool.query(
    'INSERT INTO transactions (name, amount, date, type) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, amount, date, type]
  );
  return result.rows[0];
};

exports.deleteTransaction = async (id) => {
  await pool.query('DELETE FROM transactions WHERE id = $1', [id]);
};