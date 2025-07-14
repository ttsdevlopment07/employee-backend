const express = require('express');
const router = express.Router();

// const Employee = require('../models/Employee');
const Employee = require('../models/EmployeeSQL');

// Get all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
});

// Add new employee
router.post('/', async (req, res) => {
  try {
    // Remove confirmPassword if present
    const { confirmPassword, ...employeeData } = req.body;
    const newEmp = await Employee.create(employeeData);
    res.status(201).json(newEmp);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update employee
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Employee.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const updatedEmp = await Employee.findOne({ where: { id: req.params.id } });
      res.json(updatedEmp);
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete employee
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Employee.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.json({ message: 'Employee deleted' });
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Employee login route (ID and password only)
router.post('/login', async (req, res) => {
  const { id, password } = req.body;

  try {
    const employee = await Employee.findOne({ where: { id } });

    if (!employee || employee.password !== password) {
      return res.status(401).json({ error: 'Invalid ID or password' });
    }

    // Compose full name for response
    const dbFullName = [employee.firstName, employee.middleName, employee.lastName].filter(Boolean).join(' ').replace(/\s+/g, ' ').trim();

    res.status(200).json({
      message: 'Login successful',
      employee: {
        id: employee.id,
        name: dbFullName,
        email: employee.email,
        designation: employee.designation,
        department: employee.department
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
