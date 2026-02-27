import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";

export default function Records() {

  const [records, setRecords] = useState([]);
  const token = localStorage.getItem("token");

  /* ================= FETCH RECORDS FROM BACKEND ================= */

  const fetchRecords = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/records", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();

      // 🔥 Important Fix
      if (Array.isArray(data)) {
        setRecords(data);
      } else {
        console.log("Unexpected response:", data);
        setRecords([]);
      }

    } catch (err) {
      console.log("Error fetching records");
      setRecords([]);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  /* ================= FILE UPLOAD (BACKEND) ================= */

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      await fetch("http://localhost:5000/api/records/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      fetchRecords(); // refresh after upload

    } catch (err) {
      console.log("Upload failed");
    }
  };

  /* ================= DELETE (BACKEND) ================= */

  const handleDelete = async (id) => {

    try {
      await fetch(`http://localhost:5000/api/records/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      fetchRecords(); // refresh after delete

    } catch (err) {
      console.log("Delete failed");
    }
  };

  return (
    <>
      <Navbar />

      <div style={styles.page}>

        <motion.div
          style={styles.header}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 style={styles.title}>📁 Medical Records</h1>
          <p style={styles.subtitle}>
            Upload and manage your medical reports securely
          </p>
        </motion.div>

        <motion.div
          style={styles.uploadBox}
          whileHover={{ scale: 1.02 }}
        >
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleUpload}
            style={{ display: "none" }}
            id="fileUpload"
          />

          <label htmlFor="fileUpload" style={styles.uploadLabel}>
            ⬆️ Drag & Drop or Click to Upload Report
            <span style={styles.uploadSub}>
              (PDF, JPG, PNG supported)
            </span>
          </label>
        </motion.div>

        <div style={styles.grid}>

          {records.length === 0 && (
            <p style={{ opacity: 0.6 }}>No reports uploaded yet.</p>
          )}

          {records.map((record) => (
            <motion.div
              key={record._id}
              style={styles.card}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
            >

              <div style={styles.badge}>
                {new Date(record.createdAt).toLocaleDateString()}
              </div>

              <div style={styles.fileIcon}>
                {record.mimetype?.includes("pdf") ? "📄" : "🖼️"}
              </div>

              <h3 style={styles.fileName}>
                {record.originalname}
              </h3>

              <div style={styles.buttonRow}>
                <a
                  href={`http://localhost:5000/${record.path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.viewBtn}
                >
                  View
                </a>

                <a
                  href={`http://localhost:5000/${record.path}`}
                  download={record.originalname}
                  style={styles.downloadBtn}
                >
                  Download
                </a>

                <button
                  onClick={() => handleDelete(record._id)}
                  style={styles.deleteBtn}
                >
                  Delete
                </button>
              </div>

            </motion.div>
          ))}

        </div>

      </div>
    </>
  );
}

/* ================= STYLES (UNCHANGED) ================= */

/* ================= STYLES ================= */

const styles = {

  page: {
    minHeight: "100vh",
    padding: "50px 80px",
    background: "var(--page-bg)",
    color: "var(--text-color)"
  },

  header: {
    marginBottom: "40px"
  },

  title: {
    fontSize: "34px",
    fontWeight: "700"
  },

  subtitle: {
    opacity: 0.7,
    marginTop: "8px"
  },

  uploadBox: {
    padding: "40px",
    borderRadius: "25px",
    background: "var(--glass-bg)",
    border: "2px dashed var(--card-border)",
    backdropFilter: "blur(20px)",
    textAlign: "center",
    marginBottom: "50px",
    cursor: "pointer",
  },

  uploadLabel: {
    fontSize: "18px",
    fontWeight: "600",
    cursor: "pointer",
    display: "block"
  },

  uploadSub: {
    display: "block",
    fontSize: "13px",
    marginTop: "8px",
    opacity: 0.6
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
    gap: "30px"
  },

  card: {
    position: "relative",
    padding: "30px",
    borderRadius: "20px",
    background: "var(--card-bg)",
    border: "1px solid var(--card-border)",
    boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
    textAlign: "center"
  },

  badge: {
    position: "absolute",
    top: "15px",
    right: "15px",
    background: "linear-gradient(45deg,#00f5ff,#6a5acd)",
    padding: "5px 12px",
    borderRadius: "15px",
    fontSize: "12px",
    fontWeight: "bold"
  },

  fileIcon: {
    fontSize: "40px",
    marginBottom: "15px"
  },

  fileName: {
    fontSize: "16px",
    marginBottom: "20px",
    wordBreak: "break-word"
  },

  buttonRow: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    flexWrap: "wrap"
  },

  viewBtn: {
    padding: "8px 14px",
    borderRadius: "10px",
    background: "#00f5ff",
    color: "black",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "13px"
  },

  downloadBtn: {
    padding: "8px 14px",
    borderRadius: "10px",
    background: "#6a5acd",
    color: "white",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "13px"
  },

  deleteBtn: {
    padding: "8px 14px",
    borderRadius: "10px",
    background: "#ff4d4d",
    border: "none",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "13px"
  }
};