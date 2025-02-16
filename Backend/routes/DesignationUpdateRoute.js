const express = require('express');
const { designationUpdate } = require('../controllers/DesignationUpdateController');

const router = express.Router();

router.put('/designation/update', designationUpdate);

module.exports = router;
