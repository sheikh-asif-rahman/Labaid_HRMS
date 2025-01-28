const express = require('express');
const { getReportLocation } = require('../controllers/ReportLocationController');

const router = express.Router();

// Route to fetch BranchId and BranchName for the given UserId
router.get('/reportLocation', getReportLocation);

module.exports = router;
