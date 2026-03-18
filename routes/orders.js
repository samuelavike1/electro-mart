const express = require('express');
const router = express.Router();

const ordersController = require('../controllers/orders');
const orderValidationRules = require('../validators/orderValidator');
const validate = require('../middleware/validate');

router.get('/', ordersController.getAllOrders);
router.get('/:id', ordersController.getSingleOrder);
router.post('/', orderValidationRules(), validate, ordersController.createOrder);
router.put('/:id', orderValidationRules(), validate, ordersController.updateOrder);
router.delete('/:id', ordersController.deleteOrder);

module.exports = router;