const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const { Op } = require('sequelize');

// Helper: Checks if two dates share the same calendar day
const isSameDay = (dateA, dateB) => {
  const a = new Date(dateA);
  const b = new Date(dateB);
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
};

router.post('/Attendance', async (req, res) => {
  const { employeeId, name, type, timestamp } = req.body;

  if (!['dayin', 'dayout'].includes(type)) {
    return res.status(400).json({ message: 'Invalid punch type.' });
  }

  try {
    // Step 1: Get all relevant punches (this type only) for this employee
    const recentPunches = await Attendance.findAll({
      where: {
        employee_id: employeeId,
        [type]: { [Op.not]: null }
      },
      order: [[type, 'DESC']]
    });

    // Step 2: Check if any punch was made today
    const alreadyPunchedToday = recentPunches.some(p => isSameDay(p[type], new Date()));

    if (alreadyPunchedToday) {
      return res.status(409).json({
        message: `You already punched ${type.toUpperCase()} today.`
      });
    }

    // Step 3: Save new punch record (only one field: dayin or dayout)
    const newPunch = await Attendance.create({
      employee_id: employeeId,
      name,
      dayin: type === 'dayin' ? timestamp : null,
      dayout: type === 'dayout' ? timestamp : null
    });

    return res.status(201).json({
      message: `${type.toUpperCase()} recorded successfully.`,
      punch: newPunch
    });

  } catch (err) {
    console.error('Attendance error:', err);
    return res.status(500).json({ message: 'Server error while recording attendance.' });
  }
});

module.exports = router;