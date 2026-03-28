const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const { syncGitHubUser, getUserById } = require('../services/users');

const baseUrl =
    process.env.BASE_URL ||
    process.env.RENDER_EXTERNAL_URL ||
    `http://localhost:${process.env.SERVER_PORT || 3000}`;
const callbackUrl = process.env.GITHUB_CALLBACK_URL || `${baseUrl}/auth/github/callback`;

passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: callbackUrl
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const user = await syncGitHubUser(profile);
                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await getUserById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

module.exports = passport;
