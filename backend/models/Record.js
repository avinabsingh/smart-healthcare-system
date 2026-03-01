const mongoose = require("mongoose");

const RecordSchema = new mongoose.Schema({
  // The Patient this record belongs to
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  // The Doctor who uploaded it
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  // Title of the record (e.g., "Blood Test")
  title: { 
    type: String, 
    required: true 
  }, 

  filename: String,
  originalname: String,
  mimetype: String,
  size: Number,
  path: String,

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Record", RecordSchema);