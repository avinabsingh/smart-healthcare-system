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
  padding: "14px 50px",
  background: "var(--nav-bg)",
  backdropFilter: "blur(14px)",
  boxShadow: "0 8px 30px rgba(0,0,0,0.35)",
  position: "sticky",
  top: 0,
  zIndex: 100,
  borderBottom: "1px solid rgba(255,255,255,0.08)"
};

const logoStyle = {
  fontWeight: "bold",
  letterSpacing: "1px",
  color: "#00d4ff",
  cursor: "pointer"
};

const menuStyle = {
  display: "flex",
  gap: "22px",
  alignItems: "center"
};

const linkStyle = {
  textDecoration: "none",
  color: "var(--text-color)",
  fontWeight: "600",
  padding: "8px 14px",
  borderRadius: "10px",
  transition: "0.25s ease",
  position: "relative"
};

const logoutBtn = {
  padding: "8px 16px",
  borderRadius: "10px",
  border: "none",
  background: "linear-gradient(45deg,#ff416c,#ff4b2b)",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "0.3s ease",
  boxShadow: "0 5px 15px rgba(255,75,43,0.4)"
};
