const express = require("express");
const router = express.Router();
const { analyze, getResponses } = require("../controllers/studentController");

router.post("/analyze", analyze);
router.get("/responses/:userId", getResponses);


module.exports = router;