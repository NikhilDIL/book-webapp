const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    bookId: {
        type: String,
        required: true,
        unique: true
    },
    bookImg: {
        type: String
    },
    bookname: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['favorite', 'read', 'not-read']
    }
});

module.exports = mongoose.model('book', bookSchema);