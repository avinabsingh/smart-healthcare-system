import Navbar from "./Navbar";
import { useEffect, useState } from "react";

export default function Profile() {

  const [user, setUser] = useState(null);

  useEffect(() => {

    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/auth/profile", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setUser(data);
      });

  }, []);

  if (!user) {
    return <h3 style={{ textAlign: "center", marginTop: "50px" }}>
      Loading Profile...
    </h3>;
  }

  return (
    <>
      <Navbar />

      <div className="center">

        <div className="glass" style={profileCard}>

          <div style={avatar}>
            {user.name.charAt(0).toUpperCase()}
          </div>

          <h2 style={{ marginTop: "10px" }}>
            {user.name}
          </h2>

          <p style={{ opacity: "0.7" }}>
            {user.email}
          </p>

          <div style={user.role === "doctor" ? doctorBadge : patientBadge}>
            {user.role === "doctor" ? "Doctor Account" : "Patient Account"}
          </div>

          <button style={{ marginTop: "15px" }}>
            Edit Profile
          </button>

        </div>

      </div>
    </>
  );
}




const profileCard = {
  width: "360px",
  textAlign: "center",
  animation: "fadeIn 0.7s ease"
};

const avatar = {
  width: "90px",
  height: "90px",
  borderRadius: "50%",
  background: "linear-gradient(45deg,#00d4ff,#008cff)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "40px",
  fontWeight: "bold",
  margin: "auto"
};

const patientBadge = {
  marginTop: "12px",
  padding: "6px 15px",
  borderRadius: "20px",
  background: "rgba(0,212,255,0.25)",
  color: "#00d4ff",
  display: "inline-block",
  fontSize: "14px"
};

const doctorBadge = {
  marginTop: "12px",
  padding: "6px 15px",
  borderRadius: "20px",
  background: "rgba(255,165,0,0.25)",
  color: "orange",
  display: "inline-block",
  fontSize: "14px"
};
