const express = require('express');
const { leaveusersearch } = require('../controllers/LeaveUserSearchController');

const router = express.Router();

router.get('/leaveusersearch', leaveusersearch);

module.exports = router;
