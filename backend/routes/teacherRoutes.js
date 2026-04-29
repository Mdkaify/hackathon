const express = require("express");
const router = express.Router();
const { getInsights, getStudentsData } = require("../controllers/teacherController");

router.get("/insights", getInsights);
router.get("/students", getStudentsData);


module.exports = router;