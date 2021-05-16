const {check } = require('express-validator')
const updateUserByIdValidationArray = [
    check('username', 'The username is required').notEmpty(),
    check('email', 'The email is required').notEmpty(),
    check('email', 'It is not a valid email').isEmail(),
    check('roles', 'The roles field is required and must be a non-empty array.').isArray().notEmpty()

]
module.exports = {
    updateUserByIdValidationArray
}