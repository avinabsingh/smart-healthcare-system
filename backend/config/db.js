const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://mongo:27017/healthcare");
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("DB Connection Error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;