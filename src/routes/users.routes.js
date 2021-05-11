import { Router } from 'express'
const usersController = require('../controllers/users.controller');
const { verifyToken, isAdmin } = require('../middlewares/authJwt');
const { checkDuplicateUsernameOrEmail, checkIfRoleExists} = require('../middlewares/verifySignup');


const router = Router()


router.post('/',[
    verifyToken, 
    isAdmin,
    checkIfRoleExists, 
    checkDuplicateUsernameOrEmail
] , usersController.createUser);

module.exports = router;