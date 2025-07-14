const { DataTypes } = require('sequelize');
const sequelize = require('./mysql');

const Employee = sequelize.define('Employee', {
  profile: { type: DataTypes.TEXT('long') }, // Use LONGTEXT for large images
  firstName: { type: DataTypes.STRING, allowNull: false },
  middleName: { type: DataTypes.STRING },
  lastName: { type: DataTypes.STRING, allowNull: false },
  id: { type: DataTypes.STRING, allowNull: false, unique: true, primaryKey: true },
  email: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  designation: { type: DataTypes.STRING, allowNull: false },
  department: { type: DataTypes.STRING, allowNull: false },
  dob: { type: DataTypes.STRING, allowNull: false },
  doj: { type: DataTypes.STRING, allowNull: false },
  dol: { type: DataTypes.STRING },
  presentAddress: { type: DataTypes.TEXT, allowNull: false },
  permanentAddress: { type: DataTypes.TEXT, allowNull: false },
  aadhar: { type: DataTypes.STRING, allowNull: false },
  pan: { type: DataTypes.STRING, allowNull: false },
  bankName: { type: DataTypes.STRING, allowNull: false },
  accNo: { type: DataTypes.STRING, allowNull: false },
  ifsc: { type: DataTypes.STRING, allowNull: false },
  branch: { type: DataTypes.STRING, allowNull: false },
  gender: { type: DataTypes.STRING, allowNull: false },
  lastEducation: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  problem: { type: DataTypes.TEXT } // Added employee problem field
}, {
  timestamps: true
});

Employee.sync({ alter: true }); // This will update the table to match the model

module.exports = Employee;
