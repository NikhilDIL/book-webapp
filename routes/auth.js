const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const User = require('../models/User');
const router = express.Router();

// get the logged in user
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


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

// update user info
router.put('/:id', auth, async (req, res) => {
    const { email, password } = req.body;
    let data = {};
    try {
        let userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400).json({ msg: 'User already exists'});
            return;
        }
        if (email) {
            data.email = email;
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            data.password = hashedPassword;
        }
        const user = await User.findByIdAndUpdate(req.params.id,
            {$set: data},
            {new: true});
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;