const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const transactionRoutes = require('./routes/transactionRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api', transactionRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));