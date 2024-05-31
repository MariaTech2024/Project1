require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const transactionRoutes = require('./routes/transactionRoutes.js');

const app = express();
const port = 3004;

app.use(cors());
app.use(bodyParser.json());

// Use the transaction routes
app.use('/transactions', transactionRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});