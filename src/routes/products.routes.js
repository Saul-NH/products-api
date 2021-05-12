const router = require('express').Router();

const { verifyToken } = require('../middlewares/authJwt')
const { isModerator, isAdmin } = require('../middlewares/checkRole')

const productsController = require('../controllers/products.controller');

/********************/  
/*** GET-PRODUCTS ***/  
/********************/ 
router.get('/', verifyToken , productsController.getProducts);

/*********************/  
/* GET-PRODUCT-BY-ID */  
/*********************/
router.get('/:productId', verifyToken , productsController.getProductById);

/********************/  
/** CREATE-PRODUCT **/  
/********************/ 
router.post('/', [verifyToken, isAdmin] , productsController.createProduct);

/************************/  
/* UPDATE-PRODUCT-BY-ID */  
/************************/
router.put('/:productId', [verifyToken, isModerator], productsController.updateProductById);

/************************/  
/* DELETE-PRODUCT-BY-ID */  
/************************/
router.delete('/:productId', [verifyToken, isAdmin], productsController.deleteProductById);

module.exports = router;