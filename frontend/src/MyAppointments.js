import { useEffect, useState } from "react";
import Navbar from "./Navbar";

export default function MyAppointments() {

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {

    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/patient/appointments", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setAppointments(data);
        setLoading(false);
      });

  }, []);

  return (
    <>
      <Navbar />

      <div style={containerStyle}>

        <h2 style={titleStyle}>My Appointments</h2>

        {loading && <p>Loading appointments...</p>}

        {!loading && appointments.length === 0 && (
          <p>No appointments found</p>
        )}

        <div style={gridStyle}>

          {appointments.map(app => (

            <div key={app._id} style={cardStyle} className="glass">

              <div style={rowStyle}>
                <span>Date:</span>
                <b>{app.date}</b>
              </div>

              <div style={rowStyle}>
                <span>Time:</span>
                <b>{app.time}</b>
              </div>

              <div style={rowStyle}>
                <span>Status:</span>
                <span style={statusBadge(app.status)}>
                  {app.status}
                </span>
              </div>

            </div>

          ))}

        </div>

      </div>
    </>
  );
}




const containerStyle = {
  padding: "30px"
};

const titleStyle = {
  marginBottom: "25px",
  textAlign: "center"
};



const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "20px"
};

const cardStyle = {
  padding: "18px",
  borderRadius: "15px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
  transition: "0.3s",
  maxWidth: "420px",
  margin: "auto"
};


const rowStyle = {
  display: "flex",
  gap: "10px",
  alignItems: "center",
  marginBottom: "10px"
};



const statusBadge = (status) => {

  let bg;

  if (status === "Approved") bg = "#16a34a";
  else if (status === "Rejected") bg = "#dc2626";
  else bg = "#f59e0b"; 

  return {
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "bold",
    background: bg,
    color: "white"
  };
};
