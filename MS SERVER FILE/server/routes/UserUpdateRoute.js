const express = require('express');
const { updateUser } = require('../controllers/UserUpdateController');

const router = express.Router();

// Ensure the route uses PUT
router.put('/updateuser', updateUser);

module.exports = router;
