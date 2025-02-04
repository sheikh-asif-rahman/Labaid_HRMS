const express = require('express');
const { getOverViewOne } = require('../controllers/OverViewOneController');

const router = express.Router();

// Route to fetch user statuses based on devid
router.get('/overViewOne', getOverViewOne);

module.exports = router;
