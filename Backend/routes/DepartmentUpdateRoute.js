const express = require('express');
const { departmentUpdate } = require('../controllers/DepartmentUpdateController');

const router = express.Router();

router.put('/department/update', departmentUpdate);

module.exports = router;
