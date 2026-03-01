import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { FileText, Download, Eye } from "lucide-react";

export default function PatientRecords() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    // Fetch only this patient's records
    fetch("http://localhost:5000/api/patient/records", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => setRecords(data))
      .catch((err) => console.error("Error fetching records", err));
  }, []);

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>My Medical Records</h1>
          <p style={styles.subtitle}>View and download your prescriptions and reports.</p>
        </div>

        <div style={styles.listContainer}>
          {records.length === 0 ? (
            <div style={styles.empty}>No records found.</div>
          ) : (
            records.map((record) => (
              <div key={record._id} style={styles.recordCard}>
                <div style={styles.iconWrapper}>
                  <FileText size={24} color="#e84393" />
                </div>
                <div style={styles.info}>
                  <h3 style={styles.recordTitle}>{record.title}</h3>
                  <p style={styles.recordDate}>
                    Uploaded on {new Date(record.date).toLocaleDateString()} by Dr. {record.doctorName}
                  </p>
                </div>
                <div style={styles.actions}>
                  {/* View Button (Opens in new tab) */}
                  <a href={record.fileUrl} target="_blank" rel="noreferrer" style={styles.btnView}>
                    <Eye size={18} /> View
                  </a>
                  {/* Download Button */}
                  <a href={record.fileUrl} download style={styles.btnDownload}>
                    <Download size={18} /> Download
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

const styles = {
  container: { padding: "50px 80px", background: "#f8f9fa", minHeight: "100vh" },
  header: { marginBottom: "40px" },
  title: { fontSize: "32px", color: "#2d3436", marginBottom: "10px" },
  subtitle: { color: "#636e72", fontSize: "16px" },
  listContainer: { display: "flex", flexDirection: "column", gap: "20px", maxWidth: "900px" },
  empty: { padding: "40px", textAlign: "center", color: "#b2bec3", fontSize: "18px", background: "white", borderRadius: "12px" },
  recordCard: { display: "flex", alignItems: "center", background: "white", padding: "20px", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", gap: "20px" },
  iconWrapper: { background: "rgba(232, 67, 147, 0.1)", padding: "15px", borderRadius: "12px" },
  info: { flex: 1 },
  recordTitle: { fontSize: "18px", fontWeight: "700", color: "#2d3436", marginBottom: "5px" },
  recordDate: { fontSize: "14px", color: "#b2bec3" },
  actions: { display: "flex", gap: "10px" },
  btnView: { display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px", borderRadius: "8px", textDecoration: "none", color: "#2d3436", background: "#f1f2f6", fontWeight: "600", fontSize: "14px" },
  btnDownload: { display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px", borderRadius: "8px", textDecoration: "none", color: "white", background: "#e84393", fontWeight: "600", fontSize: "14px" }
};