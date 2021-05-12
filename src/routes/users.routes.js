import { Router } from 'express'
import { createUserValidationArray } from '../libs/createUserValidationArray';
import { isAdmin } from '../middlewares/checkRole';
const { verifyToken } = require('../middlewares/authJwt');
const {checkValidationsInputs} = require('../middlewares/checkValidationsInputs');
const { checkDuplicateUsernameOrEmail, checkIfRoleExists} = require('../middlewares/createUserByAdmin');

const usersController = require('../controllers/users.controller');
const router = Router()

/*********************/  
/**** CREATE USER ****/  
/*********************/
router.post('/',[
    createUserValidationArray,
    checkValidationsInputs,
    verifyToken, 
    isAdmin,
    checkIfRoleExists,
    checkDuplicateUsernameOrEmail 
] , usersController.createUser);

module.exports = router;