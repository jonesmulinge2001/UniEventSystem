const db = require("../config/db");

const Notification = {
  create: (notificationData, callback) => {
    const { userId, eventId, message, status } = notificationData;
    db.query(
      "INSERT INTO notifications (id, event_id, message, status) VALUES (?, ?, ?, ?)",
      [userId || null, eventId, message, status],
      callback
    );
  },

  getByUserId: (userId, callback) => {
    db.query("SELECT * FROM notifications WHERE user_id = ?", [userId], callback);
  },

  markAsRead: (id, callback) => {
    db.query("UPDATE notifications SET status = 'read' WHERE id = ?", [id], callback);
  },

  delete: (id, callback) => {
    db.query("DELETE FROM notifications WHERE id = ?", [id], callback);
  },
};

module.exports = Notification;
