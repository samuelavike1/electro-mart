const User = require('../models/User');
const ApiError = require('../errors/ApiError');

const syncGitHubUser = async (profile) => {
    try {
        let user = await User.findOne({ githubId: profile.id });

        if (!user) {
            user = await User.create({
                githubId: profile.id,
                username: profile.username,
                displayName: profile.displayName || '',
                profileUrl: profile.profileUrl || '',
                avatarUrl: profile.photos?.[0]?.value || ''
            });
        } else {
            user.username = profile.username || user.username;
            user.displayName = profile.displayName || user.displayName;
            user.profileUrl = profile.profileUrl || user.profileUrl;
            user.avatarUrl = profile.photos?.[0]?.value || user.avatarUrl;
            await user.save();
        }

        return user;
    } catch (error) {
        if (error.statusCode) throw error;
        throw new ApiError(500, 'Failed to synchronize GitHub user');
    }
};

const getUserById = async (id) => {
    try {
        return await User.findById(id);
    } catch (error) {
        if (error.statusCode) throw error;
        throw new ApiError(500, 'Failed to retrieve user');
    }
};

module.exports = {
    syncGitHubUser,
    getUserById
};
