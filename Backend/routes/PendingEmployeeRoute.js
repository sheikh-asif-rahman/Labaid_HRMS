const express = require('express');
const { getPendingEmployee } = require('../controllers/PendingEmployeeController');

const router = express.Router();

// Route to fetch BranchId and BranchName for the given UserId
router.get('/pendingemployee', getPendingEmployee);

module.exports = router;
