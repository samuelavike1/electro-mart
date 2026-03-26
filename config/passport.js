const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/User');

passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: `${`http://localhost:${process.env.SERVER_PORT || 3000}`}/auth/github/callback`
        },
        async (accessToken, refreshToken, profile, done) => {
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
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

module.exports = passport;