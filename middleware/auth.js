const jwt = require('jsonwebtoken');
const config = require('config');

// verify if user has access to protected route(s)
module.exports = function(req, res, next) {
    const token = req.header('x-auth-token');
    if(!token) {
        return res.status(401).json({msg: 'no token specified. denied access.'});
    }
    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({msg: 'invalid token'});
    }   
}