const User = require('../models/user');
const jwt = require('jsonwebtoken');
const Role = require('../models/role');

 /********************/  
 /*****  SIGN UP *****/  
 /********************/  
const signUp = async(req, res) => {
    const { username, email, password, roles} = req.body;
    
    const newUser = new User({
        username,
        email,
        password : User.encryptPassword(password)
    });

    if(roles){
        const foundRoles = await Role.find({ name :{ $in: roles} })
        newUser.roles = foundRoles.map(role => role._id)
    }else{
        const role = await Role.findOne({ name : 'user'})
        newUser.roles = [role._id]
    }

    const savedUser = await newUser.save();

    const token = jwt.sign( {id : savedUser._id}, process.env.SECRET_TOKEN, {
        expiresIn : process.env.EXPIRATION_TOKEN
    })

    res.json({
        message : "Sign-Up",
        token
    })
}

 /********************/  
 /***** SIGN IN ******/  
 /********************/ 
const signIn = async(req, res) => {
    
    const userFound = await User.findOne({ email: req.body.email}).populate('roles')
    if(!userFound){
        return res.status(404).json({
            message : 'User not found'
        });
    }
    
    const matchPassword = User.comparePassword( req.body.password,userFound.password);

    if (!matchPassword) {
        return res.status(400).json({
            token : null,
            message : 'Invalid credentials'
        })
    }

    const token = jwt.sign({id : userFound._id}, process.env.SECRET_TOKEN, {
        expiresIn : process.env.EXPIRATION_TOKEN
    });
    
    res.json({
        token
    })
}

module.exports = {
    signIn,
    signUp
}