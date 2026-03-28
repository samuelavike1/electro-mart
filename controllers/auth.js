const ApiError = require('../errors/ApiError');
const {
    getCurrentAuthenticatedUser,
    logoutUser
} = require('../services/auth');

const githubCallbackSuccess = (req, res) => {
    res.redirect('/auth/me');
};

const getCurrentUser = async (req, res, next) => {
    /*  #swagger.summary = 'Get current authenticated user'
        #swagger.tags = ['Auth']
        #swagger.security = [{ "cookieAuth": [] }]
        #swagger.responses[200] = { description: 'Current user returned successfully' }
        #swagger.responses[401] = { description: 'Not authenticated' }
    */
    try {
        const user = await getCurrentAuthenticatedUser(req);

        return res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        return next(error);
    }
};

const logout = async (req, res, next) => {
    /*  #swagger.summary = 'Log out current user'
        #swagger.tags = ['Auth']
        #swagger.security = [{ "cookieAuth": [] }]
        #swagger.responses[200] = { description: 'Logged out successfully' }
        #swagger.responses[401] = { description: 'Not authenticated' }
    */
    try {
        await logoutUser(req);

        return res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        });
    } catch (error) {
        return next(error);
    }
};

const loginFailed = (req, res, next) => {
    try {
        throw new ApiError(401, 'GitHub authentication failed');
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    githubCallbackSuccess,
    getCurrentUser,
    logout,
    loginFailed
};
