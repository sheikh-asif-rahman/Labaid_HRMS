const { HolidayCalendarUpdate } = require("../controllers/HolidayCalanderUpdateController");
const express = require("express");
const router = express.Router();

router.post("/holidaycalanderupdate", HolidayCalendarUpdate );

module.exports = router;
