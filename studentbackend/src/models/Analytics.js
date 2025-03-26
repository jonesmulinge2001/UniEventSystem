const db = require("../config/db");

const Analytics = {
  getEventStats: (eventId, callback) => {
    db.query("SELECT COUNT(*) AS totalRegistrations FROM event_registrations WHERE event_id = ?", 
      [eventId], callback);
  },

  getTotalUsers: (callback) => {
    db.query("SELECT COUNT(*) AS totalUsers FROM users", callback);
  },

  getTotalEvents: (callback) => {
    db.query("SELECT COUNT(*) AS totalEvents FROM events", callback);
  },
};

module.exports = Analytics;
