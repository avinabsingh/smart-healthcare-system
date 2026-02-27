import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export default function Navbar() {

  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div style={navStyle}>


      <h3 style={logoStyle}>
        🏥 Smart Healthcare
      </h3>


      <div style={menuStyle}>

        <button className="theme-btn" onClick={toggleTheme}>
          {theme === "dark" ? "☀ Light" : "🌙 Dark"}
        </button>

        <NavItem to="/dashboard" text="Home" />
        <NavItem to="/appointment" text="Appointment" />
        <NavItem to="/profile" text="Profile" />

        <button onClick={logout} style={logoutBtn}>
          Logout
        </button>

      </div>

    </div>
  );
}


function NavItem({ to, text }) {
  return (
    <Link to={to} style={linkStyle}>
      {text}
    </Link>
  );
}


// ==========================
// STYLES
// ==========================

const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px 60px",
  background: "var(--nav-bg)",
  backdropFilter: "blur(20px)",
  boxShadow: "0 10px 40px var(--card-shadow)",
  position: "sticky",
  top: 0,
  zIndex: 100,
  borderBottom: "1px solid var(--card-border)",
  transition: "all 0.3s ease"
};

const logoStyle = {
  fontWeight: "800",
  fontSize: "20px",
  letterSpacing: "2px",
  background: "linear-gradient(45deg,#00d4ff,#6a5acd)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const menuStyle = {
  display: "flex",
  gap: "25px",
  alignItems: "center"
};

const linkStyle = {
  textDecoration: "none",
  color: "var(--text-color)",
  fontWeight: "600",
  padding: "8px 16px",
  borderRadius: "12px",
  transition: "all 0.3s ease",
};

const logoutBtn = {
  padding: "8px 18px",
  borderRadius: "12px",
  border: "none",
  background: "linear-gradient(45deg,#ff416c,#ff4b2b)",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
  boxShadow: "0 6px 18px rgba(255,75,43,0.5)",
  transition: "all 0.3s ease",
};