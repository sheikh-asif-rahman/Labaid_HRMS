const express = require('express');
const { employeeCreate } = require('../controllers/EmployeeCreateController');

const router = express.Router();

router.get('/employeecreate', employeeCreate);

module.exports = router;
