const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema({
  email: String,
  title: String,
  time: Date,
  sent: { type: Boolean, default: false },
});

module.exports = mongoose.model("Reminder", reminderSchema);