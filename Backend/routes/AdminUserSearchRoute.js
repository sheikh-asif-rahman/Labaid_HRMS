const express = require('express');
const { doUser } = require('../controllers/AdminUserSearchController');

const router = express.Router();

router.post('/adminusersearch', doUser);

module.exports = router;
