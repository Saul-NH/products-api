const User = require("../models/user");

const checkDuplicateUsernameOrEmail = async(req, res, next) => {
    
    const user = await User.findOne({ username : req.body.username})
    if (user) return res.status(400).json({message : 'The user already exists'})
    
    const email = await User.findOne({ email : req.body.email})
    if (email) return res.status(400).json({message : 'The email already exists'})

    next()
}

module.exports = {
    checkDuplicateUsernameOrEmail,
}