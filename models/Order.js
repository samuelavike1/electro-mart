const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        customerName: {
            type: String,
            required: true,
            trim: true
        },
        customerEmail: {
            type: String,
            required: true,
            trim: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        totalPrice: {
            type: Number,
            required: true,
            min: 0.01
        },
        status: {
            type: String,
            required: true,
            enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']
        },
        shippingAddress: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        timestamps: true,
        collection: 'orders'
    }
);

module.exports = mongoose.model('Order', orderSchema);