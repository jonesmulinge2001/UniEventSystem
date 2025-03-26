const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const authRoutes = require("./routes/userRoute");
const eventRoutes = require("./routes/adminEventRoutes");

dotenv.config();

const app = express();
app.use(cors());

// ✅ Middleware to catch empty or malformed JSON
app.use(express.json({
  verify: (req, res, buf, encoding) => {
    try {
      if (buf.length) JSON.parse(buf.toString());
    } catch (e) {
      res.status(400).json({ error: "Invalid JSON format" });
      throw new Error("Invalid JSON");
    }
  }
}));

// 📌 Routes
app.use("/auth", authRoutes);
app.use("/events", eventRoutes);

// 📌 Global Error Handler for Syntax Errors
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ error: "Malformed JSON request" });
  }
  next();
});

// 📌 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running at: http://localhost:${PORT}`));
