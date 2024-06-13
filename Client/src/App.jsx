import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Aos from "aos";
import Toast from "./Components/Notifications/Toast";

import AdminDashboard from "./Screens/AdminDashboard";
import DoctorDashboard from "./Screens/DoctorDashboard";
import UserDashboard from "./Screens/UserDashboard";

import AdminAppointments from "./Screens/A.Appointments";
import DoctorAppointments from "./Screens/D.Appointments";
import UserAppointments from "./Screens/U.Appointments";

import AdminPatients from "./Screens/A.Patients/A.Patients";
import AdminDoctors from "./Screens/A.Doctors/A.Doctors";
import Child from "./Screens/Childs/Child";
import DoctorPatients from "./Screens/D.Patients/D.Patients";
import UserDoctors from "./Screens/U.Doctors/U.Doctors";

import AdminAnnouncement from "./Screens/A.Announcement";
import DoctorAnnouncement from "./Screens/D.Announcement";
import UserAnnouncement from "./Screens/U.Announcement";

import AdminServices from "./Screens/A.Services";

import AdminSettings from "./Screens/A.Settings";
import DoctorSettings from "./Screens/D.Settings";
import UserSettings from "./Screens/U.Settings";

import Vaccine from "./Screens/A.Vaccine";

import AdminPatientProfile from "./Screens/A.Patients/A.PatientProfile";
import AdminDoctorProfile from "./Screens/A.Doctors/A.DoctorProfile";
import ChildProfile from "./Screens/Childs/ChildProfile";
import DoctorPatientProfile from "./Screens/D.Patients/D.PatientProfile";

import AdminCreatePatient from "./Screens/A.Patients/A.CreatePatient";
import CreateChild from "./Screens/Childs/CreateChild";
import DNewMedicalRecode from "./Screens/D.Patients/D.NewMedicalRecode";

import NotFound from "./Screens/NotFound";
import Login from "./Login";
import Signup from "./Signup";
import ProtectedAdminRoutes from "./Protected/ProtectedAdminRoutes";
import ProtectedUserRoutes from "./Protected/ProtectedUserRoutes";
import ProtectedDoctorRoutes from "./Protected/ProtectedDoctorRoutes";

function App() {
  Aos.init();

  return (
    <>
      {/* Toaster */}
      <Toast />
      {/* Routes */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Admin */}
          <Route element={<ProtectedAdminRoutes />}>
            <Route path="/adminDashboard" element={<AdminDashboard />} />
            <Route path="/A.patients" element={<AdminPatients />} />
            <Route
              path="/A.patients/preview/:id"
              element={<AdminPatientProfile />}
            />
            <Route path="/A.patients/create" element={<AdminCreatePatient />} />
            <Route path="/A.doctors" element={<AdminDoctors />} />
            <Route
              path="/A.doctors/preview/:id"
              element={<AdminDoctorProfile />}
            />
            <Route path="/A.appointments" element={<AdminAppointments />} />
            <Route path="/A.announcement" element={<AdminAnnouncement />} />
            <Route path="/A.vaccine" element={<Vaccine />} />
            <Route path="/A.services" element={<AdminServices />} />
            <Route path="/A.settings" element={<AdminSettings />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Doctor */}
          <Route element={ProtectedDoctorRoutes}>
            <Route path="/doctorDashboard" element={<DoctorDashboard />} />
            <Route path="/D.Patients" element={<DoctorPatients />} />
            <Route
              path="/D.Patients/D.PatientProfile"
              element={<DoctorPatientProfile />}
            />
            <Route
              path="/D.patients/preview/:id"
              element={<DoctorPatientProfile />}
            />
            <Route path="/D.appointments" element={<DoctorAppointments />} />
            <Route path="/D.announcement" element={<DoctorAnnouncement />} />
            <Route
              path="/D.patients/visiting/:id"
              element={<DNewMedicalRecode />}
            />
            <Route path="/D.settings" element={<DoctorSettings />} />
          </Route>
          {/* User */}
          <Route element={<ProtectedUserRoutes />}>
            <Route path="/userDashboard" element={<UserDashboard />} />
            <Route path="/U.appointments" element={<UserAppointments />} />
            <Route path="/U.Doctors" element={<UserDoctors />} />
            <Route path="/U.announcement" element={<UserAnnouncement />} />
            <Route path="/U.settings" element={<UserSettings />} />
            <Route path="/child" element={<Child />} />
            <Route path="/child/profile/:id" element={<ChildProfile />} />
            <Route path="/child/create" element={<CreateChild />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
