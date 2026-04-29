const express = require("express");
const router = express.Router();
const { saveScore, getLeaderboard } = require("../controllers/gameController");

router.post("/save-score", saveScore);
router.get("/leaderboard", getLeaderboard);

module.exports = router;