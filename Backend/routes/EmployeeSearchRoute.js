const express = require('express');
const { searchEmployee } = require('../controllers/EmployeeSearchController');

const router = express.Router();

router.get('/searchemployee', searchEmployee);

module.exports = router;
