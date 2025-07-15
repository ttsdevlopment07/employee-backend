const sequelize = require('./models/mysql');

// Import all models
const Employee = require('./models/EmployeeSQL');
const Attendance = require('./models/Attendance');
const Task = require('./models/Tasks');
const Notification = require('./models/Notification');
const Report = require('./models/Report');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL connection established.');

    // Sync all tables
    await sequelize.sync({ alter: true });
    console.log('All tables synced.');

    process.exit(0);
  } catch (err) {
    console.error('Error syncing database:', err);
    process.exit(1);
  }
})();
