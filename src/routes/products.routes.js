const router = require('express').Router();
const { verifyToken, isModerator, isAdmin } = require('../middlewares/authJwt')
const productsController = require('../controllers/products.controller');


router.get('/', productsController.getProducts);

router.post('/', [verifyToken, isAdmin] , productsController.createProduct);

router.get('/:productId', productsController.getProductById);

router.put('/:productId', [verifyToken, isModerator], productsController.upddateProductById);

router.delete('/:productId', [verifyToken, isAdmin], productsController.deleteProductById);

module.exports = router;