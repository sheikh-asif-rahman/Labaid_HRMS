const { leavesave } = require("../controllers/LeaveSaveController");
const express = require("express");
const router = express.Router();

router.post("/leavesave", leavesave);

module.exports = router;
