const jwt = require('jsonwebtoken');
const User = require('../models/user');

const verifyToken = async(req, res, next) => { 
    const token = req.headers['x-access-token'];

    if (!token) {
        return res.status(401).json({
            message : 'You are not authenticated'
        })
    }

    try {

        const decoded = jwt.verify(token, process.env.SECRET_TOKEN)
        req.userId = decoded.id;
        const user = await User.findById(req.userId, {password:0});
        if (!user) {
            return res.status(404).json({
                message : 'User not found'
            })
        }

        next()

    } catch (error) {
        console.log(error.name);
        if (error.name === 'TokenExpiredError') {
            return res.status(403).json('Session expired')
        }
        
        return res.status(403).json('Unauthorized')
    }
    
    
}

module.exports = {
    verifyToken,
}