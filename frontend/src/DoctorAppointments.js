import { useEffect, useState } from "react";
import Navbar from "./Navbar";

export default function DoctorAppointments() {

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/doctor/appointments", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setAppointments(data));

  }, []);

  return (
    <>
      <Navbar />

      <div style={{ padding: "50px" }}>
        <h2>📋 Patient Appointments</h2>

        {appointments.length === 0 && <p>No appointments yet</p>}

        {appointments.map(app => (
          <div key={app._id} style={{
            marginBottom: "20px",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "10px"
          }}>
            <p><b>Patient:</b> {app.patientId?.name}</p>
            <p><b>Email:</b> {app.patientId?.email}</p>
            <p><b>Date:</b> {app.date}</p>
            <p><b>Time:</b> {app.time}</p>
            <p><b>Status:</b> {app.status}</p>
          </div>
        ))}

      </div>
    </>
  );
}