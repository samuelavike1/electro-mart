class ApiError extends Error {
    constructor(statusCode = 500, message = 'Internal Server Error', details = null) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
        this.success = false;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ApiError;