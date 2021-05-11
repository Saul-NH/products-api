const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const { verifyToken, isAdmin } = require('../middlewares/authJwt');
const { checkIfRoleExists, checkDuplicateUsernameOrEmail } = require('../middlewares/verifySignup');

router.post('/signup', [
    verifyToken,
    isAdmin,
    checkIfRoleExists, 
    checkDuplicateUsernameOrEmail
] ,authController.signUp);


router.post('/signin', authController.signIn);


module.exports = router