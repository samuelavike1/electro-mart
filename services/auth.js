const ApiError = require('../errors/ApiError');

const getCurrentAuthenticatedUser = async (req) => {
    try {
        if (!req.isAuthenticated || !req.isAuthenticated()) {
            throw new ApiError(401, 'Not authenticated');
        }

        return req.user;
    } catch (error) {
        if (error.statusCode) throw error;
        throw new ApiError(500, 'Failed to retrieve authenticated user');
    }
};

const logoutUser = async (req) => {
    try {
        if (!req.isAuthenticated || !req.isAuthenticated()) {
            throw new ApiError(401, 'Not authenticated');
        }

        await new Promise((resolve, reject) => {
            req.logout((logoutError) => {
                if (logoutError) {
                    return reject(logoutError);
                }

                if (!req.session) {
                    return resolve();
                }

                return req.session.destroy((sessionError) => {
                    if (sessionError) {
                        return reject(sessionError);
                    }

                    return resolve();
                });
            });
        });
    } catch (error) {
        if (error.statusCode) throw error;
        throw new ApiError(500, 'Failed to log out current user');
    }
};

module.exports = {
    getCurrentAuthenticatedUser,
    logoutUser
};
