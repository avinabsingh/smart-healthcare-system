const express = require("express");
const router = express.Router();

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post("/sos", async (req, res) => {
  try {
    const { location, email } = req.body;

    console.log("🚨 SOS ALERT RECEIVED");
    console.log("📍 Location:", location);
    console.log("📧 Email:", email);

    // ✅ Send Email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email, // 👈 user provided email
      subject: "🚨 Emergency SOS Alert",
      text: `
🚨 EMERGENCY ALERT 🚨

The user has triggered an SOS alert.

📍 Location:
https://www.google.com/maps?q=${location.lat},${location.lng}

Please take immediate action.
      `,
    });

    res.json({
      message: "🚨 SOS sent + Email delivered successfully!",
    });

  } catch (err) {
    console.error("❌ EMAIL ERROR:", err);
    res.status(500).json({ error: "SOS email failed" });
  }
});

module.exports = router;