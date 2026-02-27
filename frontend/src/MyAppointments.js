import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";

export default function MyAppointments() {

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/patient/appointments", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setAppointments(data);
        setLoading(false);
      });

  }, []);

  return (
    <>
      <Navbar />

      <div style={styles.page}>

        <motion.h2
          style={styles.title}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          📅 My Appointments
        </motion.h2>

        {loading && <p style={styles.infoText}>Loading appointments...</p>}

        {!loading && appointments.length === 0 && (
          <p style={styles.infoText}>No appointments found</p>
        )}

        <div style={styles.grid}>

          {appointments.map(app => (

            <motion.div
              key={app._id}
              style={styles.card}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >

              <div style={styles.row}>
                <span style={styles.label}>Date:</span>
                <b>{app.date}</b>
              </div>

              <div style={styles.row}>
                <span style={styles.label}>Time:</span>
                <b>{app.time}</b>
              </div>

              <div style={styles.row}>
                <span style={styles.label}>Status:</span>
                <span style={statusBadge(app.status)}>
                  {app.status}
                </span>
              </div>

            </motion.div>

          ))}

        </div>

      </div>
    </>
  );
}

/* ================= STYLES ================= */

const styles = {

  page: {
    minHeight: "100vh",
    padding: "50px 80px",
    background: "var(--page-bg)",
    color: "var(--text-color)"
  },

  title: {
    marginBottom: "35px",
    textAlign: "center",
    fontSize: "30px",
    fontWeight: "700"
  },

  infoText: {
    textAlign: "center",
    opacity: 0.7,
    marginBottom: "20px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "30px"
  },

  card: {
    padding: "25px",
    borderRadius: "20px",
    background: "var(--glass-bg)",
    border: "1px solid var(--card-border)",
    backdropFilter: "blur(20px)",
    boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
    transition: "0.3s ease"
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px"
  },

  label: {
    opacity: 0.8
  }
};

/* ================= STATUS BADGE ================= */

const statusBadge = (status) => {

  let bg;

  if (status === "Approved") bg = "var(--success)";
  else if (status === "Rejected") bg = "var(--danger)";
  else bg = "var(--warning)";

  return {
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "600",
    background: bg,
    color: "white"
  };
};