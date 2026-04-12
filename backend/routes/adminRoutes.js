const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const adminController = require("../controllers/adminController");

router.get("/admin/stats", verifyToken, (req, res, next) => {
  if (req.role !== "admin") {
    return res.status(403).json({ message: "Access Denied: Admin only" });
  }
  next();
}, adminController.getStats);

router.get("/admin/users/:role", verifyToken, (req, res, next) => {
  if (req.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }
  next();
}, adminController.getUsersByRole);

module.exports = router;