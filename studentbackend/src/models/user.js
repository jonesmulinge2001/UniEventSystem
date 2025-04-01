const db = require("../config/db");

const User = {
  create: (userData, callback) => {
    const { name, email, password, role } = userData;
    db.query("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)", 
      [name, email, password, role], callback);
  },

  findByEmail: (email, callback) => {
    db.query("SELECT * FROM users WHERE email = ?", [email], callback);
  },

  findById: (id, callback) => {
    db.query("SELECT * FROM users WHERE id = ?", [id], callback);
  },

  findAll: (callback) => {  // ✅ Renamed from getAll to findAll
    db.query("SELECT id, name, email, role FROM users", callback);
  }
};
User.updateRole = (userId, newRole, callback) => {
  const sql = "UPDATE users SET role = ? WHERE id = ?";
  db.query(sql, [newRole, userId], callback);
};


module.exports = User;
