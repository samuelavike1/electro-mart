const mongoose = require('mongoose');
const Product = require('../models/Product');
const ApiError = require('../errors/ApiError');

const getAllProductsService = async () => {
    try {
        return await Product.find();
    } catch (error) {
        throw new ApiError(500, 'Failed to retrieve products');
    }
};

const getSingleProductService = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, 'Invalid product id');
    }

    try {
        const product = await Product.findById(id);

        if (!product) {
            throw new ApiError(404, 'Product not found');
        }

        return product;
    } catch (error) {
        if (error.statusCode) throw error;
        throw new ApiError(500, 'Failed to retrieve product');
    }
};

const createProductService = async (data) => {
    try {
        return await Product.create({
            name: data.name,
            description: data.description,
            category: data.category,
            price: Number(data.price),
            stock: Number(data.stock),
            sellerName: data.sellerName,
            brand: data.brand,
            rating: data.rating !== undefined ? Number(data.rating) : 0
        });
    } catch (error) {
        throw new ApiError(500, 'Failed to create product');
    }
};

const updateProductService = async (id, data) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, 'Invalid product id');
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            {
                name: data.name,
                description: data.description,
                category: data.category,
                price: Number(data.price),
                stock: Number(data.stock),
                sellerName: data.sellerName,
                brand: data.brand,
                rating: data.rating !== undefined ? Number(data.rating) : 0
            },
            {
                new: true,
                runValidators: true,
                overwrite: false
            }
        );

        if (!updatedProduct) {
            throw new ApiError(404, 'Product not found');
        }

        return updatedProduct;
    } catch (error) {
        if (error.statusCode) throw error;
        throw new ApiError(500, 'Failed to update product');
    }
};

const deleteProductService = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, 'Invalid product id');
    }

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            throw new ApiError(404, 'Product not found');
        }

        return deletedProduct;
    } catch (error) {
        if (error.statusCode) throw error;
        throw new ApiError(500, 'Failed to delete product');
    }
};

module.exports = {
    getAllProductsService,
    getSingleProductService,
    createProductService,
    updateProductService,
    deleteProductService
};