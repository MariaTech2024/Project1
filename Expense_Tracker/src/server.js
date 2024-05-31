const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const transactionRoutes = require('./routes/transactionRoutes.js');
const path = require('path');

const app = express();
const port = 3004;

app.use(cors());
app.use(bodyParser.json());

// Use the transaction routes
app.use('/transactions', transactionRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


app.use(express.static(path.join(__dirname, "/public/build")));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public/build", "index.html"));
});