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
        customer_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'customer',
                key: 'id',
            },

        },
    }, {
        sequelize,
        modelName: 'order',
        freezeTableName: true,
        timestamps: false,
        underscored: true,
    });

module.exports = Order;