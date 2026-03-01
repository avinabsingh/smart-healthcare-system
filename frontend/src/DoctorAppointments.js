import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import { 
  Calendar, User, Mail, Clock, 
  CheckCircle, ClipboardList, ChevronRight, Activity 
} from "lucide-react";

export default function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/api/doctor/appointments", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setAppointments(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching appointments:", err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div style={styles.page}>
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }}
          style={styles.header}
        >
          <div style={styles.titleWrapper}>
            <div style={styles.iconCircle}>
              <ClipboardList size={32} color="#6c5ce7" />
            </div>
            <div>
              <h1 style={styles.title}>Patient <span style={styles.highlight}>Appointments</span></h1>
              <p style={styles.subtitle}>Manage and view your upcoming medical consultations</p>
            </div>
          </div>
        </motion.div>

        <div style={styles.container}>
          {loading ? (
            <p style={styles.statusText}>Loading appointments...</p>
          ) : appointments.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={styles.emptyCard}>
              <Activity size={48} color="#b2bec3" style={{ marginBottom: "15px" }} />
              <p>No appointments scheduled at the moment.</p>
            </motion.div>
          ) : (
            <div style={styles.list}>
              {appointments.map((app, index) => (
                <motion.div
                  key={app._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, boxShadow: "0 12px 30px rgba(0,0,0,0.1)" }}
                  style={styles.card}
                >
                  <div style={styles.cardMain}>
                    <div style={styles.patientInfo}>
                      <div style={styles.avatar}>
                        <User size={24} color="#6c5ce7" />
                      </div>
                      <div>
                        <h3 style={styles.patientName}>{app.patientId?.name || "Unknown Patient"}</h3>
                        <div style={styles.emailRow}>
                          <Mail size={14} color="#636e72" />
                          <span style={styles.emailText}>{app.patientId?.email}</span>
                        </div>
                      </div>
                    </div>

                    <div style={styles.divider} />

                    <div style={styles.scheduleInfo}>
                      <div style={styles.badge}>
                        <Calendar size={16} color="#6c5ce7" />
                        <span>{new Date(app.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <div style={styles.badge}>
                        <Clock size={16} color="#6c5ce7" />
                        <span>{app.time}</span>
                      </div>
                    </div>

                    <div style={styles.statusWrapper}>
                      <div style={styles.statusBadge}>
                        <CheckCircle size={16} color="#00b894" />
                        <span style={styles.statusText}>{app.status || "Booked"}</span>
                      </div>
                      <ChevronRight size={20} color="#b2bec3" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
    padding: "60px 80px",
    fontFamily: "'Poppins', sans-serif",
  },
  header: {
    marginBottom: "50px",
    maxWidth: "1100px",
    margin: "0 auto 50px auto",
  },
  titleWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  iconCircle: {
    width: "70px",
    height: "70px",
    borderRadius: "20px",
    background: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
  },
  title: {
    fontSize: "38px",
    fontWeight: "800",
    color: "#2d3436",
    margin: 0,
    letterSpacing: "-1px",
  },
  highlight: { color: "#6c5ce7" },
  subtitle: {
    color: "#636e72",
    fontSize: "18px",
    fontWeight: "500",
    marginTop: "5px",
  },
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  card: {
    background: "#ffffff",
    borderRadius: "24px",
    padding: "25px 35px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.03)",
    border: "1px solid rgba(255,255,255,0.8)",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  cardMain: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  patientInfo: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    flex: 1.5,
  },
  avatar: {
    width: "50px",
    height: "50px",
    borderRadius: "15px",
    background: "rgba(108, 92, 231, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  patientName: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#2d3436",
    margin: "0 0 4px 0",
  },
  emailRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  emailText: {
    fontSize: "14px",
    color: "#636e72",
    fontWeight: "500",
  },
  divider: {
    width: "1px",
    height: "50px",
    background: "#f1f2f6",
    margin: "0 40px",
  },
  scheduleInfo: {
    display: "flex",
    gap: "15px",
    flex: 1,
  },
  badge: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "#f8f9fa",
    padding: "10px 16px",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#2d3436",
    border: "1px solid #edf2f7",
  },
  statusWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  statusBadge: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "rgba(0, 184, 148, 0.1)",
    padding: "10px 18px",
    borderRadius: "12px",
    color: "#00b894",
    fontWeight: "700",
    fontSize: "14px",
  },
  emptyCard: {
    textAlign: "center",
    padding: "100px",
    background: "#ffffff",
    borderRadius: "30px",
    color: "#636e72",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.03)",
  },
  statusText: {
    textAlign: "center",
    fontSize: "18px",
    color: "#636e72",
  }
};