const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  date: { type: String, required: true },
  time: { type: String, required: true },

  // --- New Fields ---
  problem: { type: String, required: true },     // e.g. "Stomach Ache"
  duration: { type: String, required: true },    // e.g. "3 Days"
  description: { type: String },                 // Optional details
  
  status: {
    type: String,
    default: "Booked"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});



module.exports = mongoose.model("Appointment", AppointmentSchema);