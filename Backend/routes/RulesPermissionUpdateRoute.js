const express = require('express');
const { rulesPermissionEmployeeUpdate } = require('../controllers/RulesPermissionUpdateController');

const router = express.Router();

router.post('/rulespermissionemployeeupdate', rulesPermissionEmployeeUpdate);

module.exports = router;
