const express = require('express');
const users = require('./routes/users');
const books = require('./routes/books');
const auth = require('./routes/auth');
const googleapi = require('./routes/googleapi');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();

// connect database
connectDB();

// middleware
app.use(express.json());
app.use(cors());
app.use('/api/users', users);
app.use('/api/books', books);
app.use('/api/auth', auth);
app.use('/api/googleapi', googleapi);

const port = process.env.PORT || 5000; 
const server = app.listen(port, () => console.log(`Server started on port ${port}`));
server.setTimeout(50000);

module.exports = server;
