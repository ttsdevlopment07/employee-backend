// Run this file once to sync your MySQL database and create the Employee table
const sequelize = require('./models/mysql');
const Employee = require('./models/EmployeeSQL');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL connection established.');
    await Employee.sync({ alter: true });
    console.log('Employee table synced.');
    process.exit(0);
  } catch (err) {
    console.error('Error syncing database:', err);
    process.exit(1);
  }
})();
