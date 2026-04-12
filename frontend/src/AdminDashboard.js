import { useEffect, useState } from "react";
import axios from "axios";
import { 
  Users, 
  UserPlus, 
  Stethoscope, 
  LayoutDashboard, 
  Loader2, 
  AlertCircle,
  UserCircle,
  Activity
} from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPatients: 0,
    totalDoctors: 0
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeTab, setActiveTab] = useState("dashboard");
  const [users, setUsers] = useState([]);

  const fetchUsers = async (roleType) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:5000/api/admin/users/${roleType}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(res.data);
    } catch (err) {
      console.error("User fetch error:", err);
    }
  };

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No authentication token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/api/admin/stats", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard statistics.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div style={styles.centerContainer}>
        <Loader2 style={styles.spinner} size={48} color="#4318FF" />
        <h2 style={styles.loadingText}>Initializing workspace...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.centerContainer}>
        <AlertCircle size={48} color="#EE5D50" style={{ marginBottom: "16px" }} />
        <h2 style={{ color: "#EE5D50", margin: 0, fontWeight: "600" }}>{error}</h2>
      </div>
    );
  }

  const getSidebarButtonStyle = (tabName) => ({
    ...styles.navButton,
    ...(activeTab === tabName ? styles.navButtonActive : {})
  });

  const getSidebarIconColor = (tabName) => {
    return activeTab === tabName ? "#ffffff" : "#A3AED0";
  };

  return (
    <div style={styles.container}>
      <aside style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <div style={styles.logoBox}>
            <Activity size={28} color="#ffffff" />
          </div>
          <h2 style={styles.sidebarTitle}>MedAdmin<span style={{color: "#4318FF"}}>.</span></h2>
        </div>

        <nav style={styles.navMenu}>
          <button 
            style={getSidebarButtonStyle("dashboard")} 
            onClick={() => setActiveTab("dashboard")}
          >
            <LayoutDashboard size={20} color={getSidebarIconColor("dashboard")} />
            Dashboard
          </button>

          <button 
            style={getSidebarButtonStyle("patients")} 
            onClick={() => {
              setActiveTab("patients");
              fetchUsers("patient");
            }}
          >
            <UserPlus size={20} color={getSidebarIconColor("patients")} />
            Patients
          </button>

          <button 
            style={getSidebarButtonStyle("doctors")} 
            onClick={() => {
              setActiveTab("doctors");
              fetchUsers("doctor");
            }}
          >
            <Stethoscope size={20} color={getSidebarIconColor("doctors")} />
            Doctors
          </button>
        </nav>
      </aside>

      <main style={styles.main}>
        {activeTab === "dashboard" && (
          <div style={styles.fadeIn}>
            <header style={styles.header}>
              <div>
                <p style={styles.subheading}>Overview</p>
                <h1 style={styles.heading}>Dashboard</h1>
              </div>
              <div style={styles.profileBadge}>
                <UserCircle size={24} color="#4318FF" />
                <span style={{fontWeight: "600", color: "#2B3674"}}>Admin</span>
              </div>
            </header>

            <div style={styles.grid}>
              <div style={styles.card}>
                <div style={styles.cardHeader}>
                  <div style={styles.iconWrapperPrimary}>
                    <Users size={28} color="#4318FF" />
                  </div>
                  <h2 style={styles.cardTitle}>Total Users</h2>
                </div>
                <p style={styles.cardValue}>{stats.totalUsers}</p>
              </div>

              <div style={styles.card}>
                <div style={styles.cardHeader}>
                  <div style={styles.iconWrapperSuccess}>
                    <UserPlus size={28} color="#05CD99" />
                  </div>
                  <h2 style={styles.cardTitle}>Total Patients</h2>
                </div>
                <p style={styles.cardValue}>{stats.totalPatients}</p>
              </div>

              <div style={styles.card}>
                <div style={styles.cardHeader}>
                  <div style={styles.iconWrapperDanger}>
                    <Stethoscope size={28} color="#EE5D50" />
                  </div>
                  <h2 style={styles.cardTitle}>Total Doctors</h2>
                </div>
                <p style={styles.cardValue}>{stats.totalDoctors}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "patients" && (
          <div style={styles.fadeIn}>
            <header style={styles.header}>
              <div>
                <p style={styles.subheading}>Directory</p>
                <h1 style={styles.heading}>Patients List</h1>
              </div>
            </header>
            <div style={styles.listContainer}>
              {users.length === 0 ? <p style={styles.emptyText}>No patients found.</p> : null}
              {users.map((u, i) => (
                <div key={i} style={styles.userCard}>
                  <div style={styles.avatarSuccess}>
                    <UserCircle size={24} color="#05CD99" />
                  </div>
                  <div style={styles.userInfo}>
                    <p style={styles.userName}>{u.name}</p>
                    <p style={styles.userEmail}>{u.email}</p>
                  </div>
                  <div style={styles.badgeSuccess}>Patient</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "doctors" && (
          <div style={styles.fadeIn}>
            <header style={styles.header}>
              <div>
                <p style={styles.subheading}>Directory</p>
                <h1 style={styles.heading}>Doctors List</h1>
              </div>
            </header>
            <div style={styles.listContainer}>
              {users.length === 0 ? <p style={styles.emptyText}>No doctors found.</p> : null}
              {users.map((u, i) => (
                <div key={i} style={styles.userCard}>
                  <div style={styles.avatarDanger}>
                    <UserCircle size={24} color="#EE5D50" />
                  </div>
                  <div style={styles.userInfo}>
                    <p style={styles.userName}>Dr. {u.name}</p>
                    <p style={styles.userEmail}>{u.email}</p>
                  </div>
                  <div style={styles.badgeDanger}>Doctor</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#F4F7FE",
    fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif",
  },
  sidebar: {
    width: "280px",
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    borderRight: "none",
    boxShadow: "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
    zIndex: 10,
  },
  sidebarHeader: {
    padding: "40px 32px",
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },
  logoBox: {
    backgroundColor: "#4318FF",
    padding: "10px",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 10px 20px -5px rgba(67, 24, 255, 0.4)",
  },
  sidebarTitle: {
    fontSize: "24px",
    fontWeight: "800",
    color: "#2B3674",
    margin: 0,
    letterSpacing: "-0.5px",
  },
  navMenu: {
    padding: "0 20px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  navButton: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    width: "100%",
    padding: "16px 20px",
    backgroundColor: "transparent",
    color: "#A3AED0",
    border: "none",
    borderRadius: "16px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    textAlign: "left",
  },
  navButtonActive: {
    backgroundColor: "#4318FF",
    color: "#ffffff",
    boxShadow: "0px 10px 20px -5px rgba(67, 24, 255, 0.4)",
  },
  main: {
    flex: 1,
    padding: "50px 60px",
    overflowY: "auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: "40px",
  },
  subheading: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#A3AED0",
    margin: "0 0 4px 0",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  heading: {
    fontSize: "36px",
    fontWeight: "800",
    color: "#2B3674",
    margin: 0,
    letterSpacing: "-1px",
  },
  profileBadge: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    backgroundColor: "#ffffff",
    padding: "10px 20px",
    borderRadius: "30px",
    boxShadow: "0px 18px 40px rgba(112, 144, 176, 0.12)",
  },
  fadeIn: {
    animation: "fadeIn 0.4s ease-in-out",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "30px",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "32px",
    borderRadius: "24px",
    border: "none",
    boxShadow: "0px 18px 40px rgba(112, 144, 176, 0.12)",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    transition: "transform 0.2s ease",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  iconWrapperPrimary: {
    padding: "16px",
    borderRadius: "50%",
    backgroundColor: "#F4F7FE",
    display: "flex",
  },
  iconWrapperSuccess: {
    padding: "16px",
    borderRadius: "50%",
    backgroundColor: "#E6FAF5",
    display: "flex",
  },
  iconWrapperDanger: {
    padding: "16px",
    borderRadius: "50%",
    backgroundColor: "#FEECEE",
    display: "flex",
  },
  cardTitle: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#A3AED0",
    margin: 0,
  },
  cardValue: {
    fontSize: "48px",
    fontWeight: "800",
    color: "#2B3674",
    margin: 0,
    letterSpacing: "-1px",
  },
  listContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    maxWidth: "900px",
  },
  userCard: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    background: "#ffffff",
    padding: "24px 30px",
    borderRadius: "20px",
    boxShadow: "0px 18px 40px rgba(112, 144, 176, 0.08)",
  },
  avatarSuccess: {
    backgroundColor: "#E6FAF5",
    padding: "14px",
    borderRadius: "16px",
    display: "flex",
  },
  avatarDanger: {
    backgroundColor: "#FEECEE",
    padding: "14px",
    borderRadius: "16px",
    display: "flex",
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    flex: 1,
  },
  userName: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "700",
    color: "#2B3674",
  },
  userEmail: {
    margin: 0,
    fontSize: "14px",
    fontWeight: "500",
    color: "#A3AED0",
  },
  badgeSuccess: {
    backgroundColor: "#05CD99",
    color: "#ffffff",
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "700",
    textTransform: "uppercase",
  },
  badgeDanger: {
    backgroundColor: "#EE5D50",
    color: "#ffffff",
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "700",
    textTransform: "uppercase",
  },
  emptyText: {
    color: "#A3AED0",
    fontWeight: "500",
    fontSize: "16px",
  },
  centerContainer: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F4F7FE",
  },
  spinner: {
    animation: "spin 1s linear infinite",
    marginBottom: "20px",
  },
  loadingText: {
    color: "#2B3674",
    fontSize: "20px",
    fontWeight: "700",
  }
};