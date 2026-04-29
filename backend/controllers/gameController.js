const db = require("../db/database");

exports.saveScore = (req, res) => {
    const { userId, game, score } = req.body;

    db.run(
        "INSERT INTO scores (userId, game, score) VALUES (?, ?, ?)",
        [userId, game, score],
        function (err) {
            if (err) return res.status(500).json(err);

            res.json({ message: "Score saved" });
        }
    );
};

exports.getLeaderboard = (req, res) => {
    db.all(
        "SELECT userId, MAX(score) as bestScore FROM scores GROUP BY userId ORDER BY bestScore DESC",
        [],
        (err, rows) => {
            if (err) return res.status(500).json(err);

            res.json(rows);
        }
    );
};