const express = require('express');
const router = express.Router();

const ordersController = require('../controllers/orders');
const orderValidationRules = require('../validators/orderValidator');
const validate = require('../middleware/validate');
const isAuthenticated = require('../middleware/authenticate');

router.get('/', ordersController.getAllOrders);
router.get('/:id', ordersController.getSingleOrder);
router.post('/', isAuthenticated, orderValidationRules(), validate, ordersController.createOrder);
router.put('/:id', isAuthenticated, orderValidationRules(), validate, ordersController.updateOrder);
router.delete('/:id', isAuthenticated, ordersController.deleteOrder);

module.exports = router;