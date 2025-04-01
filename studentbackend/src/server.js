const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const authRoutes = require("./routes/userRoute");
const eventRoutes = require("./routes/adminEventRoutes");
const adminNotificationRoutes = require("./routes/adminNotificationRoutes");
const registerRoutes = require("./routes/registrationRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Debugging Middleware
app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.url}`, req.body);
  next();
});

// Routes
app.use("/auth", authRoutes);  // User authentication & role update
app.use("/events", eventRoutes); // Event management
app.use("/admin", adminNotificationRoutes); // Admin notifications
app.use("/", registerRoutes); // Registration system

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running at: http://localhost:${PORT}`));
