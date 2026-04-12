import { useState } from "react";
import Navbar from "./Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Thermometer, User, AlertCircle, CheckCircle, Info } from "lucide-react";

export default function RiskPredictor() {
  const [form, setForm] = useState({
    age: "",
    bmi: "",
    bp: "normal",
    sugar: "normal",
    smoking: "no",
  });

  const [result, setResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const calculateRisk = async () => {
    setIsAnalyzing(true);
    try {
      // Simulating a slight delay for "AI thinking" effect
      const res = await fetch("http://localhost:5000/api/risk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          age: Number(form.age),
          bmi: Number(form.bmi),
        }),
      });

      const data = await res.json();
      setTimeout(() => {
        setResult(data);
        setIsAnalyzing(false);
      }, 800);
    } catch (err) {
      alert("Error calculating risk");
      setIsAnalyzing(false);
    }
  };

  const getRiskColor = (level) => {
    if (level === "HIGH") return "#ef4444";
    if (level === "MEDIUM") return "#f59e0b";
    return "#10b981";
  };

  return (
    <div style={styles.page}>
      <Navbar />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={styles.container}
      >
        <div style={styles.header}>
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 3 }}
            style={styles.iconCircle}
          >
            <Activity size={32} color="#6366f1" />
          </motion.div>
          <h2 style={styles.title}>AI Health Risk Predictor</h2>
          <p style={styles.subtitle}>Fill in your vitals for a personalized risk assessment.</p>
        </div>

        <div style={styles.card}>
          <div style={styles.formGrid}>
            <div style={styles.inputGroup}>
              <label style={styles.label}><User size={14} /> Age</label>
              <input name="age" type="number" placeholder="e.g. 25" style={styles.input} onChange={handleChange} />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}><Thermometer size={14} /> BMI</label>
              <input name="bmi" type="number" placeholder="e.g. 22.5" style={styles.input} onChange={handleChange} />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Blood Pressure</label>
              <select name="bp" style={styles.select} onChange={handleChange}>
                <option value="normal">Normal</option>
                <option value="high">High (Hypertension)</option>
              </select>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Blood Sugar</label>
              <select name="sugar" style={styles.select} onChange={handleChange}>
                <option value="normal">Normal</option>
                <option value="high">Elevated</option>
              </select>
            </div>

            <div style={{ ...styles.inputGroup, gridColumn: "span 2" }}>
              <label style={styles.label}>Smoking Habit</label>
              <select name="smoking" style={styles.select} onChange={handleChange}>
                <option value="no">Non-Smoker</option>
                <option value="yes">Active Smoker</option>
              </select>
            </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02, backgroundColor: "#4f46e5" }}
            whileTap={{ scale: 0.98 }}
            style={styles.button}
            onClick={calculateRisk}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? "Analyzing Vitals..." : "Analyze Health Risk"}
          </motion.button>
        </div>

        <AnimatePresence>
          {result && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={{ ...styles.resultCard, borderLeft: `6px solid ${getRiskColor(result.level)}` }}
            >
              <div style={styles.resultHeader}>
                <div>
                  <h3 style={styles.resultLabel}>Analysis Complete</h3>
                  <h4 style={{ ...styles.riskLevel, color: getRiskColor(result.level) }}>
                    {result.level} RISK DETECTED
                  </h4>
                </div>
                <div style={styles.scoreCircle}>
                  <span style={styles.scoreText}>{result.risk}%</span>
                </div>
              </div>
              
              <div style={styles.adviceBox}>
                <Info size={18} color="#64748b" />
                <p style={styles.adviceText}>{result.advice}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    paddingBottom: "50px",
  },
  container: {
    maxWidth: "650px",
    margin: "0 auto",
    padding: "40px 20px",
  },
  header: {
    textAlign: "center",
    marginBottom: "40px",
  },
  iconCircle: {
    width: "64px",
    height: "64px",
    background: "#ffffff",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 16px",
    boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: "8px",
  },
  subtitle: {
    color: "#64748b",
    fontSize: "15px",
  },
  card: {
    background: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(12px)",
    borderRadius: "32px",
    padding: "32px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.05)",
    border: "1px solid rgba(255, 255, 255, 0.4)",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginBottom: "30px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#475569",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  input: {
    padding: "12px 16px",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    fontSize: "15px",
    outline: "none",
    transition: "border-color 0.2s",
    background: "#fdfdfd",
  },
  select: {
    padding: "12px 16px",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    fontSize: "15px",
    background: "#fdfdfd",
    outline: "none",
    cursor: "pointer",
  },
  button: {
    width: "100%",
    padding: "16px",
    borderRadius: "16px",
    border: "none",
    backgroundColor: "#6366f1",
    color: "white",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 10px 15px -3px rgba(99, 102, 241, 0.3)",
    transition: "all 0.3s ease",
  },
  resultCard: {
    marginTop: "30px",
    padding: "24px",
    background: "#ffffff",
    borderRadius: "24px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
  },
  resultHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  resultLabel: {
    fontSize: "14px",
    color: "#94a3b8",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  riskLevel: {
    fontSize: "22px",
    fontWeight: "800",
    marginTop: "4px",
  },
  scoreCircle: {
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    background: "#f8fafc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "4px solid #e2e8f0",
  },
  scoreText: {
    fontSize: "18px",
    fontWeight: "800",
    color: "#1e293b",
  },
  adviceBox: {
    display: "flex",
    gap: "12px",
    padding: "16px",
    background: "#f1f5f9",
    borderRadius: "16px",
  },
  adviceText: {
    fontSize: "14px",
    color: "#475569",
    lineHeight: "1.5",
    margin: 0,
  },
};