const db = require("../config/db");

const User = {
  create: (userData, callback) => {
    const { name, email, password, role } = userData;
    db.query("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)", [name, email, password, role], callback);
  },

  findByEmail: (email, callback) => {
    db.query("SELECT * FROM users WHERE email = ?", [email], callback);
  },

  findById: (id, callback) => {
    db.query("SELECT * FROM users WHERE id = ?", [id], callback);
  },

  getAll: (callback) => {
    db.query("SELECT id, name, email, role FROM users", callback);
  }
};

module.exports = User;
