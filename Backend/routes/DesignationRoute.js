const express = require('express');
const { getdesignationlist } = require('../controllers/DesignationController');

const router = express.Router();

router.get('/getdesignationlist', getdesignationlist);

module.exports = router;
