const db = require("../db/database");
const { analyzeResponse } = require("../utils/analyzer");

exports.analyze = (req, res) => {
    const { userId, input } = req.body;

    const result = analyzeResponse(input);

    db.run(
        "INSERT INTO responses (userId, input, type) VALUES (?, ?, ?)",
        [userId, input, result.type],
        function (err) {
            if (err) return res.status(500).json(err);

            res.json(result);
        }
    );
};

exports.getResponses = (req, res) => {
    const { userId } = req.params;
    db.all(
        "SELECT * FROM responses WHERE userId = ? ORDER BY created_at DESC",
        [userId],
        (err, rows) => {
            if (err) return res.status(500).json(err);
            res.json(rows);
        }
    );
};