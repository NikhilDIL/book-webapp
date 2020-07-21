const express = require('express');
const request = require('request');
const router = express.Router();

// search query
router.get('/:query/:index', async (req, res) => {
    request(`https://www.googleapis.com/books/v1/volumes?q=${req.params.query}&startIndex=${req.params.index}&maxResults=40&key=${process.env.apikey}`,
     (err, response, body) => {
         res.json(body);
     });
});

// get book info
router.get('/:id', async (req, res) => {
    request(`https://www.googleapis.com/books/v1/volumes/${req.params.id}?key=${process.env.apikey}`,
     (err, response, body) => {
         res.json(body);
     });
});

module.exports = router;