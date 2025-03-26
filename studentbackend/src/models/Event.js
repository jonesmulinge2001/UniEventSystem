const db = require("../config/db");

const Event = {
  create: (eventData, callback) => {
    const { title, description, date, location, status, adminId } = eventData;
    db.query("INSERT INTO events (title, description, date, location, status, admin_id) VALUES (?, ?, ?, ?, ?, ?)", 
      [title, description, date, location, status, adminId], callback);
  },

  findById: (id, callback) => {
    db.query("SELECT * FROM events WHERE id = ?", [id], callback);
  },

  getAll: (callback) => {
    db.query("SELECT e.*, a.name AS admin_name FROM events e JOIN admins a ON e.admin_id = a.id", callback);
  },

  update: (id, eventData, callback) => {
    const { title, description, date, location, status } = eventData;
    db.query("UPDATE events SET title = ?, description = ?, date = ?, location = ?, status = ? WHERE id = ?", 
      [title, description, date, location, status, id], callback);
  },

  delete: (id, callback) => {
    db.query("DELETE FROM events WHERE id = ?", [id], callback);
  },
};

module.exports = Event;
