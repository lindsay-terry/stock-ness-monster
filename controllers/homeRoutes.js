const router = require('express').Router();
const { Customer, User, Order, Product } = require('../models');
const withAuth = require('../utils/auth');

// Route to home page
router.get('/', withAuth, async (req, res) => {
    try {
        res.render('homepage', {
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    };
});

// Route to login page
router.get('/login', async (req, res) => {
    try {
        res.render('login', {
            logged_in: req.session.logged_in,
        })
    } catch (err) {
        res.status(500).json(err);
    };
});

// Route to products page
router.get('/products', withAuth, async (req, res) => {
    try {
        res.render('products', {
            logged_in: req.session.logged_in,
        })
    } catch (err) {
        res.status(500).json(err);
    };
});

// Route to order page
router.get('/orders', withAuth, async (req, res) => {
    try {
        res.render('orders', {
            logged_in: req.session.logged_in,
        })
    } catch (err) {
        res.status(500).json(err);
    };
});

// Route to customers page
router.get('/customers', withAuth, async (req, res) => {
    try {
        //retrieve all customer data as well as associated user, order, and product data
        const data = await Customer.findAll({
            include: [
                {
                    model: User,

                },
                {
                    model: Order,
                },
            ],
        })
        const customerData = data.map(customer => customer.get({ plain: true }));

        res.render('customers', {
            customerData: customerData, logged_in: req.session.logged_in,
        });
        console.log(customerData);
    } catch (err) {
        res.status(500).json(err);
    };
});

//Route to users page
router.get('/users', withAuth, async (req, res) => {
    try {
        const data = await User.findAll({
            include: [
                {
                    model: Customer,
                },
            ],
        })
        const userData = data.map(user => user.get({ plain: true }));
        res.render('users', {
            userData: userData, logged_in: req.session.logged_in,
        });
        console.log(userData);
    } catch (error) {
        res.status(500).json(error);
    };
});


module.exports = router;