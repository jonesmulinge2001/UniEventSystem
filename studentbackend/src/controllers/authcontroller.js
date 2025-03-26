const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("../models/user");

dotenv.config();

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const userRole = role === "admin" ? "admin" : "user";

    User.findByEmail(email, async (err, results) => {
      if (err) return res.status(500).json({ error: "Database error" });
      if (results.length > 0) return res.status(400).json({ error: "Email already in use" });

      const hashedPassword = await bcrypt.hash(password, 10);

      User.create({ name, email, password: hashedPassword, role: userRole }, (err) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.status(201).json({ message: `${userRole} registered successfully` });
      });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    User.findByEmail(email, async (err, results) => {
      if (err) return res.status(500).json({ error: "Database error" });
      if (results.length === 0) return res.status(400).json({ error: "Invalid email or password" });

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) return res.status(400).json({ error: "Invalid email or password" });

      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

      res.status(200).json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllUsers = (req, res) => {
  User.findAll((err, users) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.status(200).json(users);
  });
};

exports.getUserById = (req, res) => {
  const userId = req.params.id;

  User.findById(userId, (err, user) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json(user);
  });
};