const User = require('../models/user');
const Role = require('../models/role');


const isModerator = async(req, res, next) => {
    const user = await User.findById(req.userId);
    if (!user) {
        return res.status(404).json('User not found')
    }

    const roles = await Role.find({_id : { $in : user.roles} })
    const hasModeratorRole = roles.find(item => item.name === 'moderator');
    
    if (!hasModeratorRole) {
        return res.status(403).json('Unauthorized');
    }

    next()

}

const isAdmin = async(req, res, next) => {
    const user = await User.findById(req.userId);
    if (!user) {
        return res.status(404).json('User not found')
    }

    const roles = await Role.find({_id : { $in : user.roles} })
    const hasAdminRole = roles.find(item => item.name === 'admin');
    
    if (!hasAdminRole) {
        return res.status(403).json('Unauthorized');
    }

    next()
}

module.exports = {
    isModerator,
    isAdmin
}