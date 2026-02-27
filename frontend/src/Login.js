import { motion } from "framer-motion";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const loginUser = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      navigate("/dashboard");

    } catch (err) {
      alert("Invalid Credentials or Server Error");
    }
  };

  return (
    <div style={styles.container}>

      <div style={styles.left}>

        {/* Hanging Medify */}
        <div style={styles.medifyContainer}>
          {medify.map((letter, index) => (
            <div key={index} style={styles.letterWrapper}>
              <div style={styles.string}></div>
              <motion.span
                style={styles.letter}
                animate={{ y: [0, -12, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 2 + index * 0.2,
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
          transition={{ duration: 1 }}
          style={{ zIndex: 2 }}
        >
          <h1 style={styles.greeting}>{getGreeting()}</h1>
          <h2 style={styles.brandTitle}>Welcome Back</h2>
          <p style={styles.brandText}>
            {time.toLocaleTimeString()}
          </p>
        </motion.div>

        <svg style={styles.wave} viewBox="0 0 1440 320">
          <motion.path
            fill="#ffffff20"
            animate={{ x: [0, -200, 0] }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            d="M0,160L60,176C120,192,240,224,360,208C480,192,600,128,720,122.7C840,117,960,171,1080,181.3C1200,192,1320,160,1380,144L1440,128V320H0Z"
          />
        </svg>
      </div>

      <div style={styles.right}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={styles.formCard}
        >
          <h2 style={styles.heading}>Login</h2>

          <input style={styles.input} placeholder="Email Address"
            onChange={e => setEmail(e.target.value)} />

          <input style={styles.input} type="password" placeholder="Password"
            onChange={e => setPassword(e.target.value)} />

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={styles.button}
            onClick={loginUser}
          >
            Login
          </motion.button>

          <p style={{ marginTop: "15px", fontSize: "14px" }}>
            New user? <Link to="/signup" style={{ color: "#667eea", fontWeight: "600" }}>Signup</Link>
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
    fontFamily: "Inter, sans-serif",
  },

  left: {
    flex: 1,
    background: "linear-gradient(135deg, #141e30, #243b55)",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },

  greeting: {
    fontSize: "32px",
    fontWeight: "600",
    marginBottom: "10px",
  },

  brandTitle: {
    fontSize: "42px",
    fontWeight: "700",
  },

  brandText: {
    fontSize: "22px",
    marginTop: "10px",
    opacity: 0.9,
  },

  wave: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "200%",
  },

  right: {
    flex: 1,
    background: "#f9fafc",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  formCard: {
    width: "420px",
    background: "white",
    padding: "50px",
    borderRadius: "18px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },

  heading: {
    fontSize: "26px",
    fontWeight: "600",
    marginBottom: "10px",
  },

  input: {
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #e0e0e0",
    fontSize: "14px",
    outline: "none",
  },

  button: {
    padding: "14px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "white",
    fontWeight: "600",
    fontSize: "15px",
    cursor: "pointer",
    marginTop: "10px",
  },
  medifyContainer: {
  position: "absolute",
  top: "30px",
  display: "flex",
  gap: "14px",
},

letterWrapper: {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
},

string: {
  width: "2px",
  height: "35px",
  background: "white",
  opacity: 0.7,
},

letter: {
  fontSize: "34px",
  fontWeight: "700",
  color: "white",
},
};