import { motion } from "framer-motion";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {

  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [role,setRole]=useState("patient");

  const navigate = useNavigate();

  const registerUser = async () => {

    if(!name || !email || !password){
      alert("Fill all fields");
      return;
    }

    await axios.post("http://localhost:5000/api/register",{
      name,
      email,
      password,
      role
    });

    alert("Registration successful!");
    navigate("/");
  };

  return (
    <div className="center-box">

      <motion.div
        initial={{scale:0.8}}
        animate={{scale:1}}
        transition={{duration:0.5}}
        className="glass-card"
        style={{width:"350px"}}
      >

        <h2>Create Account</h2>

        <input className="input-box"
          placeholder="Name"
          onChange={e=>setName(e.target.value)}
        />

        <input className="input-box"
          placeholder="Email"
          onChange={e=>setEmail(e.target.value)}
        />

        <input className="input-box"
          type="password"
          placeholder="Password"
          onChange={e=>setPassword(e.target.value)}
        />

   
        <select
          className="input-box"
          onChange={(e)=>setRole(e.target.value)}
        >
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
        </select>

        <button className="btn" onClick={registerUser}>
          Register
        </button>

      </motion.div>

    </div>
  );
}
