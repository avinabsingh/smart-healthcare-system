import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { motion } from "framer-motion";
import { 
  User, Mail, Shield, Stethoscope, 
  Edit3, LogOut, MapPin, Phone 
} from "lucide-react";

export default function Profile() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/auth/profile", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/"; // Redirect to login
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
          style={styles.spinner}
        />
        <p>Loading Profile...</p>
      </div>
    );
  }

  if (!user) return null;

  const isDoctor = user.role === "doctor";

  return (
    <>
      <Navbar />

      <div style={styles.page}>
        
        <motion.div 
          style={styles.card}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          
          {/* Header Background */}
          <div style={styles.cardHeader}></div>

          {/* Avatar Section */}
          <div style={styles.avatarWrapper}>
            <div style={styles.avatar}>
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div style={styles.onlineBadge}></div>
          </div>

          {/* User Info */}
          <div style={styles.content}>
            <h2 style={styles.name}>{user.name}</h2>
            
            <span style={isDoctor ? styles.doctorBadge : styles.patientBadge}>
              {isDoctor ? <Stethoscope size={14} /> : <User size={14} />}
              {isDoctor ? "Doctor" : "Patient"}
            </span>

            {/* Details List */}
            <div style={styles.detailsList}>
              
              <div style={styles.detailItem}>
                <div style={styles.iconBox}><Mail size={18} color="#6c5ce7" /></div>
                <div>
                  <label style={styles.label}>Email Address</label>
                  <div style={styles.value}>{user.email}</div>
                </div>
              </div>

              {isDoctor && (
                <div style={styles.detailItem}>
                  <div style={styles.iconBox}><Shield size={18} color="#00b894" /></div>
                  <div>
                    <label style={styles.label}>Specialty</label>
                    <div style={styles.value}>
                      {user.specialty || "General Physician"}
                    </div>
                  </div>
                </div>
              )}

              {/* Placeholder for future fields */}
              <div style={styles.detailItem}>
                <div style={styles.iconBox}><MapPin size={18} color="#e17055" /></div>
                <div>
                  <label style={styles.label}>Location</label>
                  <div style={styles.value}>Not provided</div>
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div style={styles.actions}>
              <motion.button 
                style={styles.editBtn}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Edit3 size={16} /> Edit Profile
              </motion.button>

              <motion.button 
                style={styles.logoutBtn}
                whileHover={{ scale: 1.05, backgroundColor: "#fff5f5" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
              >
                <LogOut size={16} /> Logout
              </motion.button>
            </div>

          </div>
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
    background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
    padding: "20px",
    fontFamily: "'Inter', sans-serif"
  },
  loadingContainer: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#a0aec0"
  },
  spinner: {
    width: "40px",
    height: "40px",
    border: "4px solid #e2e8f0",
    borderTop: "4px solid #6c5ce7",
    borderRadius: "50%",
    marginBottom: "15px"
  },
  card: {
    width: "420px",
    background: "#ffffff",
    borderRadius: "24px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
    overflow: "hidden",
    position: "relative"
  },
  cardHeader: {
    height: "120px",
    background: "linear-gradient(135deg, #6c5ce7, #a29bfe)",
  },
  avatarWrapper: {
    position: "absolute",
    top: "60px",
    left: "50%",
    transform: "translateX(-50%)",
    position: "relative" // Reset for flow, but we use negative margin
  },
  avatar: {
    width: "110px",
    height: "110px",
    borderRadius: "50%",
    background: "#ffffff",
    border: "5px solid #ffffff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "40px",
    fontWeight: "bold",
    color: "#6c5ce7",
    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
    margin: "-60px auto 0" // Pull up into header
  },
  onlineBadge: {
    width: "18px",
    height: "18px",
    background: "#00b894",
    border: "3px solid #ffffff",
    borderRadius: "50%",
    position: "absolute",
    bottom: "5px",
    right: "calc(50% - 40px)"
  },
  content: {
    padding: "20px 30px 40px",
    textAlign: "center"
  },
  name: {
    fontSize: "24px",
    fontWeight: "800",
    color: "#2d3436",
    marginBottom: "8px"
  },
  patientBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 14px",
    borderRadius: "20px",
    background: "#e3f2fd",
    color: "#0984e3",
    fontSize: "13px",
    fontWeight: "600",
    marginBottom: "25px"
  },
  doctorBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 14px",
    borderRadius: "20px",
    background: "#f0fdf4",
    color: "#00b894",
    fontSize: "13px",
    fontWeight: "600",
    marginBottom: "25px"
  },
  detailsList: {
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    marginBottom: "30px"
  },
  detailItem: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    background: "#f8f9fa",
    padding: "12px",
    borderRadius: "12px"
  },
  iconBox: {
    width: "40px",
    height: "40px",
    borderRadius: "10px",
    background: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
  },
  label: {
    fontSize: "12px",
    color: "#a0aec0",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.5px"
  },
  value: {
    fontSize: "15px",
    color: "#2d3436",
    fontWeight: "500"
  },
  actions: {
    display: "flex",
    gap: "15px"
  },
  editBtn: {
    flex: 1,
    padding: "12px",
    borderRadius: "12px",
    border: "none",
    background: "#2d3436",
    color: "white",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px"
  },
  logoutBtn: {
    flex: 1,
    padding: "12px",
    borderRadius: "12px",
    border: "2px solid #fee2e2",
    background: "transparent",
    color: "#ef4444",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px"
  }
};