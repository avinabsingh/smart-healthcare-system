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

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/doctor-appointments" element={<DoctorAppointments />} />


        
        <Route path="/my-appointments" element={<MyAppointments />} />

        <Route path="/records" element={<Records />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/doctor/upload-records" element={<DoctorUploadRecords />} />
        <Route path="/patient/records" element={<PatientRecords />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
