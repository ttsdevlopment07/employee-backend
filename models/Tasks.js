const { DataTypes } = require('sequelize');
const sequelize = require('./mysql');

const Tasks = sequelize.define('Tasks', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  employeeName: { type: DataTypes.STRING, allowNull: false },
  employeeId: { type: DataTypes.STRING, allowNull: false }, // string for mixed values
  description: { type: DataTypes.STRING, allowNull: false },
  fileName: { type: DataTypes.STRING },
  submissionDate: { type: DataTypes.DATE },
  status: { type: DataTypes.STRING, defaultValue: 'pending' }
}, {
  timestamps: true
});

module.exports = { Tasks };
