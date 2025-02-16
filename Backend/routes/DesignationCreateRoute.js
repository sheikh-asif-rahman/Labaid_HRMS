const express = require('express');
const { designationCreate } = require('../controllers/DesignationCreateController'); // Ensure proper import

const router = express.Router();

router.post('/designation/create', designationCreate); // Ensure function name matches the controller

module.exports = router;
