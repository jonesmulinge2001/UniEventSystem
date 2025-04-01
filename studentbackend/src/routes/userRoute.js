const express = require("express");
const { register, login, getAllUsers, getUserById } = require("../controllers/authcontroller");
const { updateUserRole } = require("../controllers/authcontroller"); // ✅ Correct import

const { verifyToken, isAdmin } = require("../middleware/authmiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/users", verifyToken, isAdmin, getAllUsers);
router.get("/users/:id", verifyToken, getUserById);
router.put("/update-role", verifyToken, isAdmin, updateUserRole); // ✅ Fix here

module.exports = router;
