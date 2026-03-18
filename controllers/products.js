const asyncHandler = require('../middleware/asyncHandler');
const {
    getAllProductsService,
    getSingleProductService,
    createProductService,
    updateProductService,
    deleteProductService
} = require('../services/products');

const getAllProducts = asyncHandler(async (req, res) => {
    /*  #swagger.summary = 'Get all products'
        #swagger.tags = ['Products']
        #swagger.responses[200] = { description: 'Products retrieved successfully' }
        #swagger.responses[500] = { description: 'Server error' }
    */
    const products = await getAllProductsService();
    res.status(200).json(products);
});

const getSingleProduct = asyncHandler(async (req, res) => {
    /*  #swagger.summary = 'Get a single product by id'
        #swagger.tags = ['Products']
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'Product ID',
            required: true,
            type: 'string',
            example: '64f1a2b3c4d5e6f7a8b9c0d1'
        }
        #swagger.responses[200] = { description: 'Product retrieved successfully' }
        #swagger.responses[400] = { description: 'Invalid product id' }
        #swagger.responses[404] = { description: 'Product not found' }
        #swagger.responses[500] = { description: 'Server error' }
    */
    const product = await getSingleProductService(req.params.id);
    res.status(200).json(product);
});

const createProduct = asyncHandler(async (req, res) => {
    /*  #swagger.summary = 'Create a new product'
        #swagger.tags = ['Products']
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        required: ["name", "description", "category", "price", "stock", "sellerName", "brand"],
                        properties: {
                            name:        { type: "string", example: "Wireless Mouse" },
                            description: { type: "string", example: "Ergonomic Bluetooth mouse" },
                            category:    { type: "string", example: "Electronics" },
                            price:       { type: "number", example: 25.99 },
                            stock:       { type: "integer", example: 10 },
                            sellerName:  { type: "string", example: "David Tech Store" },
                            brand:       { type: "string", example: "Logitech" },
                            rating:      { type: "number", example: 4.5 }
                        }
                    }
                }
            }
        }
        #swagger.responses[201] = { description: 'Product created successfully' }
        #swagger.responses[400] = { description: 'Missing or invalid fields' }
        #swagger.responses[500] = { description: 'Server error' }
    */
    const result = await createProductService(req.body);
    res.status(201).json({
        success: true,
        message: 'Product created successfully',
        id: result.insertedId
    });
});

const updateProduct = asyncHandler(async (req, res) => {
    /*  #swagger.summary = 'Update a product'
        #swagger.tags = ['Products']
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'Product ID',
            required: true,
            type: 'string',
            example: '64f1a2b3c4d5e6f7a8b9c0d1'
        }
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        required: ["name", "description", "category", "price", "stock", "sellerName", "brand"],
                        properties: {
                            name:        { type: "string", example: "Wireless Mouse Pro" },
                            description: { type: "string", example: "Updated ergonomic Bluetooth mouse" },
                            category:    { type: "string", example: "Electronics" },
                            price:       { type: "number", example: 30.99 },
                            stock:       { type: "integer", example: 5 },
                            sellerName:  { type: "string", example: "David Tech Store" },
                            brand:       { type: "string", example: "Logitech" },
                            rating:      { type: "number", example: 4.8 }
                        }
                    }
                }
            }
        }
        #swagger.responses[204] = { description: 'Product updated successfully' }
        #swagger.responses[400] = { description: 'Missing or invalid fields' }
        #swagger.responses[404] = { description: 'Product not found' }
        #swagger.responses[500] = { description: 'Server error' }
    */
    await updateProductService(req.params.id, req.body);
    res.status(204).send();
});

const deleteProduct = asyncHandler(async (req, res) => {
    /*  #swagger.summary = 'Delete a product'
        #swagger.tags = ['Products']
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'Product ID',
            required: true,
            type: 'string',
            example: '64f1a2b3c4d5e6f7a8b9c0d1'
        }
        #swagger.responses[200] = { description: 'Product deleted successfully' }
        #swagger.responses[400] = { description: 'Invalid product id' }
        #swagger.responses[404] = { description: 'Product not found' }
        #swagger.responses[500] = { description: 'Server error' }
    */
    await deleteProductService(req.params.id);
    res.status(200).json({
        success: true,
        message: 'Product deleted successfully'
    });
});

module.exports = {
    getAllProducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct
};