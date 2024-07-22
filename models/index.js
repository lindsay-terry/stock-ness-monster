const Customer = require('./Customer');
const Order = require('./Order');
const Product = require('./Product');
const User = require('./User');

Order.hasMany(Product, {
    foreignKey: 'product_id',
});

Customer.hasMany(Order, {
    foreignKey: 'customer_id',
});

// Customer.belongsTo(User, {
//     foreignKey: 'account_manager_id',
// });

User.hasMany(Customer, {
    foreignKey: 'account_manager_id'
});

Customer.belongsTo(User, {
    foreignKey: 'account_manager_id'
});

module.exports = { User, Order, Product, Customer };