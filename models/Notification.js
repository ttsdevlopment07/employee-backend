const { DataTypes } = require('sequelize');
const sequelize = require('./mysql');

const Notification = sequelize.define('Notification', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Notification;
//models/Notification.js