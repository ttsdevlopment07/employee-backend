const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

// GET all notifications
router.get('/', async (req, res) => {
  try {
    const notifications = await Notification.findAll({ order: [['id', 'DESC']] });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

// POST a new notification
router.post('/', async (req, res) => {
  const { title, message, date } = req.body;
  try {
    const newNotification = await Notification.create({ title, message, date });
    res.status(201).json(newNotification);
  } catch (err) {
    console.error('Notification save error:', err);
    res.status(500).json({ error: 'Failed to add notification' });
  }
});

// DELETE /api/notifications/:id
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Notification.destroy({ where: { id } });
    if (deleted) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Notification not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete notification' });
  }
});


module.exports = router;
//routes/notificationRoutes.js