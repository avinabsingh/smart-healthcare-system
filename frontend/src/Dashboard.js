import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./Navbar";

export default function Dashboard() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const [appointments, setAppointments] = useState([]);
  const [time, setTime] = useState(new Date());

  /* ================= TIME ================= */
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  /* ================= FETCH APPOINTMENTS ================= */
  useEffect(() => {
    if (role === "doctor") {
      const token = localStorage.getItem("token");

      fetch("http://localhost:5000/api/doctor/appointments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setAppointments(data));
    }
  }, [role]);

  /* ================= CALENDAR LOGIC ================= */

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

  const appointmentDates = appointments.map((a) =>
    new Date(a.date).getDate()
  );

  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let i = 1; i <= totalDays; i++) {
    days.push(i);
  }

  return (
    <>
      <Navbar />

      <div style={styles.page}>
        {/* ================= HEADER ================= */}
        <motion.div
          style={styles.hero}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h1 style={styles.title}>
              {role === "doctor" ? "Doctor Dashboard" : "Patient Dashboard"}
            </h1>
            <p style={styles.subtitle}>
              {today.toDateString()}
            </p>
          </div>

          <div style={styles.clockBox}>
            <h2 style={styles.clock}>{time.toLocaleTimeString()}</h2>

            <svg viewBox="0 0 1440 100" style={styles.wave}>
              <motion.path
                fill="none"
                stroke="#00f5ff"
                strokeWidth="3"
                animate={{ x: [0, -300, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 8,
                  ease: "linear",
                }}
                d="M0 50 Q 360 10 720 50 T 1440 50"
              />
            </svg>
          </div>
        </motion.div>

        {/* ================= CARDS ================= */}
        <div style={styles.grid}>
          {role === "patient" && (
            <>
              <Card text="📅 Book Appointment" onClick={() => navigate("/appointment")} />
              <Card text="📋 My Appointments" onClick={() => navigate("/my-appointments")} />
            </>
          )}

          {role === "doctor" && (
            <Card 
              text="📋 Patient Appointments" 
              onClick={() => navigate("/doctor-appointments")} 
            />
          )}

          <Card text="🩺 Medical Records" onClick={() => navigate("/records")} />
          <Card text="👤 Profile" onClick={() => navigate("/profile")} />
        </div>

        {/* ================= CALENDAR ================= */}
        <motion.div
          style={styles.calendarBox}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 style={styles.calendarTitle}>📅 {today.toLocaleString("default", { month: "long" })} {currentYear}</h3>

          <div style={styles.calendarGrid}>
            {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => (
              <div key={d} style={styles.weekday}>{d}</div>
            ))}

            {days.map((day, index) => {
              const isToday = day === today.getDate();
              const hasAppointment = appointmentDates.includes(day);

              return (
                <motion.div
                  key={index}
                  style={{
                    ...styles.dayCell,
                    background: hasAppointment
                      ? "linear-gradient(135deg,#00f5ff,#6a5acd)"
                      : "transparent",
                    border: isToday ? "2px solid #00f5ff" : "1px solid #ffffff20",
                  }}
                  whileHover={{ scale: 1.1 }}
                >
                  {day}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </>
  );
}

/* ================= CARD ================= */

function Card({ text, onClick }) {
  return (
    <motion.div
      style={styles.card}
      onClick={onClick}
      whileHover={{ y: -8, scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
    >
      {text}
    </motion.div>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    minHeight: "100vh",
    padding: "40px 80px",
    background: "var(--page-bg)",
    color: "var(--text-color)",
  },

  hero: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "40px",
    borderRadius: "25px",
    backdropFilter: "blur(20px)",
    background: "var(--glass-bg)",
    marginBottom: "40px",
  },

  title: {
    fontSize: "34px",
    fontWeight: "700",
  },

  subtitle: {
    opacity: 0.8,
    marginTop: "5px",
  },

  clockBox: {
    textAlign: "center",
  },

  clock: {
    fontSize: "28px",
    letterSpacing: "2px",
    fontWeight: "600",
  },

  wave: {
    width: "200px",
    marginTop: "10px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "25px",
    marginBottom: "50px",
  },

  card: {
    padding: "30px",
    borderRadius: "20px",
    background: "var(--card-bg)",
    border: "1px solid var(--card-border)",
    backdropFilter: "blur(15px)",
    cursor: "pointer",
    fontSize: "17px",
    fontWeight: "600",
    textAlign: "center",
    transition: "0.3s",
  },

  calendarBox: {
    padding: "35px",
    borderRadius: "25px",
    background: "var(--glass-bg)",
    backdropFilter: "blur(20px)",
  },

  calendarTitle: {
    marginBottom: "20px",
    fontSize: "22px",
  },

  calendarGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(7,1fr)",
    gap: "12px",
  },

  weekday: {
    textAlign: "center",
    fontWeight: "600",
    opacity: 0.7,
  },

  dayCell: {
    padding: "15px",
    borderRadius: "12px",
    textAlign: "center",
    cursor: "pointer",
    transition: "0.3s",
  },
};