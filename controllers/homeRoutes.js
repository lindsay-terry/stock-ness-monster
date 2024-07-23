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

                },
                {
                    model: Order,
                },
            ],
        })
        const customerData = data.map(customer => customer.get({ plain: true }));

        res.render('customers', {
            customerData: customerData,
        });
        console.log(customerData);
    } catch (err) {
        res.status(500).json(err);
    };
});

//Route to users page
router.get('/users', async (req, res) => {
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
            userData: userData,
        });
        console.log(userData);
    } catch (error) {
        res.status(500).json(error);
    };
});


module.exports = router;