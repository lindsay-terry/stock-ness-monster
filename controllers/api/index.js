const router = require('express').Router();
const userRoutes = require('./userRoutes');
const productRoutes = require('./productRoutes');
const customerRoutes = require('./customerRoutes');

router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/customers', customerRoutes);

module.exports = router;