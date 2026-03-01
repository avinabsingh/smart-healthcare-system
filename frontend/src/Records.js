import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import { 
  FileText, Download, Trash2, UploadCloud, 
  User, Search, Eye, AlertCircle 
} from "lucide-react";

export default function Records() {
  
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [token] = useState(localStorage.getItem("token"));
  
  const [records, setRecords] = useState([]);
  const [patients, setPatients] = useState([]); // List of patients (For Doctor)
  const [selectedPatient, setSelectedPatient] = useState(""); // Selected Patient ID (For Doctor)
  const [loading, setLoading] = useState(false);

  /* ================= 1. FETCH PATIENTS (DOCTOR ONLY) ================= */
  useEffect(() => {
    if (role === "doctor") {
      // Assuming you create a backend route to get all patients
      fetch("http://localhost:5000/api/users/patients", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => setPatients(data))
      .catch(err => console.error("Failed to load patients", err));
    } else {
      // If patient, load own records immediately
      fetchRecords(); 
    }
  }, [role]);

  /* ================= 2. FETCH RECORDS ================= */
  const fetchRecords = async (patientId = null) => {
    setLoading(true);
    let url = "http://localhost:5000/api/records";

    // If doctor is viewing a specific patient
    if (role === "doctor" && patientId) {
      url = `http://localhost:5000/api/records/patient/${patientId}`;
    }

    try {
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setRecords(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching records");
      setRecords([]);
    } finally {
      setLoading(false);
    }
  };

  /* ================= 3. HANDLE PATIENT SELECTION (DOCTOR) ================= */
  const handlePatientChange = (e) => {
    const patientId = e.target.value;
    setSelectedPatient(patientId);
    if (patientId) {
      fetchRecords(patientId);
    } else {
      setRecords([]);
    }
  };

  /* ================= 4. FILE UPLOAD (DOCTOR ONLY) ================= */
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (role === "doctor" && !selectedPatient) {
      alert("Please select a patient first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    
    // If doctor, attach the patient ID so backend knows who owns this file
    if (role === "doctor") {
      formData.append("patientId", selectedPatient);
    }

    setLoading(true);
    try {
      await fetch("http://localhost:5000/api/records/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      // Refresh records
      fetchRecords(role === "doctor" ? selectedPatient : null); 
    } catch (err) {
      console.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= 5. DELETE FILE (DOCTOR ONLY) ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;

    try {
      await fetch(`http://localhost:5000/api/records/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchRecords(role === "doctor" ? selectedPatient : null);
    } catch (err) {
      console.error("Delete failed");
    }
  };

  return (
    <>
      <Navbar />
      <div style={styles.page}>
        
        {/* Header */}
        <div style={styles.header}>
          <motion.h1 
            style={styles.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {role === "doctor" ? "Manage Medical Records" : "My Medical History"}
          </motion.h1>
          <p style={styles.subtitle}>
            {role === "doctor" 
              ? "Upload prescriptions and reports for your patients" 
              : "View and download your medical documents and prescriptions"}
          </p>
        </div>

        {/* ================= DOCTOR CONTROLS ================= */}
        {role === "doctor" && (
          <motion.div 
            style={styles.controlPanel}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* 1. Select Patient */}
            <div style={styles.selectGroup}>
              <label style={styles.label}><Search size={16}/> Select Patient</label>
              <select 
                style={styles.select} 
                value={selectedPatient} 
                onChange={handlePatientChange}
              >
                <option value="">-- Choose a Patient --</option>
                {patients.map(p => (
                  <option key={p._id} value={p._id}>{p.name} ({p.email})</option>
                ))}
              </select>
            </div>

            {/* 2. Upload Box (Only visible if patient selected) */}
            {selectedPatient && (
              <div style={styles.uploadWrapper}>
                <input
                  type="file"
                  id="fileUpload"
                  style={{ display: "none" }}
                  onChange={handleUpload}
                  accept=".pdf,.jpg,.png,.jpeg"
                />
                <label htmlFor="fileUpload" style={styles.uploadBtn}>
                  <UploadCloud size={18} />
                  Upload Report
                </label>
              </div>
            )}
          </motion.div>
        )}

        {/* ================= RECORDS GRID ================= */}
        
        {loading && <p style={styles.loading}>Syncing records...</p>}

        {!loading && records.length === 0 && (
          <div style={styles.emptyState}>
            <AlertCircle size={40} color="#cbd5e0" />
            <p>
              {role === "doctor" && !selectedPatient 
                ? "Select a patient to view records." 
                : "No medical records found."}
            </p>
          </div>
        )}

        <motion.div style={styles.grid} layout>
          <AnimatePresence>
            {records.map((record) => (
              <motion.div
                key={record._id}
                style={styles.card}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
              >
                {/* Icon based on file type */}
                <div style={styles.iconBox}>
                  <FileText size={32} color="#6c5ce7" />
                </div>

                <div style={styles.cardContent}>
                  <h3 style={styles.fileName} title={record.originalname}>
                    {record.originalname}
                  </h3>
                  <p style={styles.date}>
                    {new Date(record.createdAt).toLocaleDateString("en-US", {
                      year: 'numeric', month: 'short', day: 'numeric'
                    })}
                  </p>
                </div>

                <div style={styles.actionRow}>
                  {/* View Button */}
                  <a 
                    href={`http://localhost:5000/${record.path}`} 
                    target="_blank" 
                    rel="noreferrer"
                    style={styles.iconBtn}
                    title="View"
                  >
                    <Eye size={18} color="#0984e3" />
                  </a>

                  {/* Download Button */}
                  <a 
                    href={`http://localhost:5000/${record.path}`} 
                    download 
                    style={styles.iconBtn}
                    title="Download"
                  >
                    <Download size={18} color="#00b894" />
                  </a>

                  {/* Delete Button (Doctor Only) */}
                  {role === "doctor" && (
                    <button 
                      onClick={() => handleDelete(record._id)} 
                      style={{...styles.iconBtn, border: "1px solid #ffe5e5", background: "#fff5f5"}}
                      title="Delete"
                    >
                      <Trash2 size={18} color="#d63031" />
                    </button>
                  )}
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    minHeight: "100vh",
    padding: "40px",
    background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
    fontFamily: "'Inter', sans-serif"
  },
  header: {
    marginBottom: "40px",
    textAlign: "center"
  },
  title: {
    fontSize: "32px",
    fontWeight: "800",
    color: "#2d3436",
    marginBottom: "10px"
  },
  subtitle: {
    color: "#636e72",
    fontSize: "16px"
  },
  
  // Doctor Controls
  controlPanel: {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
    marginBottom: "40px",
    display: "flex",
    alignItems: "flex-end",
    gap: "20px",
    flexWrap: "wrap",
    maxWidth: "800px",
    margin: "0 auto 40px"
  },
  selectGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    flex: 1,
    minWidth: "250px"
  },
  label: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#636e72",
    display: "flex",
    alignItems: "center",
    gap: "6px"
  },
  select: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "2px solid #dfe6e9",
    background: "#fdfdfd",
    fontSize: "14px",
    outline: "none",
    cursor: "pointer"
  },
  uploadWrapper: {
    marginBottom: "2px" // Alignment fix
  },
  uploadBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "#6c5ce7",
    color: "white",
    padding: "12px 24px",
    borderRadius: "10px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.2s",
    boxShadow: "0 4px 10px rgba(108, 92, 231, 0.3)"
  },
  
  // States
  loading: {
    textAlign: "center",
    color: "#b2bec3",
    fontSize: "18px",
    marginTop: "50px"
  },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    color: "#b2bec3",
    marginTop: "50px"
  },

  // Grid
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "25px",
    maxWidth: "1200px",
    margin: "0 auto"
  },
  
  // Card
  card: {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "20px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
    border: "1px solid rgba(0,0,0,0.02)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    position: "relative",
    overflow: "hidden"
  },
  iconBox: {
    width: "60px",
    height: "60px",
    borderRadius: "12px",
    background: "#f0f0ff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "15px"
  },
  cardContent: {
    marginBottom: "20px",
    width: "100%"
  },
  fileName: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#2d3436",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    marginBottom: "5px"
  },
  date: {
    fontSize: "12px",
    color: "#b2bec3",
    fontWeight: "500"
  },
  actionRow: {
    display: "flex",
    gap: "10px",
    marginTop: "auto",
    width: "100%",
    justifyContent: "center"
  },
  iconBtn: {
    width: "36px",
    height: "36px",
    borderRadius: "8px",
    border: "1px solid #f1f2f6",
    background: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.2s ease"
  }
};