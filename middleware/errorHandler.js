const ApiError = require('../errors/ApiError');

const errorHandler = (err, req, res, next) => {
    console.error(err);

    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            details: err.details || null
        });
    }

    return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        details: err.message || null
    });
};

module.exports = errorHandler;