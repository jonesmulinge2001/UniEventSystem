const db = require("../config/db");

// Get all users
const getAllUsers = (req, res) => {
  const sql = "SELECT id, name, email, role, created_at FROM users";
  
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Failed to fetch users", error: err });
    }
    res.status(200).json(results);
  });
};

module.exports = { getAllUsers };
