const express = require('express');
const { getNotification } = require('../controllers/NotificationController');

const router = express.Router();

// Route to fetch user statuses based on devid
router.get('/notification', getNotification);

module.exports = router;
