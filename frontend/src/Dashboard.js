import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function Dashboard() {

  const navigate = useNavigate();

  const role = localStorage.getItem("role");

 
  const [appointments, setAppointments] = useState([]);

  
  useEffect(() => {

    if (role === "doctor") {

      const token = localStorage.getItem("token");

      fetch("http://localhost:5000/api/doctor/appointments", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => setAppointments(data));

    }

  }, [role]);

  return (
    <>
      <Navbar />

      <div style={{ padding: "30px" }}>

        <h2>
          {role === "doctor" ? "Doctor Dashboard" : "Patient Dashboard"}
        </h2>

        <div className="grid">

          

          {role === "patient" && (
            <>
              <div className="card" onClick={() => navigate("/appointment")}>
                Book Appointment
              </div>

              

              <div className="card" onClick={() => navigate("/my-appointments")}>
                My Appointments
              </div>
            </>
          )}


          <div className="card" onClick={() => navigate("/records")}>
            Medical Records
          </div>

          <div className="card" onClick={() => navigate("/profile")}>
            Profile
          </div>

        </div>


        {role === "doctor" && (

          <div style={{ marginTop: "40px" }}>

            <h3>My Appointments</h3>

            {appointments.length === 0 && (
              <p>No appointments yet</p>
            )}

            {appointments.map(app => (

              <div
                key={app._id}
                className="glass"
                style={{
                  marginTop: "15px",
                  padding: "15px"
                }}
              >

                <b>Date:</b> {app.date} <br />
                <b>Time:</b> {app.time} <br />
                <b>Status:</b> {app.status}

              </div>

            ))}

          </div>

        )}

      </div>
    </>
  );
}
