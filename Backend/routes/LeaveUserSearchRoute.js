const { leaveUserSearch } = require("../controllers/LeaveUserSearchController");
const express = require("express");
const router = express.Router();

router.post("/leaveusersearch", leaveUserSearch);

module.exports = router;
