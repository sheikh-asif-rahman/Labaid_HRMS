const express = require('express');
const { departmentCreate } = require('../controllers/DepartmentCreateController'); // Ensure proper import

const router = express.Router();

router.post('/department/create', departmentCreate); // Updated endpoint for clarity

module.exports = router;
