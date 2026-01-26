import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";

export default function Appointment() {

  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  
  const [doctors, setDoctors] = useState([]);

  

  useEffect(() => {

    fetch("http://localhost:5000/api/doctors")
      .then(res => res.json())
      .then(data => setDoctors(data));

  }, []);

 

  const handleBooking = async () => {

    if (!doctor || !date || !time) {
      alert("Please fill all fields");
      return;
    }

    const token = localStorage.getItem("token");

    try {

      await axios.post(
        "http://localhost:5000/api/appointments",
        {
          doctorId: doctor,
          date,
          time
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Appointment Booked Successfully!");

    
      setDoctor("");
      setDate("");
      setTime("");

    } catch (err) {
      alert("Booking failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="center">

        <div className="glass" style={{ width: "380px" }}>

          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
            Book Appointment
          </h2>

         

          <select
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
            style={inputStyle}
          >
            <option value="">Select Doctor</option>

            {doctors.map(doc => (
              <option key={doc._id} value={doc._id}>
                Dr. {doc.name}
              </option>
            ))}

          </select>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />

          <button onClick={handleBooking}>
            Confirm Appointment
          </button>

        </div>

      </div>
    </>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "12px",
  borderRadius: "10px",
  border: "none",
  outline: "none"
};
