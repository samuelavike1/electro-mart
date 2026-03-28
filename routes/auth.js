const express = require('express');
const router = express.Router();
const passport = require('../config/passport');
const authController = require('../controllers/auth');

router.get(
    '/login',
    /*  #swagger.ignore = true */
    passport.authenticate('github', { scope: ['user:email'] })
);

router.get(
    '/github/callback',
    /*  #swagger.ignore = true */
    passport.authenticate('github', {
        failureRedirect: '/auth/login-failed'
    }),
    authController.githubCallbackSuccess
);

router.get('/me', authController.getCurrentUser);

router.get('/logout', authController.logout);

router.get(
    '/login-failed',
    /*  #swagger.ignore = true */
    authController.loginFailed
);

module.exports = router;
