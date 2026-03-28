const {
    getAllOrdersService,
    getSingleOrderService,
    createOrderService,
    updateOrderService,
    deleteOrderService
} = require('../services/orders');

const getAllOrders = async (req, res, next) => {
    /*  #swagger.summary = 'Get all orders'
        #swagger.tags = ['Orders']
        #swagger.responses[200] = { description: 'Orders retrieved successfully' }
        #swagger.responses[500] = { description: 'Server error' }
    */
    try {
        const orders = await getAllOrdersService();
        return res.status(200).json(orders);
    } catch (error) {
        return next(error);
    }
};

const getSingleOrder = async (req, res, next) => {
    /*  #swagger.summary = 'Get a single order by id'
        #swagger.tags = ['Orders']
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'Order ID',
            required: true,
            type: 'string',
            example: '64f1a2b3c4d5e6f7a8b9c0d1'
        }
        #swagger.responses[200] = { description: 'Order retrieved successfully' }
        #swagger.responses[400] = { description: 'Invalid order id' }
        #swagger.responses[404] = { description: 'Order not found' }
        #swagger.responses[500] = { description: 'Server error' }
    */
    try {
        const order = await getSingleOrderService(req.params.id);
        return res.status(200).json(order);
    } catch (error) {
        return next(error);
    }
};

const createOrder = async (req, res, next) => {
    /*  #swagger.summary = 'Create a new order'
        #swagger.tags = ['Orders']
        #swagger.security = [{ "cookieAuth": [] }]
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        required: ["productId", "customerName", "customerEmail", "quantity", "totalPrice", "status", "shippingAddress"],
                        properties: {
                            productId:       { type: "string", example: "64f1a2b3c4d5e6f7a8b9c0d1" },
                            customerName:    { type: "string", example: "Mary Johnson" },
                            customerEmail:   { type: "string", example: "mary@gmail.com" },
                            quantity:        { type: "integer", example: 2 },
                            totalPrice:      { type: "number", example: 51.98 },
                            status:          { type: "string", example: "Pending" },
                            shippingAddress: { type: "string", example: "Accra, Ghana" }
                        }
                    }
                }
            }
        }
        #swagger.responses[201] = { description: 'Order created successfully' }
        #swagger.responses[401] = { description: 'Authentication required' }
        #swagger.responses[400] = { description: 'Missing or invalid fields' }
        #swagger.responses[404] = { description: 'Referenced product not found' }
        #swagger.responses[500] = { description: 'Server error' }
    */
    try {
        const order = await createOrderService(req.body);
        return res.status(201).json({
            success: true,
            message: 'Order created successfully',
            id: order._id
        });
    } catch (error) {
        return next(error);
    }
};

const updateOrder = async (req, res, next) => {
    /*  #swagger.summary = 'Update an order'
        #swagger.tags = ['Orders']
        #swagger.security = [{ "cookieAuth": [] }]
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'Order ID',
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
                        required: ["productId", "customerName", "customerEmail", "quantity", "totalPrice", "status", "shippingAddress"],
                        properties: {
                            productId:       { type: "string", example: "64f1a2b3c4d5e6f7a8b9c0d1" },
                            customerName:    { type: "string", example: "Mary Johnson" },
                            customerEmail:   { type: "string", example: "mary@gmail.com" },
                            quantity:        { type: "integer", example: 3 },
                            totalPrice:      { type: "number", example: 77.97 },
                            status:          { type: "string", example: "Shipped" },
                            shippingAddress: { type: "string", example: "Kumasi, Ghana" }
                        }
                    }
                }
            }
        }
        #swagger.responses[204] = { description: 'Order updated successfully' }
        #swagger.responses[401] = { description: 'Authentication required' }
        #swagger.responses[400] = { description: 'Missing or invalid fields' }
        #swagger.responses[404] = { description: 'Order or referenced product not found' }
        #swagger.responses[500] = { description: 'Server error' }
    */
    try {
        await updateOrderService(req.params.id, req.body);
        return res.status(204).send();
    } catch (error) {
        return next(error);
    }
};

const deleteOrder = async (req, res, next) => {
    /*  #swagger.summary = 'Delete an order'
        #swagger.tags = ['Orders']
        #swagger.security = [{ "cookieAuth": [] }]
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'Order ID',
            required: true,
            type: 'string',
            example: '64f1a2b3c4d5e6f7a8b9c0d1'
        }
        #swagger.responses[200] = { description: 'Order deleted successfully' }
        #swagger.responses[401] = { description: 'Authentication required' }
        #swagger.responses[400] = { description: 'Invalid order id' }
        #swagger.responses[404] = { description: 'Order not found' }
        #swagger.responses[500] = { description: 'Server error' }
    */
    try {
        await deleteOrderService(req.params.id);
        return res.status(200).json({
            success: true,
            message: 'Order deleted successfully'
        });
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    getAllOrders,
    getSingleOrder,
    createOrder,
    updateOrder,
    deleteOrder
};
