const ApiError = require('../errors/ApiError');

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated && req.isAuthenticated()) {
        return next();
    }

    return next(new ApiError(401, 'Authentication required'));
};

module.exports = isAuthenticated;