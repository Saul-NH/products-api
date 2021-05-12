const User = require('../models/user');
const Role = require('../models/role');
const { validationResult } = require('express-validator')

 /*********************/  
 /**** CREATE USER ****/  
 /*********************/  
const createUser = async(req, res) => {   
    const { username, email, password, roles} = req.body;
    
    try {
        const newUser = new User({
            username,
            email,
            password : User.encryptPassword(password)
        });
    
        const foundRoles = await Role.find({ name :{ $in: roles} })
        newUser.roles = foundRoles.map(role => role._id)
    
        await newUser.save()
    
        res.json({
            message : 'User created'
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createUser
}