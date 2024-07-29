const Customer = require('./Customer');
const Order = require('./Order');
const Product = require('./Product');
const User = require('./User');
const Category = require('./category');
const Report = require('./Report'); 
const OrderProduct = require('./OrderProduct');

//Order and Product
Order.belongsToMany(Product, {
    through: OrderProduct,
    foreignKey: 'order_id',
});

Product.belongsToMany(Order, {
    through: OrderProduct,
    foreignKey: 'product_id',
});

//Customer and Order
Customer.hasMany(Order, {
    foreignKey: 'customer_id',
});

Order.belongsTo(Customer, {
    foreignKey: 'customer_id',
});

// User and Customer
User.hasMany(Customer, {
    foreignKey: 'account_manager_id',
});

Customer.belongsTo(User, {
    foreignKey: 'account_manager_id',
});

// Category and Product

Category.hasMany(Product, {
    foreignKey: 'category_id',
    onDelete: 'CASCADE',
});

Product.belongsTo(Category, {
    foreignKey: 'category_id',
});

module.exports = { User, Order, Product, Customer, Category, Report, OrderProduct };