const Appointment = require("../models/Appointment");

exports.bookAppointment = async (req, res) => {
  const appointment = await Appointment.create({
    patientId: req.userId,
    doctorId: req.body.doctorId,
    date: req.body.date,
    time: req.body.time
  });

  res.json(appointment);
};

exports.getPatientAppointments = async (req, res) => {
  const appointments = await Appointment.find({
    patientId: req.userId
  });

  res.json(appointments);
};