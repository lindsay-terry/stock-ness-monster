const router = require('express').Router();
const userRoutes = require('./userRoutes');
const productRoutes = require('./productRoutes');
const categoryRoutes = require('./categoryRoutes');
const customerRoutes = require('./customerRoutes');
const orderRoutes = require('./orderRoutes');
const availabilityRoutes = require('./availabilityRoutes');

router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/customers', customerRoutes);
router.use('/orders', orderRoutes);
router.use('/availability', availabilityRoutes);

module.exports = router;