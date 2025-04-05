const express = require("express");
const router = express.Router();
const adminNotificationController = require("../controllers/adminNotificationcontroller"); // ✅ Ensure the correct file path

// ✅ Use the correct function names from the controller
router.get("/notifications", adminNotificationController.getAllNotifications);
router.post("/send-to-all", adminNotificationController.sendNotificationToAll);
router.get("/notifications/user/:userId", adminNotificationController.getNotificationsByUserId);
router.put("/notifications/read/:id", adminNotificationController.markNotificationAsRead);
router.delete("/notifications/:id", adminNotificationController.deleteNotification);


module.exports = router;
