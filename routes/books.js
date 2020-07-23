const express = require('express');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const Book = require('../models/Book');
const router = express.Router();

// get all books for the current user
router.get('/', auth, async (req, res) => {
    try {
        const books = await Book.find({ user: req.user._id });
        res.json(books);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// add new book to a category
router.post('/', auth, async (req, res) => {
    const { bookId, category, bookname } = req.body;
    try {
        const newBook = new Book({
            user: req.user.id,
            bookId,
            bookname,
            category
        });
        const book = await newBook.save();
        res.json(book);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// update book status
router.put('/:id', auth, async (req, res) => {
    try {
        let book = await Book.findById(req.params.id);
        if (!book) return res.status(400).json({msg: 'book not found'});
        
        if (book.user.toString() !== req.user.id) {
            return res.status(401).json({msg: 'not authorized'});
        }
        book = await Book.findByIdAndUpdate(req.params.id,
            {$set: {category: req.body.category}},
            {new: true});
        res.json(book);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// delete book from profile
router.delete('/:id', auth, async (req, res) => {
    try {
        let book = await Book.findById(req.params.id);
        if (!book) return res.status(400).json({msg: 'book not found'});
        
        if (book.user.toString() !== req.user.id) {
            return res.status(401).json({msg: 'not authorized'});
        }
        await Book.findByIdAndRemove(req.params.id);
        res.json({msg: 'book removed'});
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;