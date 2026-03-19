require('dotenv').config();

const options = {
    openapi: '3.0.0',
    language: 'en-US',
    autoHeaders: true,
    autoQuery: true,
    autoBody: true
};

const swaggerAutogen = require('swagger-autogen')(options);

const doc = {
    info: {
        title: 'Online Marketplace API',
        description: 'API for managing products and orders in an online marketplace'
    },
    servers: [
        {
            url: 'https://electro-mart-37rz.onrender.com',
            description: 'Production server'
        },
        {
            url: `http://localhost:${process.env.SERVER_PORT || 3000}`,
            description: 'Local development'
        }
    ]
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);