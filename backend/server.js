const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const User = require("./models/User");

// ✅ APPOINTMENT MODEL
const Appointment = require("./models/Appointment");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://mongo:27017/healthcare");

// ========================
// REGISTER API
// ========================

app.post("/api/register", async (req,res)=>{

  const hashed = await bcrypt.hash(req.body.password,10);

  await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashed,
        role: req.body.role || "patient"
    });

  res.json({msg:"Registered"});
});


// ========================
// LOGIN API
// ========================

app.post("/api/login", async (req,res)=>{

  const user = await User.findOne({email:req.body.email});
  if(!user) return res.status(400).send("User not found");

  const valid = await bcrypt.compare(req.body.password,user.password);
  if(!valid) return res.status(400).send("Wrong password");

  const token = jwt.sign(
        { id: user._id, role: user.role },
        "healthcareSecret"
    );

    res.json({
        token,
        role: user.role
    });

});


// ========================
// AUTH MIDDLEWARE
// ========================

const verifyToken = (req,res,next) => {

  const header = req.headers.authorization;

  if(!header) return res.status(401).send("Access Denied");

  const token = header.split(" ")[1];

  jwt.verify(token,"healthcareSecret",(err,decoded)=>{

    if(err) return res.status(401).send("Invalid Token");

    req.userId = decoded.id;
    next();
  });
};


// ========================
// PROFILE API (PROTECTED)
// ========================

app.get("/api/auth/profile", verifyToken, async (req,res)=>{

  const user = await User.findById(req.userId).select("-password");

  res.json(user);
});


// ========================
// FETCH ALL DOCTORS
// ========================

app.get("/api/doctors", async (req,res)=>{

  const doctors = await User.find({ role: "doctor" })
    .select("-password");

  res.json(doctors);
});


// ========================
// BOOK APPOINTMENT (PROTECTED)
// ========================

app.post("/api/appointments", verifyToken, async (req,res)=>{

  const appointment = await Appointment.create({

    patientId: req.userId,
    doctorId: req.body.doctorId,
    date: req.body.date,
    time: req.body.time

  });

  res.json(appointment);
});


// ========================
// DOCTOR DASHBOARD APPOINTMENTS
// ========================

app.get("/api/doctor/appointments", verifyToken, async (req,res)=>{

  const appointments = await Appointment.find({
    doctorId: req.userId
  });

  res.json(appointments);
});


// ========================
// ✅ PATIENT APPOINTMENTS (NEW)
// ========================

app.get("/api/patient/appointments", verifyToken, async (req,res)=>{

  const appointments = await Appointment.find({
    patientId: req.userId
  });

  res.json(appointments);
});


// ========================

app.listen(5000,()=>{
  console.log("Backend running on port 5000");
});
