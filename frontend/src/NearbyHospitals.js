import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, ArrowLeft, Navigation, Hospital, ExternalLink } from "lucide-react";

export default function NearbyHospitals() {
  const navigate = useNavigate();
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude: lat, longitude: lng } = pos.coords;

      try {
        // OpenStreetMap Overpass API - 5km radius
        const res = await fetch(
          `https://overpass-api.de/api/interpreter?data=[out:json];node(around:5000,${lat},${lng})["amenity"="hospital"];out;`
        );
        const data = await res.json();
        setHospitals(data.elements || []);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setLoading(false);
      }
    });
  }, []);

  return (
    <div style={styles.pageWrapper}>
      {/* Background visual element */}
      <div style={styles.backgroundMesh} />
      
      <header style={styles.header}>
        <motion.button 
          whileHover={{ scale: 1.05, backgroundColor: "#f3f0ff" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)} 
          style={styles.backBtn}
        >
          <div style={styles.backIconCircle}>
            <ArrowLeft size={16} color="#6c5ce7" />
          </div>
          <span style={styles.backBtnText}>Return to Dashboard</span>
        </motion.button>

        <h1 style={styles.title}>
          Medical <span style={styles.accentText}>Locator</span>
        </h1>
        <p style={styles.subtitle}>Discover specialized healthcare facilities within 5km radius</p>
      </header>

      <main style={styles.container}>
        {loading ? (
          <div style={styles.statusBox}>
            <motion.div 
              animate={{ rotate: 360, scale: [1, 1.2, 1] }} 
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <Navigation size={48} color="#6c5ce7" />
            </motion.div>
            <p style={styles.statusText}>Scanning your surroundings...</p>
          </div>
        ) : hospitals.length === 0 ? (
          <div style={styles.statusBox}>
            <Hospital size={48} color="#dfe6e9" />
            <p style={styles.statusText}>No facilities found in this area.</p>
          </div>
        ) : (
          <div style={styles.grid}>
            {hospitals.map((h, i) => (
              <motion.div 
                key={i} 
                style={styles.card}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -12 }}
                transition={{ delay: i * 0.05, type: "spring", stiffness: 100 }}
              >
                <div style={styles.cardHeader}>
                  <div style={styles.categoryBadge}>HOSPITAL</div>
                  <div style={styles.iconContainer}>
                    <Hospital size={24} color="#6c5ce7" />
                  </div>
                </div>
                
                <div style={styles.cardContent}>
                  <h3 style={styles.hospitalName}>{h.tags?.name || "Medical Center"}</h3>
                  <div style={styles.infoRow}>
                    <MapPin size={16} color="#6c5ce7" />
                    <span style={styles.coords}>
                      {h.lat.toFixed(3)}°N, {h.lon.toFixed(3)}°E
                    </span>
                  </div>
                </div>

                <div style={styles.actionArea}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={styles.primaryBtn}
                    onClick={() => window.open(`https://www.google.com/maps?q=${h.lat},${h.lon}`, "_blank")}
                  >
                    <span>Get Directions</span>
                    <ExternalLink size={16} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

const styles = {
  pageWrapper: { 
    minHeight: "100vh", 
    backgroundColor: "#f8f9ff", 
    padding: "60px 8%", 
    position: "relative",
    overflowX: "hidden",
    fontFamily: "'Inter', sans-serif"
  },
  backgroundMesh: {
    position: "absolute",
    top: -100,
    right: -100,
    width: "500px",
    height: "500px",
    background: "radial-gradient(circle, rgba(108,92,231,0.08) 0%, rgba(255,255,255,0) 70%)",
    zIndex: 0
  },
  header: { 
    position: "relative", 
    zIndex: 1, 
    marginBottom: "50px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start" 
  },
  backBtn: { 
    background: "rgba(255, 255, 255, 0.7)", 
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(108, 92, 231, 0.2)",
    color: "#2d3436", 
    display: "flex", 
    alignItems: "center", 
    gap: "12px", 
    cursor: "pointer", 
    padding: "8px 20px 8px 8px",
    borderRadius: "100px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.04)",
    marginBottom: "40px",
    transition: "all 0.3s ease",
  },
  backIconCircle: {
    width: "36px",
    height: "36px",
    backgroundColor: "#fff",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 6px rgba(108, 92, 231, 0.1)"
  },
  backBtnText: {
    fontSize: "13px",
    fontWeight: "800",
    color: "#636e72",
    letterSpacing: "0.5px",
    textTransform: "uppercase"
  },
  title: { fontSize: "56px", fontWeight: "900", color: "#1a1a1a", letterSpacing: "-2px", margin: 0 },
  accentText: { color: "#6c5ce7" },
  subtitle: { color: "#636e72", fontSize: "18px", fontWeight: "500", marginTop: "12px" },

  container: { position: "relative", zIndex: 1 },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "30px",
  },
  card: {
    background: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(12px)",
    borderRadius: "35px",
    padding: "30px",
    border: "1px solid rgba(255, 255, 255, 0.6)",
    boxShadow: "0 20px 50px rgba(0,0,0,0.04)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: "280px"
  },
  cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" },
  categoryBadge: { 
    background: "#f0eeff", 
    color: "#6c5ce7", 
    fontSize: "11px", 
    fontWeight: "800", 
    padding: "6px 14px", 
    borderRadius: "100px",
    letterSpacing: "1px"
  },
  iconContainer: {
    width: "48px",
    height: "48px",
    background: "#fff",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 8px 15px rgba(108,92,231,0.1)"
  },
  hospitalName: { fontSize: "22px", fontWeight: "800", color: "#2d3436", margin: "0 0 10px 0", lineHeight: 1.2 },
  infoRow: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" },
  coords: { color: "#b2bec3", fontSize: "14px", fontWeight: "600" },
  
  primaryBtn: {
    width: "100%",
    padding: "16px",
    borderRadius: "20px",
    border: "none",
    background: "#1a1a1a",
    color: "#fff",
    fontWeight: "700",
    fontSize: "14px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  },
  statusBox: { 
    textAlign: "center", 
    marginTop: "100px", 
    display: "flex", 
    flexDirection: "column", 
    alignItems: "center", 
    gap: "20px" 
  },
  statusText: { fontSize: "20px", fontWeight: "700", color: "#b2bec3" }
};