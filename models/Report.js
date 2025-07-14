const { DataTypes } = require('sequelize');
const sequelize = require('./mysql');

const Report = sequelize.define('Report', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  date: { type: DataTypes.STRING },
  time: { type: DataTypes.STRING },
  activity: { type: DataTypes.STRING },
  customerFirstName: { type: DataTypes.STRING },
  customerMiddleName: { type: DataTypes.STRING },
  customerLastName: { type: DataTypes.STRING },
  address: { type: DataTypes.TEXT },
  country: { type: DataTypes.STRING },
  state: { type: DataTypes.STRING },
  district: { type: DataTypes.STRING },
  city: { type: DataTypes.STRING },
  pincode: { type: DataTypes.STRING },
  phone: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  product: { type: DataTypes.STRING },
  service: { type: DataTypes.STRING },
  customerReview: { type: DataTypes.TEXT },
  executiveRemark: { type: DataTypes.TEXT },
  employeeId: { type: DataTypes.STRING },
  hrReview: { type: DataTypes.TEXT }
}, {
  timestamps: true
});

Report.sync({ alter: true }); // Ensure the table is created/updated

module.exports = Report;
