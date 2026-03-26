const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({"app":'Online Marketplace API'});
});

router.use('/auth', require('./auth'));
router.use('/products', require('./products'));
router.use('/orders', require('./orders'));

module.exports = router;