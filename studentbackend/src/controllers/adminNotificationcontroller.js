const db = require("../config/db");

// ✅ Fetch all notifications, ordered by latest first
exports.getAllNotifications = async (req, res) => {
  try {
    const [results] = await db.promise().query(
      "SELECT * FROM notifications ORDER BY created_at DESC"
    );

    if (results.length === 0) {
      return res.status(404).json({ success: false, message: "No notifications found" });
    }

    res.json({ success: true, notifications: results });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Error fetching notifications" });
  }
};

// ✅ Send notification to all users
exports.sendNotificationToAll = async (req, res) => {
  const { event_id, message } = req.body;

  try {
    // Fetch all user IDs
    const [users] = await db.promise().query("SELECT id FROM users");

    if (users.length === 0) {
      return res.status(400).json({ error: "No users found to send notifications." });
    }

    // Prepare data for insertion
    const values = users.map(user => [user.id, event_id, message, 'unread']);
    console.log("Inserting values:", values); // ✅ Debugging

    // Insert notifications
    const insertQuery = "INSERT INTO notifications (user_id, event_id, message, status) VALUES ?";
    await db.promise().query(insertQuery, [values]);

    res.json({ success: true, message: "Notification sent to all users!" });
  } catch (error) {
    console.error("Error sending notification:", error);
    res.status(500).json({ error: "Failed to send notifications." });
  }
};

// ✅ Fetch notifications for a specific user
exports.getNotificationsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const [results] = await db.promise().query(
      "SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC",
      [userId]
    );

    if (results.length === 0) {
      return res.status(404).json({ success: false, message: "No notifications found for this user" });
    }

    res.json({ success: true, notifications: results });
  } catch (error) {
    console.error("Error fetching user notifications:", error);
    res.status(500).json({ error: "Failed to fetch user notifications" });
  }
};

// ✅ Mark a notification as read
exports.markNotificationAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const [results] = await db.promise().query(
      "UPDATE notifications SET status = 'read' WHERE id = ?",
      [id]
    );

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Notification not found" });
    }

    res.json({ success: true, message: `Notification ${id} marked as read` });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    res.status(500).json({ error: "Failed to mark notification as read" });
  }
};

exports.deleteNotification = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM notifications WHERE id = ?", [id]);
    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    console.error("Error deleting notification:", error);
    res.status(500).json({ error: "Failed to delete notification" });
  }
};

