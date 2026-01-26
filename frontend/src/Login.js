import { motion } from "framer-motion";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
      console.error(err);
      alert("Invalid Credentials or Server Error");
    }
  };

  return (
    <div className="center-box">
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card"
        style={{ width: "350px" }}
      >
        <h2>Smart Healthcare Login</h2>

        <input className="input-box"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />

        <input className="input-box"
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <button className="btn" onClick={loginUser}>
          Login
        </button>

        <p style={{ marginTop: "10px" }}>
          New user? <Link to="/signup">Signup</Link>
        </p>

      </motion.div>
    </div>
  );
}