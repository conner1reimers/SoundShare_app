const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res, next) => {
    try {
        
        const token = req.headers.authorization.split(" ")[1];
        const decoded = await jwt.verify(token, process.env.NEXT_PUBLIC_JWTSECRET);
        req.userData = decoded;
        next(); // IF we did successfully authenticate

    } catch (err) {
        return res.status(401).json({
            message: 'You are unauthorized'
        });
    }
}