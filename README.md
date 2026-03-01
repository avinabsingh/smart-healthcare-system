# Smart-Healthcare-System

Web-based Smart Healthcare Management System

## Project Overview

The Smart Healthcare Management System is a web-based platform designed to digitally manage healthcare operations such as patient registration, appointment booking, doctor scheduling, and medical record management. The system replaces manual and fragmented hospital processes with a centralized, secure, and efficient digital solution.

## Problem It Solves

Healthcare institutions often face problems such as manual paperwork, long patient waiting times, poor record management, and lack of coordination between doctors and patients. Many existing software solutions are expensive or too complex for small clinics.

This project solves these problems by providing an affordable, easy-to-use, and centralized healthcare management platform.

## Target Users (Personas)

### Patient

- Book appointments online
- View medical history and reports
- Receive appointment reminders

### Doctor

- Manage availability schedules
- View patient medical records
- Update prescriptions and diagnosis

### Admin

- Manage users and system data
- Monitor appointments
- Generate reports and analytics

## Vision Statement

To build a secure, reliable, and user-friendly digital healthcare platform that improves patient experience, simplifies hospital operations, and enables efficient healthcare service delivery.

## Key Features / Goals

- Role-based authentication (Admin, Doctor, Patient)
- Online appointment booking and management
- Patient medical record management
- Doctor schedule management
- Dashboards for all user roles
- Search and filter functionality
- Secure data storage
- Optional email notifications

## Success Metrics

- At least 80% of users can use the system without external help
- Appointment booking response time below 5 seconds
- Zero unauthorized access incidents
- Accurate storage and retrieval of patient records
- System uptime above 95%

## Assumptions

- Users have internet access and web browsers
- Patients and doctors are willing to use digital platforms
- Clinics follow appointment-based workflows
- Development team has basic full-stack knowledge

## Constraints

- Project must be completed within 3 months
- Only free and open-source tools will be used
- Data privacy and security must be maintained
- UI must be simple and easy to use

## MoSCoW Prioritization

| Feature                        | Priority    |
| ------------------------------ | ----------- |
| User Registration & Login      | Must Have   |
| Appointment Booking System     | Must Have   |
| Patient Medical Records        | Must Have   |
| Doctor Schedule Management     | Must Have   |
| Admin User Management          | Must Have   |
| Email Notifications            | Should Have |
| Reports & Analytics            | Should Have |
| Upload Medical Reports         | Should Have |
| Dashboard Visual Analytics     | Could Have  |
| Hospital Department Management | Could Have  |
| Future AI Diagnosis Module     | Won't Have  |

---

## Branching Strategy (GitHub Flow)

This project follows the GitHub Flow branching strategy.

The main branch contains stable and production-ready code.

For implementing new features and improvements, separate feature branches are created.

### Example Feature Branch Used:

feature-full-auth-system

This branch was used to develop authentication and appointment management features before pushing changes to the main branch.

---

## Local Development Tools

The following tools were used during development:

- Node.js (Backend runtime)
- React.js (Frontend framework)
- MongoDB (Database)
- Docker Desktop (Containerization)
- Git and GitHub (Version control)
- Visual Studio Code (Code editor)

## Project Structure

## Project Structure

```
smart-healthcare-system/
│
├── frontend/                         # React frontend application
│   ├── public/                       # Static assets
│   ├── src/                          # React source code
│   │   ├── App.js                    # Main application component
│   │   ├── App.css                   # Global styles
│   │   ├── index.js                  # React entry point
│   │   ├── index.css                 # Base styling
│   │   ├── Login.js                  # Login page
│   │   ├── Signup.js                 # Registration page
│   │   ├── Dashboard.js              # Role-based dashboard
│   │   ├── Appointment.js            # Appointment booking
│   │   ├── MyAppointments.js         # Patient appointments view
│   │   ├── DoctorAppointments.js     # Doctor appointment management
│   │   ├── DoctorUploadRecords.js    # Doctor medical record upload
│   │   ├── PatientRecords.js         # Patient records view
│   │   ├── Records.js                # Records management logic
│   │   ├── Profile.js                # User profile page
│   │   ├── Navbar.js                 # Navigation bar component
│   │   ├── ThemeContext.js           # Theme & global context
│   │   ├── reportWebVitals.js        # Performance monitoring
│   │   └── setupTests.js             # Testing configuration
│   │
│   └── package.json
│
├── backend/                          # Express backend server
│   ├── routes/                       # API route definitions
│   ├── controllers/                  # Business logic
│   ├── models/                       # Mongoose database schemas
│   ├── middleware/                   # JWT authentication & authorization
│   ├── config/                       # Database configuration
│   ├── server.js                     # Main server entry point
│   └── package.json
│
├── docs/
│   └── design/                       # Architecture diagrams & UI screenshots
│       ├── architecture.drawio
│       ├── architecture.png
│       └── ...
│
├── docker-compose.yml                # Docker container configuration
├── README.md                         # Project documentation
└── .env                              # Environment variables (not committed)
```

---

## Quick Start – Local Development (Docker)

## Deployment

The Smart Healthcare Management System is containerized using Docker to ensure consistent development and deployment environments. Docker Compose is used to orchestrate multiple services including the frontend, backend, and MongoDB database.

### Deployment Architecture

- Frontend Container – Hosts the React application
- Backend Container – Runs the Express.js REST API server
- Database Container – MongoDB instance for persistent data storage

All services communicate through an internal Docker network, ensuring secure and isolated inter-service communication.

### Environment Configuration

Environment variables such as database URI, JWT secret, and server ports are managed using a `.env` file to maintain security and flexibility across different deployment environments.

### Scalability & Cloud Readiness

The containerized architecture makes the system cloud-ready and easily deployable on platforms such as AWS, Azure, or Google Cloud. Services can be scaled independently based on load requirements.

This deployment approach ensures portability, maintainability, and simplified DevOps management.

### Prerequisites

Make sure the following software is installed:

- Docker Desktop

---

### Steps To Run The Project

  ### 1. Clone the repository:

  git clone https://github.com/avinabsingh/smart-healthcare-system.git
  
  cd smart-healthcare-system

 ### 2. Create a .env file inside the backend/ directory and add:

  MONGO_URI=mongodb://mongo:27017/smarthealthcare
  
  JWT_SECRET=your_jwt_secret_key
  
  PORT=5000
  
  (You can change the values as needed.)

 ### 3. Make sure Docker Desktop is running.

 ### 4. Start the application using Docker Compose:

   docker-compose up --build

 ### 5. Once the containers are running, access:

  Frontend: http://localhost:3000
  
  Backend API: http://localhost:5000
  
  MongoDB: Runs internally inside Docker

 ### What These Steps Do
 
  cd smart-healthcare-system → Enter project folder
  
  .env → Configure secrets and database connection
  
  docker-compose up --build → Builds and runs frontend, backend, and database containers
  
  Access via browser → Use the application locally


### Architecture Diagram

docs/design/architecture.png

### Updated Figma Screens

docs/design/

### Old Figma WireFrames

docs/wireframes_DA1/




## Software Design

### Design Philosophy (Summary)

The Smart Healthcare Management System was intentionally designed using a layered Client–Server architecture combined with the MVC pattern to ensure clear separation of concerns. This structure minimizes tight coupling between components and allows frontend, backend, and database layers to evolve independently.

The architecture was chosen to improve long-term maintainability and scalability. By isolating business logic, authentication, and data models into modular components, future enhancements such as analytics dashboards, pharmacy modules, mobile applications, or third-party integrations can be added without major refactoring.

Security and deployment stability were treated as core design priorities. JWT-based authentication enables stateless and scalable user management, while Docker containerization ensures consistent environments across development and production. These decisions make the system cloud-ready and adaptable to future growth.

---

### System Architecture
![System Architecture](docs/design/architecture.png)

The editable Draw.io source file is available at:
docs/design/architecture.drawio

The system follows a Layered Client–Server architecture combined with the MVC pattern to enforce clear separation between the presentation, business logic, and data layers. This structure minimizes tight coupling between components, improving maintainability and enabling independent development of frontend and backend modules. JWT-based authentication and role-based access control (RBAC) were implemented to ensure secure, stateless, and scalable user management for Patients, Doctors, and Admins. Additionally, Docker containerization and modular backend structuring were adopted to maintain environment consistency, simplify deployment, and support future scalability and cloud integration.

### Technology Stack Overview

- Frontend: React.js (UI rendering and client-side routing)
- Backend: Node.js + Express.js (REST API and business logic)
- Database: MongoDB with Mongoose ORM
- Authentication: JWT + bcrypt password hashing
- Containerization: Docker & Docker Compose

### API Structure (High-Level)

The backend exposes RESTful APIs organized by feature modules:

- /api/auth → Registration & Login
- /api/appointments → Booking and management
- /api/users → User management
- /api/records → Medical records upload & retrieval

All protected routes require JWT authentication.
---

## UI/UX Design (Figma Screens)

The updated user interface was first designed using Figma to establish a structured and user-friendly workflow. The system follows a role-based dashboard architecture to ensure clarity, usability, and efficient healthcare management for Patients and Doctors.

### Sign Up Screen (Figma)
![Sign Up Figma](docs/design/SignUp_Screen_Figma.png)

### Login Screen (Figma)
![Login Figma](docs/design/Login_Screen_Figma.png)

### Patient Dashboard (Figma)
![Patient Dashboard Figma](docs/design/PatientDashboard_Screen_Figma.png)

### Doctor Dashboard (Figma)
![Doctor Dashboard Figma](docs/design/DoctorDashboard_Screen_Figma.png)

### Appointments Screen (Figma)
![Appointments Figma](docs/design/Appointments_Screen_Figma.png)

### Book Appointment Screen (Figma)
![Book Appointment Figma](docs/design/BookAppointment_Screen_Figma.png)

### Medical Records Screen (Figma)
![Medical Records Figma](docs/design/MedicalRecords_Screen_Figma.png)


---


### Design Highlights

- **Role-Based Interface:** Separate dashboards for Patient and Doctor with task-specific features.
- **Consistent Navigation Bar:** Uniform top navigation for smooth user flow.
- **Card-Based Layout:** Action buttons and features are organized in structured cards.
- **Calendar-Based Scheduling:** Visual date selection for appointment management.
- **Clear Typography Hierarchy:** Improved readability using structured headings and section labels.
- **Consistent Color Theme:** Healthcare-themed dark UI for visual consistency.
- **User-Centric Design:** Interfaces designed to minimize complexity and improve accessibility.

The UI focuses on simplicity, intuitive navigation, and efficient interaction between patients and healthcare providers.

---

## Implemented Web Application Screenshots

### User Registration (Website)
![Sign Up Website](docs/design/SignUp_Screen_Website.png)

This screen allows new users (Patients or Doctors) to create an account by providing essential details such as name, email, password, and role selection. Passwords are securely hashed using bcrypt before storage, and validation ensures secure and consistent data entry.

---

### Patient Dashboard (Website)
![Patient Dashboard Website](docs/design/PatientDashboard_Screen_Website.png)

The Patient Dashboard provides a centralized overview of appointments, profile details, and medical records. Patients can navigate easily to book appointments, manage their records, and track consultations.

---

### Doctor Dashboard (Website)
![Doctor Dashboard Website](docs/design/DoctorDashboard_Screen_Website.png)

The Doctor Dashboard enables doctors to view scheduled appointments, access patient medical records, and manage consultations efficiently with role-based access control.

---

### Booking Appointment Interface
![Booking Appointment Website](docs/design/BookingAppointment_Screen_Website.png)

Patients can select available doctors, choose suitable dates and time slots, and confirm their appointment. The system interacts with REST APIs to securely store and retrieve booking data.

---

### My Appointments (Patient View)
![My Appointments Website](docs/design/MyAppointmentsScreen_Website.png)

This interface displays all scheduled, completed, or cancelled appointments with proper status indicators for better tracking and transparency.

---

### Doctor Appointments Management
![Doctor Appointments Website](docs/design/PatientAppoint_Screen_Doctor_Website.png)

Doctors can manage patient appointments, review consultation details, and update appointment statuses through a structured and intuitive interface.

---

### Doctor Profile Page
![Doctor Profile Website](docs/design/Doctor_Profile_Website.png)

The Doctor Profile page displays specialization, availability, and professional information to help patients make informed booking decisions.

---

### Patient Profile Page
![Patient Profile Website](docs/design/Patient_Profile_Website.png)

This screen allows patients to view and update personal details securely while maintaining validation and database consistency.

---

### Medical Records (Website)
![Medical Records Website](docs/design/Medical_Records_Screen_Website.png)

Patients can upload and manage medical reports securely. Uploaded records are accessible only to authorized doctors, ensuring privacy and data protection.

---

### Patient Medical Records View
![Patient Medical Record Website](docs/design/Patient_MedicalRecord_Screen_Website.png)

This interface allows patients to view their previously uploaded medical documents in a structured format.
