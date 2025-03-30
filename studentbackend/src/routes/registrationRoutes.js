const express = require("express");
const { registerForEvent, getUserEvents } = require("../controllers/registrationController"); // ✅ Import only once

const router = express.Router();    

// Register endpoint
router.post("/register", registerForEvent);
router.get("/user-events/:regno", getUserEvents);

module.exports = router;
