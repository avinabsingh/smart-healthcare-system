import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import { 
  Calendar, Clock, User, FileText, 
  Activity, ArrowRight, TrendingUp, 
  ClipboardList, UploadCloud // Added UploadCloud icon for doctor
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const [appointments, setAppointments] = useState([]);
  const [time, setTime] = useState(new Date());

  // ... (Keep existing Time and Fetch logic same as before) ...
  /* ================= TIME ================= */
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  /* ================= FETCH APPOINTMENTS ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");
    const endpoint = role === "doctor" 
      ? "http://localhost:5000/api/doctor/appointments"
      : "http://localhost:5000/api/patient/appointments";

    fetch(endpoint, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setAppointments(data))
      .catch(err => console.error("Error fetching appointments:", err));
  }, [role]);

  // ... (Keep existing Calendar logic same as before) ...
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();
  const hasAppointment = (day) => {
    return appointments.some(app => {
      const appDate = new Date(app.date);
      return appDate.getDate() === day && 
             appDate.getMonth() === currentMonth &&
             appDate.getFullYear() === currentYear;
    });
  };
  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= totalDays; i++) days.push(i);


  return (
    <>
      <Navbar />
      <div style={styles.page}>
        {/* ... (Keep Hero Section same as before) ... */}
        <motion.div style={styles.hero} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div style={styles.heroContent}>
            <h1 style={styles.greeting}>Hello, <span style={styles.highlight}>{role === "doctor" ? "Doctor" : "Patient"}</span></h1>
            <p style={styles.dateText}>
              <Calendar size={20} style={{ marginBottom: -3 }} /> 
              {today.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div style={styles.clockWrapper}>
            <Clock size={24} color="#6c5ce7" />
            <span style={styles.time}>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </motion.div>

        <div style={styles.mainGrid}>
          <div style={styles.leftColumn}>
            <h3 style={styles.sectionTitle}>Quick Actions</h3>
            
            {/* ================= UPDATED ACTION CARDS ================= */}
            <div style={styles.cardGrid}>
              
              {role === "patient" && (
                <>
                  <ActionCard 
                    icon={<Calendar size={28} color="#ffffff" />} 
                    title="Book Appointment" 
                    desc="Schedule a new visit"
                    color="linear-gradient(135deg, #6c5ce7, #a29bfe)"
                    onClick={() => navigate("/appointment")} 
                  />
                  <ActionCard 
                    icon={<Activity size={28} color="#ffffff" />} 
                    title="My Appointments" 
                    desc="Check your status"
                    color="linear-gradient(135deg, #00b894, #55efc4)"
                    onClick={() => navigate("/my-appointments")} 
                  />
                  {/* PATIENT VIEW: See Records */}
                  <ActionCard 
                    icon={<ClipboardList size={28} color="#ffffff" />} 
                    title="Medical Records" 
                    desc="View & Download"
                    color="linear-gradient(135deg, #fd79a8, #e84393)"
                    onClick={() => navigate("/patient/records")} 
                  />
                </>
              )}

              {role === "doctor" && (
                <>
                  <ActionCard 
                    icon={<FileText size={28} color="#ffffff" />} 
                    title="Patient Requests" 
                    desc="View upcoming visits"
                    color="linear-gradient(135deg, #0984e3, #74b9ff)"
                    onClick={() => navigate("/doctor-appointments")} 
                  />
                  {/* DOCTOR VIEW: Upload Records */}
                  <ActionCard 
                    icon={<UploadCloud size={28} color="#ffffff" />} 
                    title="Upload Records" 
                    desc="Attach files to patients"
                    color="linear-gradient(135deg, #6c5ce7, #a29bfe)"
                    onClick={() => navigate("/doctor/upload-records")} 
                  />
                </>
              )}

              <ActionCard 
                icon={<User size={28} color="#ffffff" />} 
                title="Profile" 
                desc="Manage your account"
                color="linear-gradient(135deg, #e17055, #fab1a0)"
                onClick={() => navigate("/profile")} 
              />
            </div>

            {/* ... (Keep Stats Box same as before) ... */}
            <motion.div style={styles.statsBox} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <div style={styles.statItem}>
                <div style={styles.statIconBg}><TrendingUp size={28} color="#6c5ce7" /></div>
                <div>
                  <div style={styles.statValue}>{appointments.length}</div>
                  <div style={styles.statLabel}>Total Appointments</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ... (Keep Calendar same as before) ... */}
          <motion.div style={styles.calendarContainer} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
             {/* Calendar code remains exactly the same as your previous version */}
             <div style={styles.calendarHeader}>
              <h3 style={styles.calendarTitle}>{today.toLocaleString("default", { month: "long" })} {currentYear}</h3>
             </div>
             <div style={styles.weekDaysGrid}>
               {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d, i) => <div key={i} style={styles.weekday}>{d}</div>)}
             </div>
             <div style={styles.daysGrid}>
               {days.map((day, index) => {
                 if (!day) return <div key={index}></div>;
                 const isToday = day === today.getDate();
                 const isBooked = hasAppointment(day);
                 return (
                   <div key={index} style={{...styles.dayCell, ...(isToday ? styles.todayCell : {}), ...(isBooked ? styles.bookedCell : {})}}>
                     {day}
                   </div>
                 );
               })}
             </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

// ... (Keep ActionCard Component and Styles same as before) ...
function ActionCard({ icon, title, desc, color, onClick }) {
  return (
    <motion.div
      style={{...styles.actionCard, background: color}}
      onClick={onClick}
      whileHover={{ y: -8, boxShadow: "0 15px 30px rgba(0,0,0,0.2)" }}
      whileTap={{ scale: 0.96 }}
    >
      <div style={styles.iconBox}>{icon}</div>
      <div style={{ flex: 1 }}>
        <h4 style={styles.cardTitle}>{title}</h4>
        <p style={styles.cardDesc}>{desc}</p>
      </div>
      <ArrowRight size={24} color="rgba(255,255,255,0.8)" />
    </motion.div>
  );
}

const styles = {
  // ... (Paste your previous styles here, they are compatible)
  page: { minHeight: "100vh", padding: "50px 80px", background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)", fontFamily: "'Poppins', sans-serif", color: "#2d3436" },
  hero: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "50px" },
  heroContent: { display: "flex", flexDirection: "column", gap: "8px" },
  greeting: { fontSize: "42px", fontWeight: "800", color: "#2d3436", letterSpacing: "-1px", lineHeight: "1.2", margin: 0 },
  highlight: { color: "#6c5ce7", background: "linear-gradient(120deg, transparent 0%, transparent 60%, rgba(108, 92, 231, 0.2) 60%, rgba(108, 92, 231, 0.2) 100%)" },
  dateText: { color: "#636e72", fontSize: "18px", fontWeight: "500", display: "flex", alignItems: "center", gap: "10px", marginTop: "5px" },
  clockWrapper: { background: "#ffffff", padding: "15px 30px", borderRadius: "60px", boxShadow: "0 8px 25px rgba(0,0,0,0.08)", display: "flex", alignItems: "center", gap: "15px", border: "1px solid rgba(0,0,0,0.05)" },
  time: { fontSize: "26px", fontWeight: "700", color: "#2d3436", fontVariantNumeric: "tabular-nums" },
  mainGrid: { display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "50px", maxWidth: "1400px", margin: "0 auto" },
  leftColumn: { display: "flex", flexDirection: "column", gap: "40px" },
  sectionTitle: { fontSize: "26px", fontWeight: "700", color: "#2d3436", marginBottom: "25px", letterSpacing: "-0.5px" },
  cardGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "25px" },
  actionCard: { padding: "30px", borderRadius: "24px", display: "flex", alignItems: "center", gap: "20px", cursor: "pointer", color: "#ffffff", boxShadow: "0 10px 25px rgba(0,0,0,0.1)", position: "relative", overflow: "hidden" },
  iconBox: { background: "rgba(255,255,255,0.25)", width: "60px", height: "60px", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(5px)" },
  cardTitle: { fontSize: "20px", fontWeight: "700", marginBottom: "5px", letterSpacing: "0.5px" },
  cardDesc: { fontSize: "15px", opacity: 0.95, fontWeight: "500" },
  statsBox: { background: "#ffffff", borderRadius: "24px", padding: "35px", boxShadow: "0 15px 40px rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.03)" },
  statItem: { display: "flex", alignItems: "center", gap: "25px" },
  statIconBg: { width: "60px", height: "60px", borderRadius: "50%", background: "rgba(108, 92, 231, 0.1)", display: "flex", alignItems: "center", justifyContent: "center" },
  statValue: { fontSize: "42px", fontWeight: "800", color: "#2d3436", lineHeight: "1", marginBottom: "5px" },
  statLabel: { fontSize: "16px", color: "#636e72", fontWeight: "500" },
  calendarContainer: { background: "#ffffff", padding: "40px", borderRadius: "30px", boxShadow: "0 25px 50px rgba(0,0,0,0.08)", height: "fit-content", border: "1px solid rgba(0,0,0,0.03)" },
  calendarHeader: { textAlign: "center", marginBottom: "30px", borderBottom: "1px solid #f1f2f6", paddingBottom: "20px" },
  calendarTitle: { fontSize: "24px", fontWeight: "700", color: "#2d3436", textTransform: "capitalize" },
  weekDaysGrid: { display: "grid", gridTemplateColumns: "repeat(7, 1fr)", textAlign: "center", marginBottom: "15px" },
  weekday: { fontSize: "15px", fontWeight: "700", color: "#b2bec3", textTransform: "uppercase", letterSpacing: "1px" },
  daysGrid: { display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "12px" },
  dayCell: { height: "50px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "14px", fontSize: "16px", fontWeight: "600", color: "#2d3436", cursor: "default", transition: "all 0.3s ease", background: "#f8f9fa" },
  todayCell: { background: "linear-gradient(135deg, #ff9ff3, #feca57)", color: "#ffffff", fontWeight: "800", boxShadow: "0 4px 15px rgba(254, 202, 87, 0.4)" },
  bookedCell: { background: "linear-gradient(135deg, #6c5ce7, #a29bfe)", color: "#ffffff", fontWeight: "800", boxShadow: "0 4px 15px rgba(108, 92, 231, 0.4)" },
};