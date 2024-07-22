const router = require('express').Router();
const { Customer, User, Order, Product } = require('../models');

// Route to home page
router.get('/', async (req, res) => {
    try {
        res.render('homepage', {

        });
    } catch (err) {
        res.status(500).json(err);
    };
});

// Route to login page
router.get('/login', async (req, res) => {
    try {
        res.render('login', {

        })
    } catch (err) {
        res.status(500).json(err);
    };
});

// Route to products page
router.get('/products', async (req, res) => {
    try {
        res.render('products', {

        })
    } catch (err) {
        res.status(500).json(err);
    };
});

// Route to order page
router.get('/orders', async (req, res) => {
    try {
        res.render('orders', {

        })
    } catch (err) {
        res.status(500).json(err);
    };
});

// Route to customers page
router.get('/customers', async (req, res) => {
    try {
        //retrieve all customer data as well as associated user, order, and product data
        const data = await Customer.findAll({
            include: [
                {
                    model: User,
                    // model: Order,
                    // model: Product,
                },
            ],
        })
        const customerData = data.map(customer => {
            return { id: customer.id, name: customer.company_name, };
        });

        res.render('customers', {
            customerData,
        });
    } catch (err) {
        res.status(500).json(err);
    };
});


module.exports = router;