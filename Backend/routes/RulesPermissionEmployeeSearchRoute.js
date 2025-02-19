const express = require('express');
const { rulesPermissionEmployeeSearch } = require('../controllers/RulesPermissionEmployeeSearchController');

const router = express.Router();

router.get('/rulespermissionemployeesearch', rulesPermissionEmployeeSearch);

module.exports = router;
