const Router = require('express');
const router = new Router();
const productController = require('../controllers/productController');

router.get('/', productController.getAllProducts);
router.get('/:productId', productController.getProduct);

module.exports = router;