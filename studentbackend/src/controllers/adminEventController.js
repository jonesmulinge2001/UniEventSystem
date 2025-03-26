const db = require("../config/db"); // MySQL database connection

// 📌 Create a new event
exports.createEvent = async (req, res) => {
  try {
    const { title, description, date, location } = req.body;

    if (!title || !description || !date || !location) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const sql = "INSERT INTO events (title, description, date, location, created_by) VALUES (?, ?, ?, ?, ?)";
    const values = [title, description, date, location, req.user.id];

    db.query(sql, values, (err, result) => {
      if (err) return res.status(500).json({ error: "Internal Server Error" });

      res.status(201).json({ message: "Event created successfully", eventId: result.insertId });
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 📌 Get all events
exports.getAllEvents = async (req, res) => {
  const sql = "SELECT * FROM events ORDER BY date DESC";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Internal Server Error" });

    res.status(200).json(results);
  });
};

// 📌 Get a single event by ID
exports.getEventById = async (req, res) => {
  const sql = "SELECT * FROM events WHERE id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: "Internal Server Error" });

    if (result.length === 0) return res.status(404).json({ error: "Event not found" });

    res.status(200).json(result[0]);
  });
};

// 📌 Update an event
exports.updateEvent = async (req, res) => {
  try {
    const { title, description, date, location } = req.body;
    const sql = "UPDATE events SET title = ?, description = ?, date = ?, location = ? WHERE id = ?";
    const values = [title, description, date, location, req.params.id];

    db.query(sql, values, (err, result) => {
      if (err) return res.status(500).json({ error: "Internal Server Error" });

      if (result.affectedRows === 0) return res.status(404).json({ error: "Event not found" });

      res.status(200).json({ message: "Event updated successfully" });
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 📌 Delete an event
exports.deleteEvent = async (req, res) => {
  const sql = "DELETE FROM events WHERE id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: "Internal Server Error" });

    if (result.affectedRows === 0) return res.status(404).json({ error: "Event not found" });

    res.status(200).json({ message: "Event deleted successfully" });
  });
};
