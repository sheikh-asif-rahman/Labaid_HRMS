const express = require('express');
const { loadDesignation } = require('../controllers/LoadDesignationCOntroller');

const router = express.Router();

router.get('/loaddesignation', loadDesignation); // Pluralized route for clarity

module.exports = router;
