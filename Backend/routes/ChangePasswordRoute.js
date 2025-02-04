const express = require('express');
const { changePassword } = require('../controllers/ChangePassword');

const router = express.Router();

router.post('/changepassword', changePassword);

module.exports = router;
