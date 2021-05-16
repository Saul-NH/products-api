const router = require('express').Router();
const usersController = require('../controllers/users.controller');

const { createUserValidationArray } = require('../libs/createUserValidationArray');
const { updateUserByIdValidationArray } = require('../libs/updateUserByIdValidationArray');
const { objectIdFormatValidationArray } = require('../libs/objectIdFormatValidationArray');

const { isAdmin } = require('../middlewares/checkRole');
const { verifyToken } = require('../middlewares/authJwt');
const { checkValidationsInputs } = require('../middlewares/checkValidationsInputs');
const { checkDuplicateUsernameOrEmail, checkIfRoleExists } = require('../middlewares/createUserByAdmin');

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

/*********************/  
/***** GET USERS *****/  
/*********************/
router.get('/', [
    verifyToken, 
    isAdmin,
], usersController.getUsers);

/**********************/  
/*** GET USER BY ID ***/  
/**********************/
router.get('/:userId', [
    objectIdFormatValidationArray,
    checkValidationsInputs,
    verifyToken,
    isAdmin
] ,usersController.getUserById);

/*********************/  
/* UPDATE USER BY ID */  
/*********************/
router.put('/:userId', [
    objectIdFormatValidationArray,
    updateUserByIdValidationArray,
    checkValidationsInputs,
    checkIfRoleExists,
    verifyToken,
    isAdmin
] ,usersController.updateUserById);

/*********************/  
/* DELETE USER BY ID */  
/*********************/
router.delete('/:userId', [
    objectIdFormatValidationArray,
    checkValidationsInputs,
    verifyToken,
    isAdmin
] ,usersController.deleteUserById);

module.exports = router;