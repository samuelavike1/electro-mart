const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        category: {
            type: String,
            required: true,
            trim: true
        },
        price: {
            type: Number,
            required: true,
            min: 0.01
        },
        stock: {
            type: Number,
            required: true,
            min: 0
        },
        sellerName: {
            type: String,
            required: true,
            trim: true
        },
        brand: {
            type: String,
            required: true,
            trim: true
        },
        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        }
    },
    {
        timestamps: true,
        collection: 'products'
    }
);

module.exports = mongoose.model('Product', productSchema);