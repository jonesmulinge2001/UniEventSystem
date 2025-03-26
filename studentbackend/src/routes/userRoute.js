const express = require("express"); 
const authController = require("../controllers/authcontroller");
const { verifyToken, isAdmin } = require("../middleware/authmiddleware");

const router = express.Router();

// 📌 Register User or Admin
router.post("/register", authController.register);

// 📌 Login User or Admin
router.post("/login", authController.login);

// 📌 Get All Users (Only Admins)
router.get("/users", verifyToken, isAdmin, authController.getAllUsers);

// 📌 Get User by ID (Admins & Users)
router.get("/user/:id", verifyToken, authController.getUserById);

module.exports = router;
