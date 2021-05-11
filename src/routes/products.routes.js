const router = require('express').Router();
const { verifyToken } = require('../middlewares/authJwt')
const { isModerator, isAdmin } = require('../middlewares/checkRole')
const productsController = require('../controllers/products.controller');


router.get('/', verifyToken , productsController.getProducts);

router.get('/:productId', verifyToken , productsController.getProductById);

router.post('/', [verifyToken, isAdmin] , productsController.createProduct);

router.put('/:productId', [verifyToken, isModerator], productsController.updateProductById);

router.delete('/:productId', [verifyToken, isAdmin], productsController.deleteProductById);

module.exports = router;