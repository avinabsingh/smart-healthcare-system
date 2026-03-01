import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import { 
  Calendar, Clock, User, Stethoscope, 
  Activity, Timer, CheckCircle, XCircle, AlertCircle 
} from "lucide-react";

export default function MyAppointments() {

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/patient/appointments", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setAppointments(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar />

      <div style={styles.page}>
        
        <div style={styles.header}>
          <motion.h2
            style={styles.title}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            My Appointments
          </motion.h2>
          <p style={styles.subtitle}>Track your scheduled visits and medical history</p>
        </div>

        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={styles.centerText}>
             Loading records...
          </motion.div>
        )}

        {!loading && appointments.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }}
            style={styles.emptyState}
          >
            <Calendar size={48} color="#cbd5e0" />
            <p>No appointments booked yet.</p>
          </motion.div>
        )}

        <div style={styles.grid}>
          {appointments.map((app, index) => (
            <motion.div
              key={app._id}
              style={styles.card}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
            >
              
              {/* --- Card Header: Doctor Info --- */}
              <div style={styles.cardHeader}>
                <div style={styles.avatar}>
                  <User size={20} color="#6c5ce7" />
                </div>
                <div>
                  <h3 style={styles.doctorName}>Dr. {app.doctorId?.name || "Unknown"}</h3>
                  <div style={styles.specialty}>
                    <Stethoscope size={12} style={{marginRight: 4}} />
                    {app.doctorId?.specialty || "General Physician"}
                  </div>
                </div>
                
                {/* Status Badge */}
                <div style={getStatusStyle(app.status)}>
                  {getStatusIcon(app.status)}
                  {app.status}
                </div>
              </div>

              <div style={styles.divider}></div>

              {/* --- Card Body: Appointment Details --- */}
              <div style={styles.cardBody}>
                
                {/* Date & Time */}
                <div style={styles.row}>
                  <div style={styles.infoItem}>
                    <Calendar size={16} color="#718096" />
                    <span>{app.date}</span>
                  </div>
                  <div style={styles.infoItem}>
                    <Clock size={16} color="#718096" />
                    <span>{app.time}</span>
                  </div>
                </div>

                {/* Problem & Duration */}
                <div style={styles.medicalBox}>
                   <div style={styles.medicalRow}>
                      <Activity size={16} color="#e17055" />
                      <span style={styles.medicalText}>
                        <b>Problem:</b> {app.problem}
                      </span>
                   </div>
                   <div style={styles.medicalRow}>
                      <Timer size={16} color="#0984e3" />
                      <span style={styles.medicalText}>
                        <b>Duration:</b> {app.duration}
                      </span>
                   </div>
                </div>

              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </>
  );
}

/* ================= HELPERS ================= */

const getStatusIcon = (status) => {
  if (status === "Approved") return <CheckCircle size={12} style={{marginRight: 4}} />;
  if (status === "Rejected") return <XCircle size={12} style={{marginRight: 4}} />;
  return <AlertCircle size={12} style={{marginRight: 4}} />;
};

const getStatusStyle = (status) => {
  const base = {
    display: "flex", alignItems: "center", padding: "6px 12px",
    borderRadius: "20px", fontSize: "12px", fontWeight: "600",
    marginLeft: "auto"
  };
  
  if (status === "Approved") return { ...base, background: "#def7ec", color: "#03543f" };
  if (status === "Rejected") return { ...base, background: "#fde8e8", color: "#9b1c1c" };
  // Default / Pending
  return { ...base, background: "#fff8e1", color: "#b7791f" };
};

/* ================= STYLES ================= */

const styles = {
  page: {
    minHeight: "100vh",
    padding: "40px",
    background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
    fontFamily: "'Inter', sans-serif"
  },
  header: {
    textAlign: "center",
    marginBottom: "40px"
  },
  title: {
    fontSize: "32px",
    fontWeight: "800",
    color: "#1a202c",
    marginBottom: "8px"
  },
  subtitle: {
    color: "#718096",
    fontSize: "16px"
  },
  centerText: {
    textAlign: "center",
    color: "#718096",
    fontSize: "18px",
    marginTop: "40px"
  },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
    color: "#a0aec0",
    marginTop: "50px",
    fontSize: "18px"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
    gap: "30px",
    maxWidth: "1200px",
    margin: "0 auto"
  },
  card: {
    background: "#ffffff",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
    border: "1px solid rgba(0,0,0,0.05)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column"
  },
  cardHeader: {
    padding: "20px",
    display: "flex",
    alignItems: "center",
    gap: "15px"
  },
  avatar: {
    width: "45px",
    height: "45px",
    borderRadius: "12px",
    background: "rgba(108, 92, 231, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  doctorName: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#2d3748",
    margin: 0
  },
  specialty: {
    fontSize: "13px",
    color: "#718096",
    display: "flex",
    alignItems: "center",
    marginTop: "2px"
  },
  divider: {
    height: "1px",
    background: "#edf2f7",
    width: "100%"
  },
  cardBody: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    background: "#f7fafc",
    padding: "12px",
    borderRadius: "10px"
  },
  infoItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    fontWeight: "500",
    color: "#4a5568"
  },
  medicalBox: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "0 5px"
  },
  medicalRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  medicalText: {
    fontSize: "14px",
    color: "#4a5568"
  }
};