const express = require('express');
const path = require('path');
const cors = require('cors');

const sequelize = require('./models/mysql');
const employeeRoutes = require('./routes/employeeRoutes');
const taskRoutes = require('./routes/Taskroutes');
const reportRoutes = require('./routes/reportRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

const Attendance = require('./models/Attendance');
const Notification = require('./models/Notification');

const app = express();

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({
  origin: 'http://localhost:3000', // You can change this to your deployed frontend URL
  credentials: true
}));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API routes
app.use('/api/employees', employeeRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/notifications', notificationRoutes);

// Attendance endpoints
app.post('/api/attendance', async (req, res) => {
  const { employeeId, name, type, timestamp } = req.body;

  try {
    if (type === 'dayin') {
      await Attendance.create({
        employee_id: employeeId,
        name,
        dayin: timestamp
      });
      res.json({ success: true });
    } else if (type === 'dayout') {
      const record = await Attendance.findOne({
        where: { employee_id: employeeId, dayout: null },
        order: [['dayin', 'DESC']]
      });
      if (record) {
        record.dayout = timestamp;
        await record.save();
        res.json({ success: true });
      } else {
        res.status(404).json({ error: 'No day-in record found to update' });
      }
    } else {
      res.status(400).json({ error: 'Invalid type' });
    }
  } catch (err) {
    console.error('Attendance error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/attendance', async (req, res) => {
  try {
    const records = await Attendance.findAll({ order: [['dayin', 'DESC']] });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch attendance' });
  }
});

// Start server and connect DB
const PORT = process.env.PORT || 5000;

console.log('🔌 Starting server...');

sequelize.authenticate()
  .then(async () => {
    console.log('✅ Database connected.');

    // Sync models
    await Attendance.sync();
    await Notification.sync();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Unable to connect to the database:', err.message);
    process.exit(1); // Exit to fail the deployment early on DB error
  });
