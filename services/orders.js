const mongoose = require('mongoose');
const Order = require('../models/Order');
const Product = require('../models/Product');
const ApiError = require('../errors/ApiError');

const getAllOrdersService = async () => {
    try {
        return await Order.find().populate('productId', 'name category price brand');
    } catch (error) {
        throw new ApiError(500, 'Failed to retrieve orders');
    }
};

const getSingleOrderService = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, 'Invalid order id');
    }

    try {
        const order = await Order.findById(id).populate('productId', 'name category price brand');

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
    try {
        const productExists = await Product.findById(data.productId);

        if (!productExists) {
            throw new ApiError(404, 'Referenced product not found');
        }

        return await Order.create({
            productId: data.productId,
            customerName: data.customerName,
            customerEmail: data.customerEmail,
            quantity: Number(data.quantity),
            totalPrice: Number(data.totalPrice),
            status: data.status,
            shippingAddress: data.shippingAddress
        });
    } catch (error) {
        if (error.statusCode) throw error;
        throw new ApiError(500, 'Failed to create order');
    }
};

const updateOrderService = async (id, data) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, 'Invalid order id');
    }

    try {
        const productExists = await Product.findById(data.productId);

        if (!productExists) {
            throw new ApiError(404, 'Referenced product not found');
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            {
                productId: data.productId,
                customerName: data.customerName,
                customerEmail: data.customerEmail,
                quantity: Number(data.quantity),
                totalPrice: Number(data.totalPrice),
                status: data.status,
                shippingAddress: data.shippingAddress
            },
            {
                new: true,
                runValidators: true,
                overwrite: false
            }
        );

        if (!updatedOrder) {
            throw new ApiError(404, 'Order not found');
        }

        return updatedOrder;
    } catch (error) {
        if (error.statusCode) throw error;
        throw new ApiError(500, 'Failed to update order');
    }
};

const deleteOrderService = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, 'Invalid order id');
    }

    try {
        const deletedOrder = await Order.findByIdAndDelete(id);

        if (!deletedOrder) {
            throw new ApiError(404, 'Order not found');
        }

        return deletedOrder;
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