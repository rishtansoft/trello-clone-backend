const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRotes');
const boardRoutes = require('./routes/boardRoute');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/boards', boardRoutes);

module.exports = app;