const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const User = require('../models/User');
const router = express.Router();


// user login
router.post('/', [
    check('email', 'Please include valid email').isEmail(),
    check('password', 'Please enter a password').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({mst: 'invalid credentials'});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({msg: 'invalid credentials'});
        }
        const token = jwt.sign({id: user._id}, process.env.book_jwtPrivateKey);
        res.json(token);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



module.exports = router;