const router = require('express').Router();
const authController = require('../controllers/auth.controller');

const { signUpValidationArray } = require('../utils/signUpValidationArray');
const { signInValidationArray } = require('../utils/signInValidationArray');

const { checkDuplicateUsernameOrEmail } = require('../middlewares/verifySignup');
const {checkValidationsInputs} = require('../middlewares/checkValidationsInputs');


 /*********************/  
 /*****  SIGN-UP  *****/  
 /*********************/
router.post('/signup', [
    signUpValidationArray, 
    checkValidationsInputs,
    checkDuplicateUsernameOrEmail
] ,authController.signUp);

 /*********************/  
 /*****  SIGN-IN  *****/  
 /*********************/
router.post('/signin', [
    signInValidationArray,
    checkValidationsInputs
] ,authController.signIn);


module.exports = router