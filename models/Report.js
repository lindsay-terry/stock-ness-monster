const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Report extends Model {}

Report.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    data: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'report',
  }
);

module.exports = Report;