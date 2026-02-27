const mongoose = require("mongoose");

const RecordSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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