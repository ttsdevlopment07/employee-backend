const { DataTypes } = require('sequelize');
const sequelize = require('./mysql');

const Attendance = sequelize.define('attendance', {
  employee_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: DataTypes.STRING,
  dayin: DataTypes.DATE,
  dayout: DataTypes.DATE
}, {
  timestamps: false
});

module.exports = Attendance;