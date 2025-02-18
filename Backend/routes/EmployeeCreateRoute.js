const express = require('express');
const { employeeCreate } = require('../controllers/EmployeeCreateController');

const router = express.Router();

router.post('/employeecreate', employeeCreate);

module.exports = router;
