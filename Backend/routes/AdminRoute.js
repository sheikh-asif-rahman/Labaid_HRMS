const express = require('express');
const { doAdmin } = require('../controllers/AdminController');

const router = express.Router();

router.post('/administration', doAdmin);

module.exports = router;
