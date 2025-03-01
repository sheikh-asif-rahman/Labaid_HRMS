const express = require('express');
const { updatePendingEmployee } = require('../controllers/PendingEmployeeUpdateController');

const router = express.Router();

// Route to approve or reject pending employee
router.post('/updatependingemployee', updatePendingEmployee);

module.exports = router;
