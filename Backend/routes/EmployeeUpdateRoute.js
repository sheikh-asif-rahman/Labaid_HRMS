const express = require('express');
const { employeeUpdate } = require('../controllers/EmployeeUpdateController');

const router = express.Router();

// Using PUT for updating an existing employee based on userId
router.put('/employee/:userId', employeeUpdate);

module.exports = router;
