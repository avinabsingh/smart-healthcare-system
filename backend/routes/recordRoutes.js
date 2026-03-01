const express = require("express");
const multer = require("multer");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const path = require("path");

// Import Models
const Record = require("../models/Record");
const User = require("../models/User");

const router = express.Router();

/* ================= AUTH MIDDLEWARE ================= */
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, "healthcareSecret");
    req.user = decoded; 
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

/* ================= MULTER CONFIG ================= */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync("uploads")) {
      fs.mkdirSync("uploads");
    }
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_"));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }
});

/* ================= 1. GET ALL PATIENTS (For Doctor Dropdown) ================= */
// UPDATED PATH: /doctor/patients (Matches frontend)
router.get("/doctor/patients", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "doctor") {
      return res.status(403).json({ message: "Access denied" });
    }
    const patients = await User.find({ role: "patient" }).select("name email _id");
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch patients" });
  }
});

/* ================= 2. UPLOAD RECORD (Doctor Uploads for Patient) ================= */
// UPDATED PATH: /doctor/upload-record (Matches frontend)
router.post("/doctor/upload-record", authMiddleware, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });
    if (req.user.role !== "doctor") {
      return res.status(403).json({ message: "Only doctors can upload records" });
    }

    const { patientId, title } = req.body; 

    if (!patientId || !title) {
      return res.status(400).json({ message: "Patient ID and Title are required" });
    }

    const newRecord = new Record({
      user: patientId,
      uploadedBy: req.user.id,
      title: title, 
      filename: req.file.filename,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      path: req.file.path
    });

    await newRecord.save();
    res.json(newRecord);

  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Upload failed" });
  }
});

/* ================= 3. GET MY RECORDS (Patient View) ================= */
// UPDATED PATH: /patient/records (Matches frontend)
router.get("/patient/records", authMiddleware, async (req, res) => {
  try {
    const records = await Record.find({ user: req.user.id })
      .populate("uploadedBy", "name") 
      .sort({ createdAt: -1 });

    const formattedRecords = records.map(rec => ({
      ...rec._doc,
      fileUrl: `${req.protocol}://${req.get("host")}/uploads/${rec.filename}`
    }));

    res.json(formattedRecords);
  } catch (err) {
    res.status(500).json({ message: "Error fetching records" });
  }
});

/* ================= 4. GET SPECIFIC PATIENT RECORDS (Doctor View) ================= */
router.get("/records/patient/:patientId", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "doctor") {
      return res.status(403).json({ message: "Access denied" });
    }

    const records = await Record.find({ user: req.params.patientId }).sort({ createdAt: -1 });
    
    const formattedRecords = records.map(rec => ({
      ...rec._doc,
      fileUrl: `${req.protocol}://${req.get("host")}/uploads/${rec.filename}`
    }));

    res.json(formattedRecords);
  } catch (err) {
    res.status(500).json({ message: "Error fetching patient records" });
  }
});

/* ================= 5. DELETE RECORD (Doctor Only) ================= */
router.delete("/records/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "doctor") {
      return res.status(403).json({ message: "Only doctors can delete records" });
    }

    const record = await Record.findById(req.params.id);
    if (!record) return res.status(404).json({ message: "Record not found" });

    if (fs.existsSync(record.path)) {
      fs.unlinkSync(record.path);
    }

    await Record.findByIdAndDelete(req.params.id);
    res.json({ message: "Record deleted" });

  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

module.exports = router;