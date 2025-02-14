const express = require('express');
const { loadDepartments } = require('../controllers/LoadDeparmentControlller'); // Correct filename and function name

const router = express.Router();

router.get('/loaddepartments', loadDepartments); // Pluralized route for clarity

module.exports = router;
