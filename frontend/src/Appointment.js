import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import axios from "axios";

export default function Appointment() {

  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/doctors")
      .then(res => res.json())
      .then(data => setDoctors(data));
  }, []);

  const handleBooking = async () => {

    if (!doctor || !date || !time) {
      alert("Please fill all fields");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://localhost:5000/api/appointments",
        { doctorId: doctor, date, time },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Appointment Booked Successfully!");
      setDoctor("");
      setDate("");
      setTime("");

    } catch (err) {
      alert("Booking failed");
    }
  };

  return (
    <>
      <Navbar />

      <div style={styles.page}>

        <motion.div
          style={styles.card}
          initial={{ opacity: 0, y: 60, rotateX: 20 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.7 }}
          whileHover={{ rotateY: 3, rotateX: 3 }}
        >

          <h2 style={styles.title}>📅 Book Appointment</h2>

          <select
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
            style={styles.input}
          >
            <option value="">Select Doctor</option>
            {doctors.map(doc => (
              <option key={doc._id} value={doc._id}>
                Dr. {doc.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={styles.input}
          />

          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            style={styles.input}
          />

          <motion.button
            style={styles.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBooking}
          >
            Confirm Appointment
          </motion.button>

        </motion.div>

      </div>
    </>
  );
}

/* ================= STYLES ================= */

const styles = {

  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "var(--page-bg)",
    color: "var(--text-color)",
    padding: "40px"
  },

  card: {
    width: "420px",
    padding: "40px",
    borderRadius: "25px",
    background: "var(--glass-bg)",
    backdropFilter: "blur(20px)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
    border: "1px solid var(--card-border)",
    transformStyle: "preserve-3d",
    transition: "0.4s ease"
  },

  title: {
    textAlign: "center",
    marginBottom: "25px",
    fontSize: "24px",
    fontWeight: "700"
  },

  input: {
    width: "100%",
    padding: "14px",
    marginBottom: "18px",
    borderRadius: "12px",
    border: "1px solid var(--card-border)",
    outline: "none",
    background: "var(--card-bg)",
    color: "var(--text-color)",
    fontSize: "14px",
    transition: "0.3s ease",
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none"
  },

  button: {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg,#00f5ff,#6a5acd)",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "15px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.3)"
  }
};