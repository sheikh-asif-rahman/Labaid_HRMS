const express = require('express');
const { getdepartmentlist } = require('../controllers/DepartmentController');

const router = express.Router();

router.get('/getdepartmentlist', getdepartmentlist);

module.exports = router;
