const db = require("../config/db"); // Import database connection

// Register for an event
const registerForEvent = (req, res) => {
    const { name, regno, course, eventId } = req.body;

    if (!name || !regno || !course || !eventId) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the user is already registered for the event
    db.query(
        "SELECT * FROM registrations WHERE regno = ? AND event_id = ?",
        [regno, eventId],
        (err, results) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ message: "Server error, please try again later." });
            }

            if (results.length > 0) {
                return res.status(409).json({ message: "You are already registered for this event." });
            }

            // Insert new registration
            db.query(
                "INSERT INTO registrations (event_id, name, regno, course) VALUES (?, ?, ?, ?)",
                [eventId, name, regno, course],
                (err) => {
                    if (err) {
                        console.error("Error inserting registration:", err);
                        return res.status(500).json({ message: "Server error, please try again later." });
                    }
                    res.status(201).json({ message: "Registration successful!" });
                }
            );
        }
    );
};

// Get registered events for a user
// Get registered events for a user
const getUserEvents = (req, res) => {
    const { regno } = req.params;

    console.log(`Fetching events for regno: ${regno}`);

    db.query(
        `SELECT 
            events.id,
            events.title AS name,  // Aliased to match frontend expectation
            events.date,
            events.location,
            events.description
        FROM events 
        JOIN registrations ON events.id = registrations.event_id 
        WHERE registrations.regno = ?`,
        [regno],
        (err, results) => {
            if (err) {
                console.error("Error fetching user events:", err);
                return res.status(500).json({ message: "Server error, please try again later." });
            }

            console.log("Fetched events:", results);
            
            // Convert date to ISO string if it's not already
            const formattedResults = results.map(event => ({
                ...event,
                date: event.date ? new Date(event.date).toISOString() : null
            }));

            res.json(formattedResults);
        }
    );
};

module.exports = { registerForEvent, getUserEvents };
