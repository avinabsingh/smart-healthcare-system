import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Calendar, Clock, User, FileText, Activity, 
  ArrowRight, TrendingUp, MessageSquare, 
  LogOut, LayoutDashboard, ShieldAlert, Zap, AlertCircle,
  MapPin, Info // Added Info icon for About
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role") || "patient";
  const [stats, setStats] = useState({
  totalUsers: 0,
  totalPatients: 0,
  totalDoctors: 0
});
  const userName = localStorage.getItem("name") || role;
  const [time, setTime] = useState(new Date());

  useEffect(() => {
  const timer = setInterval(() => setTime(new Date()), 1000);
  return () => clearInterval(timer);
}, []);

useEffect(() => {
  if (role === "admin") {
    fetchAdminStats();
  }
}, [role]);



  const fetchAdminStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/admin/stats", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();
      setStats(data);

    } catch (err) {
      console.error("Admin Stats Error:", err);
    }
  };

  // --- SOS BACKEND INTEGRATION ---
  const handleSOSClick = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const locationStr = `Lat: ${position.coords.latitude}, Long: ${position.coords.longitude}`;
          await sendSOS(locationStr);
        },
        async (error) => {
          console.error("Location error:", error);
          await sendSOS("Location access denied by user");
        }
      );
    } else {
      sendSOS("Geolocation not supported");
    }
  };

  const sendSOS = async (locationValue) => {
    try {
      const email = prompt("Enter emergency contact email:");
      if (!email) {
        alert("Email is required to notify your emergency contact!");
        return;
      }
      const res = await fetch("http://localhost:5000/api/sos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ location: locationValue, email }),
      });
      const data = await res.json();
      alert(data.message || "SOS Sent Successfully!");
    } catch (err) {
      console.error("SOS Error:", err);
      alert("Failed to send SOS. Please check your connection.");
    }
  };

  const features = role !== "admin" ? [
  ...(role === "patient" ? [{
    title: "Health Risk Analysis",
    desc: "Our AI-powered engine analyzes your vitals to predict potential health risks before they become issues.",
    path: "/risk",
    icon: <TrendingUp size={32} />,
    color: "#6c5ce7"
  }] : []),

  {
    title: "Smart Appointments",
    desc: "Seamlessly schedule visits with specialists. View your upcoming and past medical consultations in one place.",
    path: role === "doctor" ? "/doctor-appointments" : "/appointment",
    icon: <Calendar size={32} />,
    color: "#00b894"
  },

  {
    title: "Medical Vault",
    desc: "Securely access your lab results, prescriptions, and digital health records with end-to-end encryption.",
    path: role === "doctor" ? "/doctor/upload-records" : "/patient/records",
    icon: <FileText size={32} />,
    color: "#ff7675"
  },

  {
    title: "AI Health Assistant",
    desc: "Got questions? Our 24/7 Health Chatbot provides immediate guidance based on verified medical data.",
    path: "/chatbot",
    icon: <MessageSquare size={32} />,
    color: "#0984e3"
  }

] : [];


  return (
    <div style={styles.dashboardContainer}>
      {/* 1. SIDEBAR */}
      <nav style={styles.sidebar}>
        <div style={styles.logoArea}>
          <h2 style={styles.logoText}>Health<span style={{ color: "#6c5ce7" }}>Care</span></h2>
          <p style={styles.roleTag}>{role.toUpperCase()} PORTAL</p>
        </div>

        <div style={styles.navLinks}>
          <NavItem icon={<LayoutDashboard size={22}/>} label="Dashboard" active onClick={() => navigate("/dashboard")} />
          <NavItem icon={<Activity size={22}/>} label="My Activity" onClick={() => navigate("/my-appointments")} />
          <NavItem icon={<MapPin size={22}/>} label="Nearby Hospitals" onClick={() => navigate("/hospitals")} />
          <NavItem icon={<User size={22}/>} label="My Profile" onClick={() => navigate("/profile")} />
          {/* NEW ABOUT LINK ADDED HERE */}
          <NavItem icon={<Info size={22}/>} label="About Us" onClick={() => navigate("/about")} />

          <NavItem icon={<Clock size={22}/>} label="Reminders" onClick={() => navigate("/reminder")} />
          
          
        </div>



        <div style={{ padding: "0 20px" }}>
           <motion.button 
             style={styles.reminderBtn}
             whileHover={{ scale: 1.02 }}
             whileTap={{ scale: 0.98 }}
             onClick={() => navigate("/reminder")}
           >
             <Clock size={20} color="#fff" />
             <span>Set Reminder</span>
           </motion.button>
        </div>

        {/* --- SOS HUB --- */}
        <div style={styles.sosSection}>
          <div style={styles.sosLabelContainer}>
            <AlertCircle size={14} color="#d63031" />
            <span style={styles.sosStatusText}>Emergency Protocol Active</span>
          </div>
          <div style={styles.sosContainer}>
            <motion.div 
              style={styles.sosRadar}
              animate={{ scale: [1, 1.4], opacity: [0.3, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
            />
            <motion.button 
              style={styles.sosButton}
              whileHover={{ scale: 1.02, backgroundColor: "#c0392b" }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSOSClick}
            >
              <div style={styles.sosIconBox}>
                <ShieldAlert size={28} color="#fff" strokeWidth={2.5} />
              </div>
              <div style={styles.sosTextLabel}>
                <span style={styles.sosMainText}>SEND SOS</span>
                <span style={styles.sosSubText}>Instant Help 24/7</span>
              </div>
              <Zap size={16} style={styles.sosZap} fill="white" />
            </motion.button>
          </div>
        </div>

        <div style={styles.sidebarFooter}>
            <button style={styles.logoutBtn} onClick={() => navigate("/")}>
                <LogOut size={18} /> <span>Sign Out</span>
            </button>
        </div>
      </nav>

      {/* 2. MAIN CONTENT */}
      <main style={styles.mainContent}>
        <header style={styles.header}>
          <div>
            <h1 style={styles.greeting}>Hello, <span style={styles.accentText}>{userName.charAt(0).toUpperCase() + userName.slice(1)}</span></h1>
            <p style={styles.dateDisplay}>{time.toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>
          <div style={styles.clockBox}>
             <Clock size={20} color="#6c5ce7" />
             <span style={styles.timeText}>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </header>

        {role === "admin" && (
          <section style={styles.featureSection}>
            <h3 style={styles.sectionTitle}>Admin Overview</h3>

            <div style={{
              display: "flex",
              gap: "20px",
              marginBottom: "30px"
            }}>
              <div style={styles.adminCard}>
                <h4>Total Users</h4>
                <p>{stats.totalUsers}</p>
              </div>

              <div style={styles.adminCard}>
                <h4>Total Patients</h4>
                <p>{stats.totalPatients}</p>
              </div>

              <div style={styles.adminCard}>
                <h4>Total Doctors</h4>
                <p>{stats.totalDoctors}</p>
              </div>
            </div>
          </section>
        )}

        <section style={styles.featureSection}>
          <h3 style={styles.sectionTitle}>Platform Services</h3>
          <div style={styles.featureColumn}>
            {features.map((item, index) => (
              <motion.div 
                key={index} 
                style={styles.featureRow}
                whileHover={{ x: 12, border: "2px solid #6c5ce7", backgroundColor: "#fff" }}
                onClick={() => navigate(item.path)}
              >
                <div style={{ ...styles.iconBox, backgroundColor: item.color }}>
                  {item.icon}
                </div>
                <div style={styles.textColumn}>
                  <h4 style={styles.featureTitle}>{item.title}</h4>
                  <p style={styles.featureDesc}>{item.desc}</p>
                </div>
                <ArrowRight size={24} color="#dfe6e9" />
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }) {
    return (
        <div 
          onClick={onClick}
          style={{...styles.navItem, color: active ? "#6c5ce7" : "#2d3436", backgroundColor: active ? "#f3f0ff" : "transparent" }}
        >
            {icon} <span>{label}</span>
        </div>
    );
}

const styles = {
  dashboardContainer: { display: "flex", height: "100vh", backgroundColor: "#fbfcfd", overflow: "hidden" },
  sidebar: { width: "340px", backgroundColor: "#fff", borderRight: "1px solid #f0f0f0", display: "flex", flexDirection: "column", padding: "40px 28px" },
  logoArea: { marginBottom: "45px", paddingLeft: "10px" },
  logoText: { fontSize: "28px", fontWeight: "900", margin: 0, color: "#2d3436", letterSpacing: "-0.5px" },
  roleTag: { fontSize: "11px", color: "#6c5ce7", fontWeight: "800", marginTop: "4px", letterSpacing: "1.5px" },
  navLinks: { flex: 1, display: "flex", flexDirection: "column", gap: "10px" },
  navItem: { display: "flex", alignItems: "center", gap: "18px", padding: "16px 20px", borderRadius: "16px", cursor: "pointer", fontWeight: "700", fontSize: "16px", transition: "0.2s cubic-bezier(0.4, 0, 0.2, 1)" },
  sosSection: { margin: "30px 0", padding: "24px", backgroundColor: "#fff5f5", borderRadius: "24px", border: "1px solid #ffe3e3" },
  sosLabelContainer: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" },
  sosStatusText: { fontSize: "11px", fontWeight: "800", color: "#d63031", textTransform: "uppercase", letterSpacing: "0.5px" },
  sosContainer: { position: "relative", width: "100%", height: "90px" },
  sosRadar: { position: "absolute", width: "100%", height: "100%", backgroundColor: "rgba(214, 48, 49, 0.2)", borderRadius: "18px" },
  sosButton: { position: "relative", width: "100%", height: "100%", backgroundColor: "#d63031", border: "none", borderRadius: "18px", display: "flex", alignItems: "center", padding: "0 20px", gap: "18px", cursor: "pointer", boxShadow: "0 10px 30px rgba(214, 48, 49, 0.25)", zIndex: 1 },
  sosIconBox: { width: "52px", height: "52px", backgroundColor: "rgba(255,255,255,0.15)", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center" },
  sosTextLabel: { display: "flex", flexDirection: "column", alignItems: "flex-start" },
  sosMainText: { color: "#fff", fontSize: "20px", fontWeight: "900", letterSpacing: "0.5px" },
  sosSubText: { color: "rgba(255,255,255,0.8)", fontSize: "12px", fontWeight: "600" },
  sosZap: { position: "absolute", top: "12px", right: "12px", opacity: 0.6 },
  sidebarFooter: { paddingTop: "25px", borderTop: "1.5px solid #f8f9fa" },
  logoutBtn: { background: "none", border: "none", color: "#a4b0be", cursor: "pointer", display: "flex", alignItems: "center", gap: "12px", fontWeight: "700", fontSize: "15px" },
  
  /* --- ADJUSTED MAIN CONTENT SIZING --- */
  mainContent: { flex: 1, padding: "40px 60px", overflowY: "auto" }, // Reduced top/bottom padding
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "35px" }, // Reduced bottom margin
  greeting: { fontSize: "42px", fontWeight: "900", margin: 0, color: "#2d3436", letterSpacing: "-1.5px" }, // Slightly smaller greeting
  accentText: { color: "#6c5ce7" },
  dateDisplay: { color: "#a4b0be", fontWeight: "600", fontSize: "16px", marginTop: "8px" },
  clockBox: { padding: "14px 28px", backgroundColor: "#fff", borderRadius: "20px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", display: "flex", gap: "14px", alignItems: "center" },
  timeText: { fontSize: "20px", fontWeight: "800", color: "#2d3436" },
  featureSection: { maxWidth: "1200px" },
  sectionTitle: { fontSize: "22px", fontWeight: "800", marginBottom: "25px", color: "#2d3436", letterSpacing: "1px" }, // Reduced bottom margin
  featureColumn: { display: "flex", flexDirection: "column", gap: "18px" }, // Reduced gap between cards
  
  /* --- ADJUSTED CARD SIZING --- */
  featureRow: { display: "flex", alignItems: "center", backgroundColor: "transparent", padding: "24px 30px", borderRadius: "24px", cursor: "pointer", border: "2px solid #f1f2f6", transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)" }, // Reduced padding and border radius
  iconBox: { width: "64px", height: "64px", borderRadius: "20px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", marginRight: "25px", flexShrink: 0 }, // Shrunk the icon box from 80px to 64px
  textColumn: { flex: 1 },
  featureTitle: { fontSize: "20px", fontWeight: "800", margin: "0 0 6px 0", color: "#2d3436" }, // Slightly smaller title
  featureDesc: { fontSize: "15px", color: "#747d8c", lineHeight: "1.6", margin: 0, maxWidth: "750px" }, // Slightly smaller text
  
  reminderBtn: { 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center", 
    gap: "10px", 
    width: "100%", 
    padding: "14px", 
    background: "linear-gradient(135deg, #fdcb6e, #e17055)", 
    color: "#fff", 
    border: "none", 
    borderRadius: "16px", 
    fontWeight: "700", 
    fontSize: "15px", 
    cursor: "pointer",
    boxShadow: "0 4px 15px rgba(225, 112, 85, 0.3)"
  },
  adminCard: {
  flex: 1,
  padding: "25px",
  backgroundColor: "#ffffff",
  borderRadius: "20px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
  textAlign: "center",
  border: "2px solid #f1f2f6"
},
};