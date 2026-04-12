const cron = require("node-cron");
const Reminder = require("./models/Reminder");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


cron.schedule("* * * * *", async () => {
  console.log("Checking reminders...");

  const now = new Date();

  const reminders = await Reminder.find({ sent: false });
console.log("ALL REMINDERS:", reminders);

  for (let r of reminders) {
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: r.email,
        subject: "Reminder Alert",
        text: `Reminder: ${r.title}`,
      });

      console.log("Reminder sent to:", r.email);

      r.sent = true;
      await r.save();

    } catch (err) {
      console.error("Email error:", err);
    }
  }
});