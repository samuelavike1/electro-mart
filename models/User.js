const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        githubId: {
            type: String,
            required: true,
            unique: true
        },
        username: {
            type: String,
            required: true,
            trim: true
        },
        displayName: {
            type: String,
            trim: true,
            default: ''
        },
        profileUrl: {
            type: String,
            trim: true,
            default: ''
        },
        avatarUrl: {
            type: String,
            trim: true,
            default: ''
        }
    },
    {
        timestamps: true,
        versionKey: false,
        collection: 'users'
    }
);

module.exports = mongoose.model('User', userSchema);