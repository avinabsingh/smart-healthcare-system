import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Appointment from "./Appointment";
import Records from "./Records";
import Profile from "./Profile";
import DoctorAppointments from "./DoctorAppointments";
import DoctorUploadRecords from "./DoctorUploadRecords";
import PatientRecords from "./PatientRecords";
import MyAppointments from "./MyAppointments";
import Chatbot from "./Chatbot";
import RiskPredictor from "./RiskPredictor";
import NearbyHospitals from "./NearbyHospitals";
import About from "./About";
import Reminder from "./Reminder";
import AdminDashboard from "./AdminDashboard";


// Import your new Footer
import Footer from "./Footer"; 

function App() {
  return (
    <BrowserRouter>
      {/* This outer div ensures the footer sticks to the bottom 
          using a Flexbox column approach. 
      */}
      <div style={{ 
        display: "flex", 
        flexDirection: "column", 
        minHeight: "100vh" 
      }}>
        
        {/* Main content area expands to push footer down */}
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/doctor-appointments" element={<DoctorAppointments />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/my-appointments" element={<MyAppointments />} />
            <Route path="/records" element={<Records />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/doctor/upload-records" element={<DoctorUploadRecords />} />
            <Route path="/patient/records" element={<PatientRecords />} />
            <Route path="/risk" element={<RiskPredictor />} />
            <Route path="/hospitals" element={<NearbyHospitals />} />
            <Route path="/about" element={<About />} />
            <Route path="/reminder" element={<Reminder />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Routes>
        </div>

        {/* The Footer will now appear on every page automatically */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;