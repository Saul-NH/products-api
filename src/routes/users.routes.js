import { Router } from 'express'
import { isAdmin } from '../middlewares/checkRole';
const { verifyToken } = require('../middlewares/authJwt');
const { checkDuplicateUsernameOrEmail, checkIfRoleExists, checkInputs} = require('../middlewares/createUserByAdmin');
const usersController = require('../controllers/users.controller');

const router = Router()


router.post('/',[
    verifyToken, 
    isAdmin,
    checkInputs,
    checkIfRoleExists, 
    checkDuplicateUsernameOrEmail
] , usersController.createUser);

module.exports = router;