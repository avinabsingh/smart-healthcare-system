import { motion } from "framer-motion";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
  const [specialty, setSpecialty] = useState("General Physician"); // Default specialty
  const [time, setTime] = useState(new Date());

  const navigate = useNavigate();
  const medify = "Medify".split("");

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = time.getHours();
    if (hour < 12) return "Good Morning ☀️";
    if (hour < 18) return "Good Afternoon 🌤️";
    return "Good Evening 🌙";
  };

  const registerUser = async () => {
    if (!name || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/register", {
        name,
        email,
        password,
        role,
        // Only send specialty if role is doctor
        specialty: role === "doctor" ? specialty : undefined 
      });

      alert("Registration successful! Please login.");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Registration failed. Try again.");
    }
  };

  return (
    <div style={styles.container}>

      <div style={styles.left}>
        {/* Background decorative blur */}
        <div style={styles.blurCircle}></div>

        {/* Hanging Medify Animation */}
        <div style={styles.medifyContainer}>
          {medify.map((letter, index) => (
            <div key={index} style={styles.letterWrapper}>
              <div style={styles.string}></div>
              <motion.span
                style={styles.letter}
                animate={{ 
                  y: [0, -8, 0],
                  rotate: index % 2 === 0 ? [-3, 3, -3] : [3, -3, 3] 
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.5 + index * 0.15,
                  ease: "easeInOut"
                }}
              >
                {letter}
              </motion.span>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ zIndex: 2, textAlign: "center" }}
        >
          <h1 style={styles.greeting}>{getGreeting()}</h1>
          <h2 style={styles.brandTitle}>Smart Healthcare</h2>
          <p style={styles.brandText}>
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </p>
        </motion.div>

        <svg style={styles.wave} viewBox="0 0 1440 320">
          <motion.path
            fill="rgba(255, 255, 255, 0.08)"
            animate={{ x: [0, -200, 0] }}
            transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
            d="M0,160L60,176C120,192,240,224,360,208C480,192,600,128,720,122.7C840,117,960,171,1080,181.3C1200,192,1320,160,1380,144L1440,128V320H0Z"
          />
          <motion.path
            fill="rgba(255, 255, 255, 0.12)"
            animate={{ x: [0, 200, 0] }}
            transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
            d="M0,224L60,213.3C120,203,240,181,360,181.3C480,181,600,203,720,224C840,245,960,267,1080,261.3C1200,256,1320,224,1380,208L1440,192V320H0Z"
          />
        </svg>
      </div>

      <div style={styles.right}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={styles.formCard}
        >
          <div style={styles.formHeader}>
            <h2 style={styles.heading}>Create Account</h2>
            <p style={styles.subHeading}>Join our platform as a patient or doctor.</p>
          </div>

          <div style={styles.inputGroup}>
            <motion.input 
              whileFocus={{ scale: 1.02, borderColor: "#667eea", boxShadow: "0 0 0 4px rgba(102, 126, 234, 0.15)" }}
              style={styles.input} 
              placeholder="Full Name"
              onChange={e => setName(e.target.value)} 
            />

            <motion.input 
              whileFocus={{ scale: 1.02, borderColor: "#667eea", boxShadow: "0 0 0 4px rgba(102, 126, 234, 0.15)" }}
              style={styles.input} 
              placeholder="Email Address"
              onChange={e => setEmail(e.target.value)} 
            />

            <motion.input 
              whileFocus={{ scale: 1.02, borderColor: "#667eea", boxShadow: "0 0 0 4px rgba(102, 126, 234, 0.15)" }}
              style={styles.input} 
              type="password" 
              placeholder="Password"
              onChange={e => setPassword(e.target.value)} 
            />

            <div style={styles.row}>
              <motion.select 
                whileFocus={{ scale: 1.02, borderColor: "#667eea", boxShadow: "0 0 0 4px rgba(102, 126, 234, 0.15)" }}
                style={{ ...styles.input, flex: 1, cursor: "pointer" }}
                onChange={(e) => setRole(e.target.value)}
                value={role}
              >
                <option value="patient">Register as Patient</option>
                <option value="doctor">Register as Doctor</option>
              </motion.select>
            </div>

            {/* CONDITIONAL RENDER: Only show if role is Doctor */}
            <motion.div 
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ 
                opacity: role === "doctor" ? 1 : 0, 
                height: role === "doctor" ? "auto" : 0,
                marginTop: role === "doctor" ? "5px" : 0
              }}
              style={{ overflow: "hidden" }}
            >
              <label style={styles.label}>Select Specialization</label>
              <motion.select 
                whileFocus={{ scale: 1.02, borderColor: "#667eea", boxShadow: "0 0 0 4px rgba(102, 126, 234, 0.15)" }}
                style={{...styles.input, cursor: "pointer"}}
                onChange={(e) => setSpecialty(e.target.value)}
                value={specialty}
              >
                <option value="General Physician">General Physician</option>
                <option value="Cardiologist">Cardiologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Pediatrician">Pediatrician</option>
                <option value="Orthopedic">Orthopedic</option>
              </motion.select>
            </motion.div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0 8px 20px rgba(102, 126, 234, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            style={styles.button}
            onClick={registerUser}
          >
            Create Account
          </motion.button>
          
          <p style={styles.loginText}>
            Already have an account? <Link to="/" style={styles.loginLink}>Login here</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },

  left: {
    flex: 1,
    background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },

  blurCircle: {
    position: "absolute",
    width: "400px",
    height: "400px",
    background: "radial-gradient(circle, rgba(102,126,234,0.15) 0%, rgba(0,0,0,0) 70%)",
    borderRadius: "50%",
    top: "20%",
    left: "10%",
    zIndex: 1,
  },

  greeting: {
    fontSize: "24px",
    fontWeight: "500",
    marginBottom: "12px",
    color: "#a5b4fc",
    letterSpacing: "0.5px",
  },

  brandTitle: {
    fontSize: "48px",
    fontWeight: "800",
    margin: "0",
    background: "-webkit-linear-gradient(45deg, #fff, #a5b4fc)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  brandText: {
    fontSize: "20px",
    marginTop: "16px",
    opacity: 0.8,
    fontWeight: "300",
    fontFamily: "monospace",
    letterSpacing: "2px",
  },

  wave: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "200%",
    zIndex: 1,
  },

  right: {
    flex: 1,
    background: "#f4f7fe",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflowY: "auto",
  },

  formCard: {
    width: "440px",
    background: "white",
    padding: "48px",
    borderRadius: "24px",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(0,0,0,0.02)",
    display: "flex",
    flexDirection: "column",
    margin: "40px 0",
  },

  formHeader: {
    marginBottom: "28px",
  },

  heading: {
    fontSize: "30px",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "8px",
    marginTop: "0",
  },

  subHeading: {
    color: "#64748b",
    fontSize: "15px",
    margin: "0",
  },

  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    marginBottom: "28px",
  },

  input: {
    padding: "16px 20px",
    borderRadius: "12px",
    border: "2px solid #e2e8f0",
    background: "#f8fafc",
    fontSize: "15px",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    transition: "border-color 0.2s ease, background 0.2s ease",
    color: "#334155",
    fontWeight: "500",
  },

  row: { 
    display: "flex", 
    gap: "10px" 
  },

  label: { 
    fontSize: "13px", 
    fontWeight: "600", 
    color: "#64748b", 
    marginBottom: "8px", 
    display: "block",
    paddingLeft: "4px"
  },

  button: {
    padding: "16px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    fontWeight: "600",
    fontSize: "16px",
    cursor: "pointer",
    boxShadow: "0 4px 14px rgba(102, 126, 234, 0.25)",
    transition: "box-shadow 0.2s ease",
  },

  loginText: {
    marginTop: "24px",
    fontSize: "15px",
    color: "#64748b",
    textAlign: "center",
  },

  loginLink: {
    color: "#667eea", 
    fontWeight: "600", 
    textDecoration: "none",
    marginLeft: "4px"
  },

  medifyContainer: {
    position: "absolute",
    top: "40px",
    display: "flex",
    gap: "18px",
    zIndex: 2,
  },

  letterWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  string: {
    width: "2px",
    height: "45px",
    background: "linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(255,255,255,0.8))",
    borderRadius: "2px",
  },

  letter: {
    fontSize: "36px",
    fontWeight: "800",
    color: "white",
    textShadow: "0 4px 12px rgba(0,0,0,0.3)",
    transformOrigin: "top center",
  },
};