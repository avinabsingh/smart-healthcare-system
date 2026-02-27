const express = require("express");
const multer = require("multer");
const Record = require("../models/Record");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const router = express.Router();

/* ================= AUTH MIDDLEWARE ================= */

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token" });

  try {
    // ✅ Use SAME secret as authController
    const decoded = jwt.verify(token, "healthcareSecret");

    req.user = decoded; // decoded contains { id, role }
    next();

  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

/* ================= MULTER CONFIG ================= */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }
});

/* ================= UPLOAD ================= */

router.post("/records/upload", authMiddleware, upload.single("file"), async (req, res) => {

  try {

    const newRecord = new Record({
      user: req.user.id, // ✅ use id (not _id)
      filename: req.file.filename,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      path: req.file.path
    });

    await newRecord.save();

    res.json(newRecord);

  } catch (err) {
    res.status(500).json({ message: "Upload failed" });
  }

});

/* ================= GET USER RECORDS ================= */

router.get("/records", authMiddleware, async (req, res) => {

  try {

    const records = await Record.find({ user: req.user.id }) // ✅ use id
      .sort({ createdAt: -1 });

    res.json(records);

  } catch (err) {
    res.status(500).json({ message: "Error fetching records" });
  }

});

/* ================= DELETE ================= */

router.delete("/records/:id", authMiddleware, async (req, res) => {

  try {

    const record = await Record.findById(req.params.id);

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    // delete physical file
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