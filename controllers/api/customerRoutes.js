const router = require('express').Router();
const { Customer, User, Order, Product } = require('../../models');

//retrieve specific customer data by id and associated user and order information
router.get('/:id', async (req, res) => {
    try {
        const data = await Order.findAll({
            include: [{ model: Product }],
            where: {
                customer_id: req.params.id,
            },
        });
        const orderData = data.map(order => order.get({ plain: true }));
        res.status(200).json(orderData);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;