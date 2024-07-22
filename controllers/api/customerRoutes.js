const router = require('express').Router();
const { Customer, User, Order, Product } = require('../../models');

//retrieve specific customer data by id and associated user and order information
router.get('/:id', async (req, res) => {
    try {
        const customerData = await Customer.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: [
                        'id', 'first_name', 'last_name',
                    ],
                },
                {
                    model: Order,
                    attributes: [
                        'id', 'isFulfilled', 'content',
                    ],
                },
            ],
        });
        const customer = customerData.get({ plain: true });
        res.status(200).json(customer);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;