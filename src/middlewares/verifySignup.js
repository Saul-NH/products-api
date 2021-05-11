const Role = require("../models/role");
const User = require("../models/user");

const checkDuplicateUsernameOrEmail = async(req, res, next) => {
    
    const user = await User.findOne({ username : req.body.username})
    if (user) return res.status(400).json({message : 'The user already exists'})
    
    const email = await User.findOne({ email : req.body.email})
    if (email) return res.status(400).json({message : 'The email already exists'})

    next()
}

const checkIfRoleExists = async(req, res, next) => {
    const roles = await Role.find();
    const rolesArray = roles.map(role => role.name)

    if (req.body.roles) {
        for(let i=0; i<req.body.roles.length; i++){
            if (!rolesArray.includes(req.body.roles[i])) {
                return res.status(400).json({
                    message : `Role ${req.body.roles[i]} does not exists`
                })
            }
        }
    }else{
        
        return res.json({message : 'The role is necesary'});
    }

    next();
}

const checkInputsSignUp = (req, res, next) => {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({
            ok : false,
            message : 'You need username, email and password'
        })
    }
    next()
}

module.exports = {
    checkDuplicateUsernameOrEmail,
    checkIfRoleExists,
    checkInputsSignUp
}