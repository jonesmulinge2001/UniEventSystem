const db = require("../config/db");

const EventRegistration = {
  registerUser: (userId, eventId, callback) => {
    db.query("INSERT INTO event_registrations (user_id, event_id, registered_at) VALUES (?, ?, NOW())", 
      [userId, eventId], callback);
  },

  getByUserId: (userId, callback) => {
    db.query("SELECT er.*, e.title AS event_title FROM event_registrations er JOIN events e ON er.event_id = e.id WHERE er.user_id = ?", 
      [userId], callback);
  },

  getByEventId: (eventId, callback) => {
    db.query("SELECT er.*, u.name AS user_name FROM event_registrations er JOIN users u ON er.user_id = u.id WHERE er.event_id = ?", 
      [eventId], callback);
  },

  delete: (id, callback) => {
    db.query("DELETE FROM event_registrations WHERE id = ?", [id], callback);
  },
};

module.exports = EventRegistration;
