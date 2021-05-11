const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const { checkInputsSignIn } = require('../middlewares/verifySignin');
const { checkDuplicateUsernameOrEmail, checkInputsSignUp } = require('../middlewares/verifySignup');

router.post('/signup', [ 
    checkInputsSignUp,
    checkDuplicateUsernameOrEmail
] ,authController.signUp);


router.post('/signin', checkInputsSignIn ,authController.signIn);


module.exports = router