const express = require('express');
const users = require('./routes/users');
const books = require('./routes/books');
const auth = require('./routes/auth');
const connectDB = require('./config/db');
const app = express();

// connect database
connectDB();

// middleware
app.use(express.json());
app.use('/api/users', users);
app.use('/api/books', books);
app.use('/api/auth', auth);

const port = process.env.PORT || 5000; 
app.listen(port, () => console.log(`Server started on port ${port}`));

