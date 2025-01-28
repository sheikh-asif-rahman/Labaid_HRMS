const express = require('express');
const { getUsers } = require('../controllers/UserController');

const router = express.Router();

// Endpoint to fetch users based on ugid
router.get('/users', getUsers);

module.exports = router;
