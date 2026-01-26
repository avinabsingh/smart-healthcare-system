import Navbar from "./Navbar";

export default function Records() {

  const records = [
    {
      date: "12 Jan 2026",
      doctor: "Dr Sharma",
      diagnosis: "Fever & Cold"
    },
    {
      date: "28 Dec 2025",
      doctor: "Dr Singh",
      diagnosis: "Blood Pressure Check"
    },
    {
      date: "10 Nov 2025",
      doctor: "Dr Verma",
      diagnosis: "Orthopedic Consultation"
    }
  ];

  return (
    <>
      <Navbar />

      <div style={{ padding: "30px" }}>

        <h2 style={{ marginBottom: "20px" }}>
          Medical Records
        </h2>

        <div className="grid">

          {records.map((record, index) => (

            <div className="card" key={index} style={recordCard}>

              <div style={dateBadge}>
                {record.date}
              </div>

              <p><b>Doctor:</b> {record.doctor}</p>
              <p><b>Diagnosis:</b> {record.diagnosis}</p>

            </div>

          ))}

        </div>

      </div>
    </>
  );
}



const recordCard = {
  position: "relative",
  paddingTop: "40px"
};

const dateBadge = {
  position: "absolute",
  top: "10px",
  right: "10px",
  background: "linear-gradient(45deg,#00d4ff,#008cff)",
  padding: "5px 12px",
  borderRadius: "15px",
  fontSize: "12px",
  fontWeight: "bold"
};
