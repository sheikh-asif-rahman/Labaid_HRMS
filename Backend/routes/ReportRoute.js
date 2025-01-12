const express = require('express');
const { getReportData } = require('../controllers/ReportController');

const router = express.Router();

router.post('/report', getReportData);

module.exports = router;
