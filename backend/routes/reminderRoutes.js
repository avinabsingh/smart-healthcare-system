const express = require("express");
const router = express.Router();
const Reminder = require("../models/Reminder");

router.post("/add-reminder", async (req, res) => {
  try {
    const { email, title, time } = req.body;

    const reminder = new Reminder({
      email,
      title,
      time: new Date(time),
    });

    await reminder.save();

    res.json({ message: "Reminder added successfully!" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add reminder" });
  }
});

module.exports = router;