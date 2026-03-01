const Appointment = require("../models/Appointment");

exports.bookAppointment = async (req, res) => {
  try {
    // 1. Destructure all fields from the request body
    const { doctorId, date, time, problem, duration, description } = req.body;

    // 2. Create the appointment
    const appointment = await Appointment.create({
      patientId: req.userId, // From middleware
      doctorId,
      date,
      time,
      problem,
      duration,
      description
    });

    res.status(201).json({ success: true, appointment });
  } catch (error) {
    console.error("Booking Error:", error);
    res.status(500).json({ message: "Booking failed" });
  }
};

exports.getPatientAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ patientId: req.userId })
      .populate("doctorId", "name specialty") // populate doctor details
      .sort({ createdAt: -1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: "Error fetching appointments" });
  }
};