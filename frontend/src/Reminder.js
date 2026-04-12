import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Bell, CalendarClock, Send } from "lucide-react";
import Navbar from "./Navbar";
import "./Reminder.css"; // Make sure to import the CSS!

export default function Reminder() {
  const [form, setForm] = useState({
    email: "",
    title: "",
    time: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addReminder = async () => {
    // Basic validation
    if (!form.email || !form.title || !form.time) {
      alert("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("http://localhost:5000/api/add-reminder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      alert(data.message || "Reminder successfully set!");
      // Optional: Clear form after success
      // setForm({ email: "", title: "", time: "" });
    } catch (err) {
      alert("Failed to add reminder. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="reminder-page-container">
        <motion.div 
          className="reminder-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="reminder-header">
            <h2>Set Reminder</h2>
            <p>Schedule your health routines and alerts</p>
          </div>

          <div className="reminder-form">
            
            {/* Email Input */}
            <div className="input-group">
              <Mail size={20} className="input-icon" />
              <input
                type="email"
                name="email"
                className="styled-input"
                placeholder="Patient Email Address"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            {/* Title Input */}
            <div className="input-group">
              <Bell size={20} className="input-icon" />
              <input
                type="text"
                name="title"
                className="styled-input"
                placeholder="Reminder Title (e.g., Take Medicine)"
                value={form.title}
                onChange={handleChange}
              />
            </div>

            {/* Date/Time Input */}
            <div className="input-group">
              <CalendarClock size={20} className="input-icon" />
              <input
                type="datetime-local"
                name="time"
                className="styled-input"
                value={form.time}
                onChange={handleChange}
              />
            </div>

            {/* Submit Button */}
            <motion.button 
              className="submit-btn"
              whileHover={{ scale: 1.02, backgroundColor: "#5f4fce" }}
              whileTap={{ scale: 0.98 }}
              onClick={addReminder}
              disabled={isSubmitting}
            >
              <Send size={18} />
              {isSubmitting ? "Saving..." : "Schedule Reminder"}
            </motion.button>

          </div>
        </motion.div>
      </div>
    </>
  );
}