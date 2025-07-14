const express = require('express');
const router = express.Router();
const Report = require('../models/Report');

// Create a new report
router.post('/', async (req, res) => {
  try {
    const report = await Report.create(req.body);
    res.status(201).json(report);
  } catch (err) {
    console.error('Error creating report:', err);
    res.status(400).json({ error: err.message });
  }
});

// Get all reports
router.get('/', async (req, res) => {
  try {
    const reports = await Report.findAll({ order: [['createdAt', 'DESC']] });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reports' });
  }
});

// Update HR review for a report
router.patch('/:id', async (req, res) => {
  try {
    const { hrReview } = req.body;
    const [updated] = await Report.update({ hrReview }, { where: { id: req.params.id } });
    if (updated) {
      const updatedReport = await Report.findOne({ where: { id: req.params.id } });
      res.json(updatedReport);
    } else {
      res.status(404).json({ error: 'Report not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
