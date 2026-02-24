const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api", authRoutes);
app.use("/api", doctorRoutes);
app.use("/api", appointmentRoutes);

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});