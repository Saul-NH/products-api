const User = require('../models/user');
const Role = require('../models/role');

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

/*********************/  
/***** GET USERS *****/  
/*********************/
const getUsers = async(req, res) => {
    const users = await User.find({}).populate('roles')
    
    res.json({
        users
    })
}

/**********************/  
/*** GET USER BY ID ***/  
/**********************/
const getUserById = async(req, res) => {
    try {
        const userFound = await User.findById(req.params.userId);
        if (!userFound) {
            return res.status(404).json({
                ok : false,
                message : 'User not found'
            });
        }

        return res.status(200).json({
            ok : true,
            user : userFound
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json('Something was wrong')
    }

}

/*********************/  
/* UPDATE USER BY ID */  
/*********************/
const updateUserById = async(req, res) => {    
    try {
        req.body.roles = await Role.find({ name :{ $in: req.body.roles} })
        
        const user = await User.findByIdAndUpdate(
            req.params.userId, 
            req.body, 
            {new :true})
            .populate('roles');
        
        if (!user) {
            return res.status(404).json({
                message : 'User not found'
            })
        }

        res.json({
            user
        })

    } catch (error) {

        //Will be refactorized into an errorHandler
        if (error.codeName === "DuplicateKey" && error.keyPattern.username === 1) {
            res.status(400).json({
                message : 'This username is not available to use'
            })
        } else if (error.codeName === "DuplicateKey" && error.keyPattern.email === 1) {
                res.status(400).json({
                    message : 'This email is not available to use'
                })
            }
        console.log(error)
    }
}

/*********************/  
/* DELETE USER BY ID */  
/*********************/
const deleteUserById = async(req, res) => {
    try {
        const userDeleted = await User.findByIdAndDelete(req.params.userId)
        if(!userDeleted){
            return res.status(404).json({
                message : 'User not found'
            })
        }

        res.json({
            message : 'User deleted successfully'
        })
    } catch (error) {
        
        res.status(500).json({
            message : 'Something was wrong'
        })
    }
}

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUserById,
    deleteUserById
}