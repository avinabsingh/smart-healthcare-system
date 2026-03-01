import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { UploadCloud, Search, CheckCircle, User } from "lucide-react";

export default function DoctorUploadRecords() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  // 1. Fetch List of Patients (Modify endpoint as needed)
  useEffect(() => {
    fetch("http://localhost:5000/api/doctor/patients", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => setPatients(data)) // Assumes data is array: [{id, name, email}...]
      .catch((err) => console.error("Error fetching patients", err));
  }, []);

  const handleUpload = (e) => {
    e.preventDefault();
    if (!selectedPatient || !file) return;

    const formData = new FormData();
    formData.append("patientId", selectedPatient._id);
    formData.append("file", file);
    formData.append("title", title);

    fetch("http://localhost:5000/api/doctor/upload-record", {
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      body: formData,
    })
    .then(res => {
      if(res.ok) {
        setMessage("File uploaded successfully!");
        setFile(null);
        setTitle("");
      }
    });
  };

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>Upload Patient Record</h2>
          
          {/* Step 1: Select Patient */}
          <div style={styles.section}>
            <label style={styles.label}>1. Select Patient</label>
            <div style={styles.patientGrid}>
              {patients.map((p) => (
                <div 
                  key={p._id} 
                  style={{
                    ...styles.patientCard, 
                    border: selectedPatient?._id === p._id ? "2px solid #6c5ce7" : "1px solid #eee",
                    backgroundColor: selectedPatient?._id === p._id ? "#f0f0ff" : "#fff"
                  }}
                  onClick={() => setSelectedPatient(p)}
                >
                  <User size={20} color="#6c5ce7"/>
                  <span>{p.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Step 2: Upload File */}
          {selectedPatient && (
            <form onSubmit={handleUpload} style={styles.form}>
              <div style={styles.selectedBanner}>
                Selected: <strong>{selectedPatient.name}</strong>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Record Title</label>
                <input 
                  style={styles.input} 
                  type="text" 
                  placeholder="e.g. Blood Test Results" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Attach File (PDF/Image)</label>
                <div style={styles.fileBox}>
                  <UploadCloud size={30} color="#b2bec3" />
                  <input 
                    type="file" 
                    onChange={(e) => setFile(e.target.files[0])} 
                    style={{marginTop: "10px"}}
                    required 
                  />
                </div>
              </div>

              <button type="submit" style={styles.button}>Upload Record</button>
              {message && <p style={styles.success}><CheckCircle size={16}/> {message}</p>}
            </form>
          )}
        </div>
      </div>
    </>
  );
}

const styles = {
  container: { padding: "50px", background: "#fdfbfb", minHeight: "100vh", display: "flex", justifyContent: "center" },
  card: { background: "white", padding: "40px", borderRadius: "20px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)", width: "100%", maxWidth: "600px" },
  title: { marginBottom: "30px", fontSize: "24px", color: "#2d3436" },
  section: { marginBottom: "30px" },
  label: { display: "block", marginBottom: "10px", fontWeight: "600", color: "#636e72" },
  patientGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", maxHeight: "200px", overflowY: "auto" },
  patientCard: { padding: "15px", borderRadius: "10px", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", transition: "0.2s" },
  selectedBanner: { padding: "15px", background: "#d1c4e9", color: "#4527a0", borderRadius: "10px", marginBottom: "20px" },
  inputGroup: { marginBottom: "20px" },
  input: { width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "16px" },
  fileBox: { border: "2px dashed #b2bec3", padding: "20px", borderRadius: "10px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" },
  button: { width: "100%", padding: "15px", background: "#6c5ce7", color: "white", border: "none", borderRadius: "10px", fontSize: "16px", fontWeight: "bold", cursor: "pointer" },
  success: { marginTop: "15px", color: "#00b894", display: "flex", alignItems: "center", gap: "5px" }
};