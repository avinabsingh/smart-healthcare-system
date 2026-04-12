import { motion } from "framer-motion";
import { 
  Heart, Mail, Phone, MapPin, 
  Github, Linkedin, Twitter, 
  ChevronRight, Activity 
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Platform",
      links: [
        { name: "Dashboard", path: "/dashboard" },
        { name: "AI Assistant", path: "/chatbot" },
        { name: "Risk Analysis", path: "/risk" },
        { name: "Hospital Locator", path: "/hospitals" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", path: "/help" },
        { name: "Terms of Service", path: "/terms" },
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Emergency Protocol", path: "/sos-info" },
      ],
    },
  ];

  return (
    <footer style={styles.footerContainer}>
      <div style={styles.mainFooter}>
        {/* Brand Column */}
        <div style={styles.brandColumn}>
          <div style={styles.logoArea}>
            <Activity size={28} color="#6c5ce7" />
            <h2 style={styles.logoText}>Health<span style={{ color: "#6c5ce7" }}>Care</span></h2>
          </div>
          <p style={styles.brandDesc}>
            Integrating artificial intelligence with emergency response systems 
            to provide a safer, smarter healthcare experience for everyone.
          </p>
          <div style={styles.socialIcons}>
            <SocialIcon icon={<Github size={18} />} />
            <SocialIcon icon={<Linkedin size={18} />} />
            <SocialIcon icon={<Twitter size={18} />} />
          </div>
        </div>

        {/* Dynamic Link Columns */}
        {footerLinks.map((group, idx) => (
          <div key={idx} style={styles.linkColumn}>
            <h4 style={styles.columnTitle}>{group.title}</h4>
            <ul style={styles.linkList}>
              {group.links.map((link, lIdx) => (
                <motion.li 
                  key={lIdx}
                  whileHover={{ x: 5, color: "#6c5ce7" }}
                  style={styles.linkItem}
                  onClick={() => navigate(link.path)}
                >
                  <ChevronRight size={14} style={styles.chevron} />
                  {link.name}
                </motion.li>
              ))}
            </ul>
          </div>
        ))}

        {/* Contact Column */}
        <div style={styles.linkColumn}>
          <h4 style={styles.columnTitle}>Contact Us</h4>
          <div style={styles.contactInfo}>
            <div style={styles.contactRow}>
              <Mail size={16} color="#6c5ce7" />
              <span>supportsmarthealth@gmail.com</span>
            </div>
            <div style={styles.contactRow}>
              <Phone size={16} color="#6c5ce7" />
              <span>+91 98765 43210</span>
            </div>
            <div style={styles.contactRow}>
              <MapPin size={16} color="#6c5ce7" />
              <span>New Delhi, India</span>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.bottomBar}>
        <p style={styles.copyright}>
          © {currentYear} SmartCare Management System. All rights reserved.
        </p>
        <div style={styles.developedBy}>
          <span>Designed with</span>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <Heart size={14} fill="#ff7675" color="#ff7675" />
          </motion.div>
          <span>by <span style={styles.devName}>Avinab Singh</span></span>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ icon }) {
  return (
    <motion.div 
      whileHover={{ y: -5, backgroundColor: "#6c5ce7", color: "#fff" }}
      style={styles.socialIconBox}
    >
      {icon}
    </motion.div>
  );
}

const styles = {
  footerContainer: {
    backgroundColor: "#fff",
    borderTop: "1px solid #f1f2f6",
    padding: "80px 10% 30px 10%",
    marginTop: "auto",
  },
  mainFooter: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr 1.5fr",
    gap: "60px",
    marginBottom: "60px",
  },
  brandColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  logoArea: { display: "flex", alignItems: "center", gap: "10px" },
  logoText: { fontSize: "24px", fontWeight: "900", margin: 0, color: "#2d3436" },
  brandDesc: { color: "#747d8c", lineHeight: "1.7", fontSize: "15px", maxWidth: "320px" },
  socialIcons: { display: "flex", gap: "12px", marginTop: "10px" },
  socialIconBox: {
    width: "40px", height: "40px", borderRadius: "12px", background: "#f8f9ff",
    display: "flex", alignItems: "center", justifyContent: "center", color: "#636e72",
    cursor: "pointer", transition: "0.3s all"
  },
  linkColumn: { display: "flex", flexDirection: "column", gap: "25px" },
  columnTitle: { fontSize: "18px", fontWeight: "800", color: "#2d3436", margin: 0 },
  linkList: { listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" },
  linkItem: { 
    display: "flex", alignItems: "center", gap: "8px", color: "#747d8c", 
    fontSize: "15px", cursor: "pointer", fontWeight: "500" 
  },
  chevron: { opacity: 0.5 },
  contactInfo: { display: "flex", flexDirection: "column", gap: "18px" },
  contactRow: { display: "flex", alignItems: "center", gap: "12px", color: "#747d8c", fontSize: "15px" },
  bottomBar: {
    paddingTop: "30px", borderTop: "1px solid #f1f2f6", display: "flex",
    justifyContent: "space-between", alignItems: "center"
  },
  copyright: { color: "#a4b0be", fontSize: "14px" },
  developedBy: { display: "flex", alignItems: "center", gap: "8px", color: "#747d8c", fontSize: "14px" },
  devName: { fontWeight: "800", color: "#2d3436" }
};