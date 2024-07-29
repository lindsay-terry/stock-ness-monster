const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Customer extends Model {}

Customer.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        company_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        account_manager_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        }, 
    }, {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: 'customer'
    });

module.exports = Customer;