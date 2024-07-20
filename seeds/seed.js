const sequelize = require('../config/connection');
const { User, Customer, Order, Product } = require('../models');

const userData = require('./userData.json');
const customerData = require('./customerData.json');
const orderData = require('./orderData.json');
const productData = require('./productData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    console.log('--- Database synced ---');

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });
    console.log('--- Users seeded ---');

    const customers = await Customer.bulkCreate(customerData.map(customer => ({
        ...customer,
        account_manager_id: users[Math.floor(Math.random() * users.length)].id,
    })), {
        individualHooks: true,
        returning: true,
    });
    console.log('--- Customers seeded ---');

    const products = await Product.bulkCreate(productData, {
        individualHooks: true,
        returning: true,
    });
    console.log('--- Products seeded ---');

    const orders = await Order.bulkCreate(orderData.map(order => ({
        ...order,
        customer_id: customers[Math.floor(Math.random() * customers.length)].id,
        content: products[Math.floor(Math.random() * products.length)].id,
    })), {
        individualHooks: true,
        returning: true,
    });
    console.log('--- Orders seeded ---');

    process.exit(0);
};

seedDatabase();