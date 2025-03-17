const { HolidayCalanderLoad } = require("../controllers/HolidayCalanderLoadController");
const express = require("express");
const router = express.Router();

router.get("/holidaycalanderload",HolidayCalanderLoad );

module.exports = router;
