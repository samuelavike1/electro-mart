const { body } = require('express-validator');
const mongoose = require('mongoose');

const orderValidationRules = () => {
    return [
        body('productId')
            .trim()
            .notEmpty()
            .withMessage('Product ID is required.')
            .bail()
            .custom((value) => mongoose.Types.ObjectId.isValid(value))
            .withMessage('Product ID must be a valid MongoDB ObjectId.'),

        body('customerName')
            .trim()
            .notEmpty()
            .withMessage('Customer name is required.'),

        body('customerEmail')
            .trim()
            .notEmpty()
            .withMessage('Customer email is required.')
            .bail()
            .isEmail()
            .withMessage('Customer email must be valid.'),

        body('quantity')
            .notEmpty()
            .withMessage('Quantity is required.')
            .bail()
            .isInt({ gt: 0 })
            .withMessage('Quantity must be an integer greater than 0.'),

        body('totalPrice')
            .notEmpty()
            .withMessage('Total price is required.')
            .bail()
            .isFloat({ gt: 0 })
            .withMessage('Total price must be a number greater than 0.'),

        body('status')
            .trim()
            .notEmpty()
            .withMessage('Status is required.')
            .bail()
            .isIn(['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'])
            .withMessage('Status must be one of: Pending, Processing, Shipped, Delivered, Cancelled.'),

        body('shippingAddress')
            .trim()
            .notEmpty()
            .withMessage('Shipping address is required.')
    ];
};

module.exports = orderValidationRules;