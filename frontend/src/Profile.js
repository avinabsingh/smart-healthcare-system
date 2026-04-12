import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Mail, Shield, Stethoscope, 
  Edit3, LogOut, MapPin, ChevronRight,
  Award, Clock, Calendar, Activity
} from "lucide-react";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("details");

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
    window.location.href = "/";
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          style={styles.spinner}
        />
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ fontWeight: 600, color: "#6366f1" }}
        >
          Loading your profile...
        </motion.p>
      </div>
    );
  }

  if (!user) return null;
  const isDoctor = user.role === "doctor";

  const containerVars = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, y: 0,
      transition: { duration: 0.8, type: "spring", bounce: 0.4 }
    }
  };

  const itemVars = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  return (
    <>
      <Navbar />
      <div style={styles.page}>
        {/* Animated Background Elements */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1.5, 1.2, 1],
            rotate: [0, 180, 360],
            x: [0, 100, -100, 0],
            y: [0, -50, 50, 0]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={styles.bgBlob1} 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, -180, -360],
            x: [0, -100, 100, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          style={styles.bgBlob2} 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          style={styles.bgParticle}
        />

        <motion.div 
          variants={containerVars}
          initial="hidden"
          animate="visible"
          style={styles.card}
        >
          {/* Header with animated gradient */}
          <div style={isDoctor ? styles.headerDoctor : styles.headerPatient}>
            <div style={styles.headerOverlay} />
            <motion.div 
              animate={{ x: [-100, 100] }}
              transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
              style={styles.headerShine}
            />
          </div>

          <div style={styles.content}>
            {/* Avatar Section with ring animation */}
            <div style={styles.avatarContainer}>
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                animate={{ 
                  boxShadow: [
                    "0 20px 25px -5px rgba(99, 102, 241, 0.1)",
                    "0 25px 35px -5px rgba(99, 102, 241, 0.3)",
                    "0 20px 25px -5px rgba(99, 102, 241, 0.1)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                style={styles.avatarRing}
              >
                <div style={styles.avatar}>
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </motion.div>
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={styles.onlineBadge} 
              />
            </div>

            <div style={{ marginTop: "50px" }}>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={styles.name}
              >
                {user.name}
              </motion.h2>
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                style={isDoctor ? styles.doctorBadge : styles.patientBadge}
              >
                {isDoctor ? <Stethoscope size={14} /> : <User size={14} />}
                {isDoctor ? "Medical Professional" : "Verified Patient"}
              </motion.div>
            </div>

            {/* Tabs */}
            <div style={styles.tabs}>
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab("details")}
                style={{
                  ...styles.tab,
                  ...(activeTab === "details" ? styles.activeTab : {})
                }}
              >
                <User size={16} />
                Details
              </motion.button>
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab("stats")}
                style={{
                  ...styles.tab,
                  ...(activeTab === "stats" ? styles.activeTab : {})
                }}
              >
                <Activity size={16} />
                Stats
              </motion.button>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === "details" && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  style={styles.detailsList}
                >
                  <motion.div variants={itemVars} style={styles.detailItem}>
                    <div style={styles.iconBox}>
                      <Mail size={18} color="#6366f1" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={styles.label}>Email Address</label>
                      <div style={styles.value}>{user.email}</div>
                    </div>
                  </motion.div>

                  {isDoctor && (
                    <motion.div variants={itemVars} style={styles.detailItem}>
                      <div style={styles.iconBox}>
                        <Shield size={18} color="#10b981" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={styles.label}>Specialty</label>
                        <div style={styles.value}>{user.specialty || "General Physician"}</div>
                      </div>
                    </motion.div>
                  )}

                  <motion.div variants={itemVars} style={styles.detailItem}>
                    <div style={styles.iconBox}>
                      <MapPin size={18} color="#f59e0b" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={styles.label}>Region</label>
                      <div style={styles.value}>Global Access</div>
                    </div>
                    <ChevronRight size={16} color="#cbd5e1" />
                  </motion.div>

                  <motion.div variants={itemVars} style={styles.detailItem}>
                    <div style={styles.iconBox}>
                      <Calendar size={18} color="#8b5cf6" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={styles.label}>Member Since</label>
                      <div style={styles.value}>January 2024</div>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {activeTab === "stats" && (
                <motion.div
                  key="stats"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  style={styles.statsGrid}
                >
                  <motion.div whileHover={{ y: -5 }} style={styles.statCard}>
                    <Award size={24} color="#6366f1" />
                    <div style={styles.statValue}>12</div>
                    <div style={styles.statLabel}>Appointments</div>
                  </motion.div>
                  <motion.div whileHover={{ y: -5 }} style={styles.statCard}>
                    <Clock size={24} color="#10b981" />
                    <div style={styles.statValue}>98%</div>
                    <div style={styles.statLabel}>Attendance</div>
                  </motion.div>
                  <motion.div whileHover={{ y: -5 }} style={styles.statCard}>
                    <Activity size={24} color="#f59e0b" />
                    <div style={styles.statValue}>4.8</div>
                    <div style={styles.statLabel}>Rating</div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Actions */}
            <div style={styles.actions}>
              <motion.button 
                style={styles.editBtn}
                whileHover={{ 
                  y: -3, 
                  boxShadow: "0 20px 25px -5px rgba(99, 102, 241, 0.4)",
                  background: "#2d3a5c"
                }}
                whileTap={{ scale: 0.97 }}
              >
                <Edit3 size={16} /> Edit Profile
              </motion.button>

              <motion.button 
                style={styles.logoutBtn}
                whileHover={{ 
                  backgroundColor: "#fee2e2",
                  borderColor: "#fca5a5",
                  scale: 1.02
                }}
                whileTap={{ scale: 0.97 }}
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

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "20px",
    fontFamily: "'Inter', 'Plus Jakarta Sans', sans-serif",
    position: "relative",
    overflow: "hidden"
  },
  bgBlob1: {
    position: "absolute",
    width: "600px",
    height: "600px",
    background: "linear-gradient(135deg, rgba(99, 102, 241, 0.3) 0%, rgba(139, 92, 246, 0.3) 100%)",
    borderRadius: "50%",
    filter: "blur(100px)",
    zIndex: 0,
    top: "-20%",
    right: "-10%"
  },
  bgBlob2: {
    position: "absolute",
    width: "500px",
    height: "500px",
    background: "linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%)",
    borderRadius: "50%",
    filter: "blur(100px)",
    zIndex: 0,
    bottom: "-20%",
    left: "-10%"
  },
  bgParticle: {
    position: "absolute",
    width: "200px",
    height: "200px",
    background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
    borderRadius: "50%",
    zIndex: 0,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  loadingContainer: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "1.5rem",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  },
  spinner: {
    width: "60px",
    height: "60px",
    border: "4px solid rgba(255, 255, 255, 0.2)",
    borderTop: "4px solid #ffffff",
    borderRight: "4px solid #ffffff",
    borderRadius: "50%"
  },
  card: {
    width: "100%",
    maxWidth: "480px",
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(20px)",
    borderRadius: "40px",
    boxShadow: "0 40px 60px -20px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)",
    overflow: "hidden",
    zIndex: 1,
    position: "relative"
  },
  headerDoctor: {
    height: "160px",
    background: "linear-gradient(135deg, #06b6d4 0%, #10b981 50%, #059669 100%)",
    position: "relative",
    overflow: "hidden"
  },
  headerPatient: {
    height: "160px",
    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%)",
    position: "relative",
    overflow: "hidden"
  },
  headerOverlay: {
    position: "absolute",
    inset: 0,
    background: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.05\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
    opacity: 0.1
  },
  headerShine: {
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "100%",
    height: "100%",
    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
    transform: "skewX(-20deg)"
  },
  content: {
    padding: "0 32px 40px",
    textAlign: "center",
    position: "relative"
  },
  avatarContainer: {
    position: "absolute",
    top: "-70px",
    left: "50%",
    transform: "translateX(-50%)",
  },
  avatarRing: {
    width: "130px",
    height: "130px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6, #d946ef)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "4px"
  },
  avatar: {
    width: "122px",
    height: "122px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "48px",
    fontWeight: "800",
    color: "#6366f1",
    boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)",
    cursor: "pointer"
  },
  onlineBadge: {
    width: "24px",
    height: "24px",
    background: "#10b981",
    border: "4px solid #ffffff",
    borderRadius: "50%",
    position: "absolute",
    bottom: "8px",
    right: "8px",
    boxShadow: "0 0 0 2px rgba(16, 185, 129, 0.3)"
  },
  name: {
    fontSize: "32px",
    fontWeight: "800",
    background: "linear-gradient(135deg, #1e293b, #334155)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    color: "transparent",
    marginBottom: "12px",
    letterSpacing: "-0.5px"
  },
  doctorBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 20px",
    borderRadius: "20px",
    background: "linear-gradient(135deg, #ecfdf5, #d1fae5)",
    color: "#059669",
    fontSize: "13px",
    fontWeight: "700",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
  },
  patientBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 20px",
    borderRadius: "20px",
    background: "linear-gradient(135deg, #eef2ff, #e0e7ff)",
    color: "#4f46e5",
    fontSize: "13px",
    fontWeight: "700",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
  },
  tabs: {
    display: "flex",
    gap: "8px",
    padding: "8px",
    background: "#f1f5f9",
    borderRadius: "24px",
    margin: "32px 0 24px"
  },
  tab: {
    flex: 1,
    padding: "10px",
    borderRadius: "20px",
    border: "none",
    background: "transparent",
    color: "#64748b",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "all 0.3s ease"
  },
  activeTab: {
    background: "#ffffff",
    color: "#6366f1",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
  },
  detailsList: {
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    margin: "24px 0"
  },
  detailItem: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    padding: "16px",
    borderRadius: "24px",
    background: "rgba(255, 255, 255, 0.8)",
    transition: "all 0.3s ease",
    cursor: "pointer",
    border: "1px solid rgba(99, 102, 241, 0.1)"
  },
  iconBox: {
    width: "48px",
    height: "48px",
    borderRadius: "20px",
    background: "linear-gradient(135deg, #ffffff, #f8fafc)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
    transition: "all 0.3s ease"
  },
  label: {
    fontSize: "11px",
    color: "#94a3b8",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginBottom: "4px",
    display: "block"
  },
  value: {
    fontSize: "15px",
    color: "#334155",
    fontWeight: "600"
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "12px",
    margin: "24px 0"
  },
  statCard: {
    padding: "20px 12px",
    background: "rgba(255, 255, 255, 0.8)",
    borderRadius: "24px",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.3s ease",
    border: "1px solid rgba(99, 102, 241, 0.1)"
  },
  statValue: {
    fontSize: "24px",
    fontWeight: "800",
    color: "#1e293b",
    marginTop: "8px"
  },
  statLabel: {
    fontSize: "11px",
    color: "#94a3b8",
    fontWeight: "600",
    textTransform: "uppercase",
    marginTop: "4px"
  },
  actions: {
    display: "flex",
    gap: "12px",
    marginTop: "8px"
  },
  editBtn: {
    flex: 2,
    padding: "14px",
    borderRadius: "24px",
    border: "none",
    background: "#1e293b",
    color: "white",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "all 0.3s ease"
  },
  logoutBtn: {
    flex: 1,
    padding: "14px",
    borderRadius: "24px",
    border: "2px solid #fee2e2",
    background: "transparent",
    color: "#ef4444",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "all 0.3s ease"
  }
};