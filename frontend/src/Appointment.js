import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import axios from "axios";
import { 
  Calendar, Clock, User, Stethoscope, 
  FileText, Activity, Timer, ChevronDown, CheckCircle
} from "lucide-react";

export default function Appointment() {

  const [formData, setFormData] = useState({
    specialty: "",
    doctor: "",
    date: "",
    time: "",
    problem: "",
    duration: "",
    description: ""
  });

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch doctors on mount
  useEffect(() => {
    fetch("http://localhost:5000/api/doctors")
      .then(res => res.json())
      .then(data => {
        setDoctors(data);
        setLoading(false);
      })
      .catch(err => console.error("Error fetching doctors:", err));
  }, []);

  // 1. Get unique specialties from the doctor list
  const specialties = useMemo(() => {
    const specs = doctors.map(doc => doc.specialty).filter(Boolean);
    return [...new Set(specs)];
  }, [doctors]);

  // 2. Filter doctors based on selected specialty
  const availableDoctors = useMemo(() => {
    if (!formData.specialty) return [];
    return doctors.filter(doc => doc.specialty === formData.specialty);
  }, [doctors, formData.specialty]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBooking = async () => {
    const { doctor, date, time, problem, duration } = formData;

    if (!doctor || !date || !time || !problem || !duration) {
      alert("Please fill all required fields");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://localhost:5000/api/appointments",
        { 
          doctorId: doctor, 
          date, 
          time, 
          problem, 
          duration, 
          description: formData.description 
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Appointment Booked Successfully!");
      setFormData({
        specialty: "", doctor: "", date: "", time: "",
        problem: "", duration: "", description: ""
      });

    } catch (err) {
      console.error(err);
      alert("Booking failed. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div style={styles.page}>
        <motion.div
          style={styles.container}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.iconWrapper}>
              <Calendar size={32} color="#6c5ce7" />
            </div>
            <h2 style={styles.title}>Book Appointment</h2>
            <p style={styles.subtitle}>Find the right specialist and schedule your visit</p>
          </div>

          <div style={styles.grid}>
            
            {/* --- Left Column: Doctor Selection --- */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>
                <Stethoscope size={20} color="#6c5ce7" /> 
                Specialist Selection
              </h3>
              
              {/* Specialty Select */}
              <div style={styles.inputGroup}>
                <label style={styles.label}>Type of Disease / Specialty</label>
                <div style={styles.inputWrapper}>
                  <Activity size={18} style={styles.icon} />
                  <select 
                    name="specialty" 
                    value={formData.specialty} 
                    onChange={handleChange} 
                    style={styles.input}
                  >
                    <option value="">Select Department...</option>
                    {specialties.map((spec, index) => (
                      <option key={index} value={spec}>{spec}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} style={styles.arrowIcon} />
                </div>
              </div>

              {/* Doctor Select */}
              <div style={styles.inputGroup}>
                <label style={styles.label}>Choose Doctor</label>
                <div style={styles.inputWrapper}>
                  <User size={18} style={styles.icon} />
                  <select 
                    name="doctor" 
                    value={formData.doctor} 
                    onChange={handleChange} 
                    style={formData.specialty ? styles.input : styles.disabledInput}
                    disabled={!formData.specialty}
                  >
                    <option value="">
                      {formData.specialty ? "Select Doctor..." : "Select Specialty first"}
                    </option>
                    {availableDoctors.map(doc => (
                      <option key={doc._id} value={doc._id}>Dr. {doc.name}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} style={styles.arrowIcon} />
                </div>
              </div>

              {/* Date & Time Row */}
              <div style={styles.row}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Date</label>
                  <div style={styles.inputWrapper}>
                    <Calendar size={18} style={styles.icon} />
                    <input 
                      type="date" 
                      name="date" 
                      value={formData.date} 
                      onChange={handleChange} 
                      style={styles.input} 
                    />
                  </div>
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Time</label>
                  <div style={styles.inputWrapper}>
                    <Clock size={18} style={styles.icon} />
                    <input 
                      type="time" 
                      name="time" 
                      value={formData.time} 
                      onChange={handleChange} 
                      style={styles.input} 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* --- Right Column: Patient Problem --- */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>
                <FileText size={20} color="#6c5ce7" /> 
                Medical Details
              </h3>

              {/* Problem Title */}
              <div style={styles.inputGroup}>
                <label style={styles.label}>Chief Complaint</label>
                <div style={styles.inputWrapper}>
                  <CheckCircle size={18} style={styles.icon} />
                  <input 
                    type="text" 
                    name="problem" 
                    placeholder="e.g. Severe Headache, Fever" 
                    value={formData.problem} 
                    onChange={handleChange} 
                    style={styles.input} 
                  />
                </div>
              </div>

              {/* Duration */}
              <div style={styles.inputGroup}>
                <label style={styles.label}>Duration of Symptoms</label>
                <div style={styles.inputWrapper}>
                  <Timer size={18} style={styles.icon} />
                  <input 
                    type="text" 
                    name="duration" 
                    placeholder="e.g. Since 2 days" 
                    value={formData.duration} 
                    onChange={handleChange} 
                    style={styles.input} 
                  />
                </div>
              </div>

              {/* Description */}
              <div style={styles.inputGroup}>
                <label style={styles.label}>Detailed Description (Optional)</label>
                <div style={styles.inputWrapper}>
                  <FileText size={18} style={{...styles.icon, top: "15px"}} />
                  <textarea 
                    name="description" 
                    placeholder="Describe other symptoms, history, etc..." 
                    value={formData.description} 
                    onChange={handleChange} 
                    style={{...styles.input, height: "100px", resize: "none", alignItems: "flex-start"}} 
                  />
                </div>
              </div>
            </div>

          </div>

          <motion.button
            style={styles.button}
            whileHover={{ scale: 1.02, boxShadow: "0 15px 30px rgba(108, 92, 231, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            onClick={handleBooking}
          >
            Confirm Appointment
          </motion.button>

        </motion.div>
      </div>
    </>
  );
}

/* ================= STYLES ================= */
const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
    padding: "40px",
    fontFamily: "'Inter', 'Segoe UI', sans-serif"
  },
  container: {
    width: "900px",
    background: "#ffffff",
    borderRadius: "24px",
    padding: "50px",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    border: "1px solid rgba(0,0,0,0.05)"
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  iconWrapper: {
    background: "rgba(108, 92, 231, 0.1)",
    padding: "15px",
    borderRadius: "50%",
    marginBottom: "15px"
  },
  title: {
    fontSize: "32px",
    fontWeight: "800",
    color: "#1a202c",
    marginBottom: "8px",
    letterSpacing: "-0.5px"
  },
  subtitle: {
    color: "#718096",
    fontSize: "16px",
    fontWeight: "400"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "50px",
    width: "100%"
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#2d3748",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "10px",
    borderBottom: "2px solid #edf2f7",
    paddingBottom: "10px"
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px"
  },
  label: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#4a5568",
    marginLeft: "4px"
  },
  inputWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center"
  },
  icon: {
    position: "absolute",
    left: "16px",
    color: "#a0aec0",
    zIndex: 1
  },
  arrowIcon: {
    position: "absolute",
    right: "16px",
    color: "#a0aec0",
    pointerEvents: "none"
  },
  input: {
    width: "100%",
    padding: "14px 14px 14px 48px",
    borderRadius: "12px",
    border: "2px solid #e2e8f0",
    background: "#f8fafc",
    fontSize: "14px",
    color: "#2d3748",
    outline: "none",
    transition: "all 0.2s ease",
    fontWeight: "500",
    appearance: "none"
  },
  disabledInput: {
    width: "100%",
    padding: "14px 14px 14px 48px",
    borderRadius: "12px",
    border: "2px solid #edf2f7",
    background: "#edf2f7",
    fontSize: "14px",
    color: "#a0aec0",
    outline: "none",
    cursor: "not-allowed",
    appearance: "none"
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px"
  },
  button: {
    width: "100%",
    padding: "18px",
    borderRadius: "14px",
    border: "none",
    background: "linear-gradient(135deg, #6c5ce7 0%, #805ad5 100%)",
    color: "white",
    fontWeight: "700",
    fontSize: "16px",
    cursor: "pointer",
    boxShadow: "0 10px 20px rgba(108, 92, 231, 0.2)",
    marginTop: "20px",
    transition: "transform 0.1s"
  }
};