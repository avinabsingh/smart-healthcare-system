const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const doctorController = require("../controllers/doctorController");

router.get("/doctors", doctorController.getDoctors);
router.get("/doctor/appointments", verifyToken, doctorController.getDoctorAppointments);

module.exports = router;