const express = require('express');
const { getLocations } = require('../controllers/LocationController');

const router = express.Router();

router.get('/locations', getLocations);

module.exports = router;
