const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const appointmentController = require("../controllers/appointmentController");

router.post("/appointments", verifyToken, appointmentController.bookAppointment);
router.get("/patient/appointments", verifyToken, appointmentController.getPatientAppointments);

module.exports = router;