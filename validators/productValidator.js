const { body } = require('express-validator');

const productValidationRules = () => {
    return [
        body('name')
            .trim()
            .notEmpty()
            .withMessage('Product name is required.'),

        body('description')
            .trim()
            .notEmpty()
            .withMessage('Description is required.'),

        body('category')
            .trim()
            .notEmpty()
            .withMessage('Category is required.'),

        body('price')
            .notEmpty()
            .withMessage('Price is required.')
            .bail()
            .isFloat({ gt: 0 })
            .withMessage('Price must be a number greater than 0.'),

        body('stock')
            .notEmpty()
            .withMessage('Stock is required.')
            .bail()
            .isInt({ min: 0 })
            .withMessage('Stock must be an integer greater than or equal to 0.'),

        body('sellerName')
            .trim()
            .notEmpty()
            .withMessage('Seller name is required.'),

        body('brand')
            .trim()
            .notEmpty()
            .withMessage('Brand is required.'),

        body('rating')
            .optional()
            .isFloat({ min: 0, max: 5 })
            .withMessage('Rating must be between 0 and 5.')
    ];
};

module.exports = productValidationRules;