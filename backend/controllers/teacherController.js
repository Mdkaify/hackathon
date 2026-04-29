const db = require("../db/database");

exports.getInsights = (req, res) => {
    db.all(
        "SELECT type, COUNT(*) as count FROM responses GROUP BY type",
        [],
        (err, rows) => {
            if (err) return res.status(500).json(err);
            res.json(rows);
        }
    );
};

exports.getStudentsData = (req, res) => {
  const query = `
    SELECT 
      u.id, u.name, u.role,
      (SELECT COUNT(*) FROM responses r WHERE r.userId = u.id) as lessons,
      (SELECT AVG(score) FROM scores s WHERE s.userId = u.id) as avgScore
    FROM users u
    WHERE u.role = 'student'
  `;

  db.all(query, [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
};