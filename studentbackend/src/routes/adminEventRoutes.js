const express = require("express");
const router = express.Router();
const { 
  createEvent, 
  getAllEvents,  // ✅ Fixed the function name
  getEventById, 
  updateEvent, 
  deleteEvent 
} = require("../controllers/adminEventController");
const { verifyToken, isAdmin } = require("../middleware/authmiddleware");

// 📌 Create an event (Only Admins)
router.post("/create", verifyToken, isAdmin, createEvent);

// 📌 Get all events (Anyone can view)
router.get("/", getAllEvents);  // ✅ Fixed the function name

// 📌 Get a single event by ID (Anyone can view)
router.get("/:id", getEventById);

// 📌 Update an event (Only Admins)
router.put("/:id", verifyToken, isAdmin, updateEvent);

// 📌 Delete an event (Only Admins)
router.delete("/:id", verifyToken, isAdmin, deleteEvent);

module.exports = router;
