import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Home, Calendar, User, LogOut, 
  Moon, Sun, Activity 
} from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle Theme Toggle
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.className = newTheme; // Assuming you have global CSS for .dark/.light
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <motion.nav
      style={{
        ...styles.navbar,
        background: scrolled ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0.8)",
        boxShadow: scrolled ? "0 4px 30px rgba(0, 0, 0, 0.1)" : "none",
        padding: scrolled ? "15px 50px" : "20px 60px"
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      
      {/* Logo Section */}
      <div style={styles.logoContainer} onClick={() => navigate("/dashboard")}>
        <div style={styles.logoIcon}>
          <Activity size={24} color="#ffffff" />
        </div>
        <h3 style={styles.logoText}>
          Smart<span style={{ color: "#6c5ce7" }}>Health</span>
        </h3>
      </div>

      {/* Menu Links */}
      <div style={styles.menu}>
        <NavLink 
          to="/dashboard" 
          icon={<Home size={18} />} 
          text="Dashboard" 
          isActive={location.pathname === "/dashboard"} 
        />
        <NavLink 
          to="/appointment" 
          icon={<Calendar size={18} />} 
          text="Appointments" 
          isActive={location.pathname === "/appointment"} 
        />
        <NavLink 
          to="/profile" 
          icon={<User size={18} />} 
          text="Profile" 
          isActive={location.pathname === "/profile"} 
        />
      </div>

      {/* Right Actions */}
      <div style={styles.actions}>
        
        {/* Theme Toggle */}
        <motion.button 
          style={styles.themeBtn}
          onClick={toggleTheme}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {theme === "dark" ? <Sun size={20} color="#f1c40f" /> : <Moon size={20} color="#2d3436" />}
        </motion.button>

        {/* Logout Button */}
        <motion.button 
          onClick={logout} 
          style={styles.logoutBtn}
          whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(255, 71, 87, 0.3)" }}
          whileTap={{ scale: 0.95 }}
        >
          <LogOut size={18} /> Logout
        </motion.button>
      </div>

    </motion.nav>
  );
}

// NavLink Component for cleaner code
function NavLink({ to, icon, text, isActive }) {
  return (
    <Link 
      to={to} 
      style={{
        ...styles.link,
        color: isActive ? "#6c5ce7" : "#636e72",
        background: isActive ? "rgba(108, 92, 231, 0.1)" : "transparent",
        fontWeight: isActive ? "700" : "500"
      }}
    >
      {icon}
      {text}
    </Link>
  );
}

/* ================= STYLES ================= */

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    backdropFilter: "blur(15px)",
    borderBottom: "1px solid rgba(0,0,0,0.05)",
    transition: "all 0.3s ease-in-out",
    width: "100%",
    boxSizing: "border-box" // Prevents horizontal scroll
  },

  /* Logo */
  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    cursor: "pointer"
  },
  logoIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "10px",
    background: "linear-gradient(135deg, #6c5ce7, #a29bfe)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 10px rgba(108, 92, 231, 0.3)"
  },
  logoText: {
    fontSize: "24px",
    fontWeight: "800",
    color: "#2d3436",
    letterSpacing: "-0.5px",
    margin: 0
  },

  /* Middle Menu */
  menu: {
    display: "flex",
    gap: "10px",
    background: "rgba(0,0,0,0.03)",
    padding: "6px",
    borderRadius: "16px"
  },
  link: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    textDecoration: "none",
    padding: "10px 20px",
    borderRadius: "12px",
    fontSize: "15px",
    transition: "all 0.2s ease",
  },

  /* Right Side */
  actions: {
    display: "flex",
    alignItems: "center",
    gap: "15px"
  },
  themeBtn: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "10px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.2s"
  },
  logoutBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 24px",
    borderRadius: "12px",
    border: "none",
    background: "#ff4757",
    color: "white",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(255, 71, 87, 0.2)",
    transition: "all 0.2s ease"
  }
};