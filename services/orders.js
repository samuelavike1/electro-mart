const { ObjectId } = require('mongodb');
const { db_init } = require('../db');
const ApiError = require('../errors/ApiError');

const getAllOrdersService = async () => {
    try {
        const db = await db_init();
        return await db.collection('orders').find().toArray();
    } catch (error) {
        throw new ApiError(500, 'Failed to retrieve orders');
    }
};

const getSingleOrderService = async (id) => {
    if (!ObjectId.isValid(id)) {
        throw new ApiError(400, 'Invalid order id');
    }

    try {
        const db = await db_init();
        const order = await db.collection('orders').findOne({ _id: new ObjectId(id) });

        if (!order) {
            throw new ApiError(404, 'Order not found');
        }

        return order;
    } catch (error) {
        if (error.statusCode) throw error;
        throw new ApiError(500, 'Failed to retrieve order');
    }
};

const createOrderService = async (data) => {
    const order = {
        productId: data.productId,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        quantity: Number(data.quantity),
        totalPrice: Number(data.totalPrice),
        status: data.status,
        shippingAddress: data.shippingAddress,
        orderDate: new Date()
    };

    try {
        const db = await db_init();
        const result = await db.collection('orders').insertOne(order);
        return result;
    } catch (error) {
        throw new ApiError(500, 'Failed to create order');
    }
};

const updateOrderService = async (id, data) => {
    if (!ObjectId.isValid(id)) {
        throw new ApiError(400, 'Invalid order id');
    }

    const updatedOrder = {
        productId: data.productId,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        quantity: Number(data.quantity),
        totalPrice: Number(data.totalPrice),
        status: data.status,
        shippingAddress: data.shippingAddress,
        orderDate: data.orderDate ? new Date(data.orderDate) : new Date()
    };

    try {
        const db = await db_init();
        const result = await db.collection('orders').replaceOne(
            { _id: new ObjectId(id) },
            updatedOrder
        );

        if (result.matchedCount === 0) {
            throw new ApiError(404, 'Order not found');
        }

        return result;
    } catch (error) {
        if (error.statusCode) throw error;
        throw new ApiError(500, 'Failed to update order');
    }
};

const deleteOrderService = async (id) => {
    if (!ObjectId.isValid(id)) {
        throw new ApiError(400, 'Invalid order id');
    }

    try {
        const db = await db_init();
        const result = await db.collection('orders').deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            throw new ApiError(404, 'Order not found');
        }

        return result;
    } catch (error) {
        if (error.statusCode) throw error;
        throw new ApiError(500, 'Failed to delete order');
    }
};

module.exports = {
    getAllOrdersService,
    getSingleOrderService,
    createOrderService,
    updateOrderService,
    deleteOrderService
};