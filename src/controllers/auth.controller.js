const User = require('../models/user');
const jwt = require('jsonwebtoken');
const Role = require('../models/role');

 /********************/  
 /*****  SIGN UP *****/  
 /********************/  
const signUp = async(req, res) => {
    try {
        const { username, email, password } = req.body;
    
        const newUser = new User({
            username,
            email,
            password : User.encryptPassword(password)
        });

        const role = await Role.findOne({ name : 'user'})
        newUser.roles = [role._id]
        
        const savedUser = await newUser.save();

        const token = jwt.sign( {id : savedUser._id}, process.env.SECRET_TOKEN, {
            expiresIn : process.env.EXPIRATION_TOKEN
        })

        res.status(200).json({
            ok : true,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : 'Something was wrong'
        })
    }
    
}

 /********************/  
 /***** SIGN IN ******/  
 /********************/ 
const signIn = async(req, res) => {
    try {
        const userFound = await User.findOne({ email: req.body.email}).populate('roles')
    
    if(!userFound){
        return res.status(404).json({
            message : 'User not found'
        });
    }
    
    const matchPassword = User.comparePassword( req.body.password,userFound.password);

    if (!matchPassword) {
        return res.status(400).json({
            message : 'Invalid credentials'
        })
    }

    const token = jwt.sign({id : userFound._id}, process.env.SECRET_TOKEN, {
        expiresIn : process.env.EXPIRATION_TOKEN
    });
    
    res.status(200).json({
        ok : true,
        token
    })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : 'Something was wrong'
        })
    }
    
}

module.exports = {
    signIn,
    signUp
}