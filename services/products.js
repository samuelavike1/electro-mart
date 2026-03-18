const { ObjectId } = require('mongodb');
const { db_init } = require('../db');
const ApiError = require('../errors/ApiError');

const getAllProductsService = async () => {
    try {
        const db = await db_init();
        return await db.collection('products').find().toArray();
    } catch (error) {
        throw new ApiError(500, 'Failed to retrieve products');
    }
};

const getSingleProductService = async (id) => {
    if (!ObjectId.isValid(id)) {
        throw new ApiError(400, 'Invalid product id');
    }

    try {
        const db = await db_init();
        const product = await db.collection('products').findOne({ _id: new ObjectId(id) });

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
    const product = {
        name: data.name,
        description: data.description,
        category: data.category,
        price: Number(data.price),
        stock: Number(data.stock),
        sellerName: data.sellerName,
        brand: data.brand,
        rating: data.rating !== undefined ? Number(data.rating) : 0,
        createdAt: new Date()
    };

    try {
        const db = await db_init();
        const result = await db.collection('products').insertOne(product);
        return result;
    } catch (error) {
        throw new ApiError(500, 'Failed to create product');
    }
};

const updateProductService = async (id, data) => {
    if (!ObjectId.isValid(id)) {
        throw new ApiError(400, 'Invalid product id');
    }

    const updatedProduct = {
        name: data.name,
        description: data.description,
        category: data.category,
        price: Number(data.price),
        stock: Number(data.stock),
        sellerName: data.sellerName,
        brand: data.brand,
        rating: data.rating !== undefined ? Number(data.rating) : 0,
        createdAt: data.createdAt ? new Date(data.createdAt) : new Date()
    };

    try {
        const db = await db_init();
        const result = await db.collection('products').replaceOne(
            { _id: new ObjectId(id) },
            updatedProduct
        );

        if (result.matchedCount === 0) {
            throw new ApiError(404, 'Product not found');
        }

        return result;
    } catch (error) {
        if (error.statusCode) throw error;
        throw new ApiError(500, 'Failed to update product');
    }
};

const deleteProductService = async (id) => {
    if (!ObjectId.isValid(id)) {
        throw new ApiError(400, 'Invalid product id');
    }

    try {
        const db = await db_init();
        const result = await db.collection('products').deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            throw new ApiError(404, 'Product not found');
        }

        return result;
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