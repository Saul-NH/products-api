const {check } = require('express-validator')
const signUpValidationArray = [
    check('username', 'The username is required').notEmpty(),
    check('email', 'The email is required').notEmpty(),
    check('email', 'It is not a valid email').isEmail(),
    check('password','The password is required').notEmpty(),
    check('password','The password is too short').isLength({min:8})
]
module.exports = {
    signUpValidationArray
}