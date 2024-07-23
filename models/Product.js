const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Product extends Model {}

Product.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    item_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,  // Ensure category_id is not nullable
        references: {
            model: 'category',
            key: 'id',
        }
    }
}, {
    sequelize,
    modelName: 'product',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
});

module.exports = Product;

