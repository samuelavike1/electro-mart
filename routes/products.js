const express = require('express');
const router = express.Router();

const productsController = require('../controllers/products');
const productValidationRules = require('../validators/productValidator');
const validate = require('../middleware/validate');
const isAuthenticated = require('../middleware/authenticate');

router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getSingleProduct);
router.post('/', isAuthenticated, productValidationRules(), validate, productsController.createProduct);
router.put('/:id', isAuthenticated, productValidationRules(), validate, productsController.updateProduct);
router.delete('/:id', isAuthenticated, productsController.deleteProduct);

module.exports = router;