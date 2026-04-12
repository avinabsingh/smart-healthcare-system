require("dotenv").config();



const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const recordRoutes = require("./routes/recordRoutes");

const authRoutes = require("./routes/authRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

const chatRoutes = require("./routes/chatRoutes");

const sosRoutes = require("./routes/sosRoutes");

const riskRoutes = require("./routes/riskRoutes");


const reminderRoutes = require("./routes/reminderRoutes");

const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(cors()); 
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});



app.use("/uploads", express.static("uploads"));
connectDB();


require("./reminderCron");

app.use("/api", authRoutes);
app.use("/api", doctorRoutes);
app.use("/api", appointmentRoutes);
app.use("/api", recordRoutes);

app.use("/api/chat", chatRoutes);

app.use("/api", sosRoutes);

app.use("/api", riskRoutes);


app.use("/api", reminderRoutes);


app.use("/api", adminRoutes);

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});