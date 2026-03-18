const express = require('express');
const router = express.Router();

const productsController = require('../controllers/products');
const productValidationRules = require('../validators/productValidator');
const validate = require('../middleware/validate');

router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getSingleProduct);
router.post('/', productValidationRules(), validate, productsController.createProduct);
router.put('/:id', productValidationRules(), validate, productsController.updateProduct);
router.delete('/:id', productsController.deleteProduct);

module.exports = router;