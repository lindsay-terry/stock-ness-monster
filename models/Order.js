const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Order extends Model {}

Order.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        isFulfilled: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        content: {
            type: DataTypes.INTEGER,
            references: {
                model: 'product',
                key: 'id',
            },
        },
        customer_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'customer',
                key: 'id',
            },

        },
    },
);

module.exports = Order;