const User = require("../models/User");
const Appointment = require("../models/Appointment");

exports.getDoctors = async (req, res) => {
  const doctors = await User.find({ role: "doctor" }).select("-password");
  res.json(doctors);
};

exports.getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      doctorId: req.userId
    })
    .populate("patientId", "name email")   // 🔥 shows patient details
    .sort({ createdAt: -1 });              // optional but better UX

    res.json(appointments);

  } catch (error) {
    console.error("Doctor Appointment Error:", error);
    res.status(500).json({ message: "Failed to fetch appointments" });
  }
};