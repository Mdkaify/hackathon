const db = require("../db/database");

// 🔐 REGISTER (create new user)
exports.register = (req, res) => {
  const { name, role, password } = req.body;


  // Check if user already exists
  db.get(
    "SELECT * FROM users WHERE name = ? AND role = ?",
    [name, role],
    (err, row) => {
      if (err) return res.status(500).json(err);

      if (row) {
        return res.json({
          message: "User already exists, please login",
          userId: row.id,
          name: row.name,
          role: row.role
        });
      }

      // Insert new user
      db.run(
        "INSERT INTO users (name, role, password) VALUES (?, ?, ?)",
        [name, role, password],

        function (err) {
          if (err) return res.status(500).json(err);

          res.json({
            message: "Registered successfully",
            userId: this.lastID,
            name,
            role
          });
        }
      );
    }
  );
};

// 🔑 LOGIN (check existing user)
exports.login = (req, res) => {
  const { name, role, password } = req.body;

  db.get(
    "SELECT * FROM users WHERE name = ? AND role = ? AND password = ?",
    [name, role, password],

    (err, row) => {
      if (err) return res.status(500).json(err);

      if (!row) {
        return res.status(404).json({
          message: "User not found, please register"
        });
      }

      res.json({
        message: "Login successful",
        userId: row.id,
        name: row.name,
        role: row.role
      });
    }
  );
};