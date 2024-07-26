const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class OrderProduct extends Model {}

OrderProduct.init({
    order_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'order',
            key: 'id',
        },
        allowNull: false,
    },
    product_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'product',
            key: 'id',
        },
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
}, {
    sequelize,
    modelName: 'orderProduct',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
});

module.exports = OrderProduct;