const express = require('express');
const router = express.Router();
const passport = require('../config/passport');

router.get(
    '/github',
    /*  #swagger.ignore = true */
    passport.authenticate('github', { scope: ['user:email'] })
);

router.get(
    '/github/callback',
    /*  #swagger.ignore = true */
    passport.authenticate('github', {
        failureRedirect: '/auth/login-failed'
    }),
    (req, res) => {
        res.redirect('/auth/me');
    }
);

router.get('/me', (req, res) => {
    /*  #swagger.summary = 'Get current authenticated user'
        #swagger.tags = ['Auth']
        #swagger.responses[200] = { description: 'Current user returned successfully' }
        #swagger.responses[401] = { description: 'Not authenticated' }
    */
    if (!req.isAuthenticated || !req.isAuthenticated()) {
        return res.status(401).json({
            success: false,
            message: 'Not authenticated'
        });
    }

    return res.status(200).json({
        success: true,
        user: req.user
    });
});

router.get('/logout', (req, res, next) => {
    /*  #swagger.summary = 'Log out current user'
        #swagger.tags = ['Auth']
        #swagger.responses[200] = { description: 'Logged out successfully' }
    */
    req.logout((err) => {
        if (err) {
            return next(err);
        }

        req.session.destroy(() => {
            res.status(200).json({
                success: true,
                message: 'Logged out successfully'
            });
        });
    });
});

router.get(
    '/login-failed',
    /*  #swagger.ignore = true */
    (req, res) => {
        res.status(401).json({
            success: false,
            message: 'GitHub authentication failed'
        });
    }
);

module.exports = router;
