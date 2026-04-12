import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Zap, 
  BrainCircuit, 
  MapPinned, 
  Clock, 
  Database,
  ArrowLeft
} from "lucide-react";
import Navbar from "./Navbar";

export default function About() {
  const navigate = useNavigate();

  const features = [
    { 
      title: "AI Diagnostics", 
      desc: "Instant health guidance powered by advanced Groq AI models for reliable medical terminology explanation.",
      icon: <BrainCircuit size={24} color="#6c5ce7" />,
      color: "#f3f0ff"
    },
    { 
      title: "SOS Protocol", 
      desc: "Real-time emergency broadcasting that sends your precise GPS coordinates to your primary emergency contacts.",
      icon: <Zap size={24} color="#ff7675" />,
      color: "#fff5f5"
    },
    { 
      title: "Risk Prediction", 
      desc: "Proactive health monitoring that identifies potential risks before they manifest into critical issues.",
      icon: <ShieldCheck size={24} color="#00b894" />,
      color: "#e6fffb"
    },
    { 
      title: "Smart Locator", 
      desc: "Dynamic mapping technology to find and navigate to the nearest medical facility within seconds.",
      icon: <MapPinned size={24} color="#0984e3" />,
      color: "#ebf7ff"
    }
  ];

  return (
    <div style={styles.pageWrapper}>
      <Navbar />
      
      {/* 1. HERO SECTION */}
      <header style={styles.hero}>
        <motion.button 
          whileHover={{ x: -5 }}
          onClick={() => navigate(-1)} 
          style={styles.backBtn}
        >
          <ArrowLeft size={18} /> <span>Back to Dashboard</span>
        </motion.button>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={styles.heroContent}
        >
          <h1 style={styles.mainTitle}>
            Redefining <span style={styles.accentText}>Healthcare</span> with Intelligence
          </h1>
          <p style={styles.heroSubtitle}>
            SmartCare is a comprehensive medical ecosystem designed to bridge the gap 
            between advanced technology and patient well-being. We empower users with 
            real-time data and AI-driven insights.
          </p>
        </motion.div>
      </header>

      <main style={styles.content}>
        {/* 2. FEATURE GRID */}
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>The SmartCare Ecosystem</h2>
          <div style={styles.underline} />
        </div>

        <div style={styles.grid}>
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -10 }}
              style={styles.card}
            >
              <div style={{ ...styles.iconBox, backgroundColor: feature.color }}>
                {feature.icon}
              </div>
              <h3 style={styles.cardTitle}>{feature.title}</h3>
              <p style={styles.cardText}>{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* 3. TECH STACK SECTION */}
        <div style={styles.techSection}>
          <div style={styles.techText}>
            <h2 style={styles.sectionTitle}>Built for Scale</h2>
            <p style={styles.cardText}>
              Utilizing a high-performance MERN stack coupled with Groq's LPU Inference 
              Engine to ensure sub-second response times for medical inquiries.
            </p>
            <div style={styles.badgeContainer}>
              {["React.js", "Node.js", "MongoDB", "Groq AI", "Framer Motion"].map(tech => (
                <span key={tech} style={styles.badge}>{tech}</span>
              ))}
            </div>
          </div>
          <div style={styles.techGraphic}>
             <Database size={120} color="#6c5ce7" strokeWidth={1} style={{ opacity: 0.2 }} />
          </div>
        </div>

        {/* 4. FOOTER */}
        <footer style={styles.footer}>
          <p style={styles.footerText}>Developed with ❤️ by <span style={styles.bold}>Avinab Singh</span></p>
          <p style={styles.version}>Version 2.0.4 • 2026 Stable Build</p>
        </footer>
      </main>
    </div>
  );
}

const styles = {
  pageWrapper: { minHeight: "100vh", backgroundColor: "#fbfcfd", fontFamily: "'Inter', sans-serif" },
  hero: { 
    background: "linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%)",
    padding: "80px 10% 60px 10%",
    borderBottom: "1px solid #f1f2f6"
  },
  backBtn: { 
    background: "none", border: "none", color: "#6c5ce7", display: "flex", 
    alignItems: "center", gap: "8px", fontWeight: "700", cursor: "pointer", marginBottom: "40px" 
  },
  heroContent: { maxWidth: "900px" },
  mainTitle: { fontSize: "64px", fontWeight: "900", color: "#2d3436", letterSpacing: "-2.5px", margin: 0, lineHeight: 1.1 },
  accentText: { color: "#6c5ce7" },
  heroSubtitle: { fontSize: "20px", color: "#636e72", lineHeight: "1.6", marginTop: "24px", maxWidth: "700px" },

  content: { padding: "80px 10%", maxWidth: "1400px", margin: "0 auto" },
  sectionHeader: { marginBottom: "50px" },
  sectionTitle: { fontSize: "32px", fontWeight: "800", color: "#2d3436", marginBottom: "12px" },
  underline: { width: "60px", height: "4px", backgroundColor: "#6c5ce7", borderRadius: "10px" },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "30px",
    marginBottom: "100px"
  },
  card: {
    padding: "40px",
    background: "#fff",
    borderRadius: "32px",
    border: "1px solid #f1f2f6",
    boxShadow: "0 10px 30px rgba(0,0,0,0.02)",
    transition: "all 0.3s ease"
  },
  iconBox: {
    width: "56px", height: "56px", borderRadius: "16px",
    display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px"
  },
  cardTitle: { fontSize: "22px", fontWeight: "800", color: "#2d3436", marginBottom: "12px" },
  cardText: { fontSize: "16px", color: "#747d8c", lineHeight: "1.6" },

  techSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: "60px",
    borderRadius: "40px",
    border: "1px solid #f1f2f6",
    marginBottom: "100px"
  },
  techText: { maxWidth: "600px" },
  badgeContainer: { display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "24px" },
  badge: { 
    padding: "8px 18px", background: "#f8f9ff", border: "1px solid #eef0f7",
    borderRadius: "100px", color: "#6c5ce7", fontSize: "14px", fontWeight: "700" 
  },

  footer: { textAlign: "center", padding: "40px 0" },
  footerText: { color: "#636e72", fontSize: "16px" },
  bold: { fontWeight: "800", color: "#2d3436" },
  version: { color: "#a4b0be", fontSize: "12px", marginTop: "8px", letterSpacing: "1px", textTransform: "uppercase" }
};