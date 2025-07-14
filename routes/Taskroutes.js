const express = require('express');
const router = express.Router();
const { Tasks } = require('../models/Tasks');

// Get all tasks, or filter by employeeId
router.get('/', async (req, res) => {
  try {
    const { employeeId } = req.query;
    let tasks;
    if (employeeId) {
      tasks = await Tasks.findAll({ where: { employeeId } });
    } else {
      tasks = await Tasks.findAll();
    }
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});


// File upload support
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    // Use original name, but you can customize
    cb(null, file.originalname);
  }
});
const upload = multer({ storage });

// Create a new task with file upload
router.post('/', upload.single('file'), async (req, res) => {
  try {
    let fileName = '';
    if (req.file) fileName = req.file.filename;
    const { employeeName, employeeId, description, status } = req.body;
    // Debug log for troubleshooting
    console.log('Received new task:', { employeeName, employeeId, description, fileName, status });
    if (!employeeName || !employeeId || !description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const newTask = await Tasks.create({
      employeeName,
      employeeId,
      description,
      fileName,
      status: status || 'pending'
    });
    res.status(201).json(newTask);
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(400).json({ error: err.message });
  }
});

// Update a task (e.g., mark as submitted)
router.patch('/:id/submit', async (req, res) => {
  try {
    const [updated] = await Tasks.update(
      { status: 'submitted', submissionDate: new Date() },
      { where: { id: req.params.id } }
    );
    if (updated) {
      const updatedTask = await Tasks.findOne({ where: { id: req.params.id } });
      res.json(updatedTask);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Tasks.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.json({ message: 'Task deleted' });
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
