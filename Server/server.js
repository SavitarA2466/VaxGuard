const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const doctorsRouter = require("./routes/doctorRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const vaccineRoutes = require("./routes/vaccinesRoutes");
const childrenRoutes = require("./routes/childrenRoutes");
const servicesRoute = require("./routes/serviceRoutes");
const dosageRoutes = require("./routes/dosageRoutes");
const appointmentRoutes = require("./routes/appointmentRoute");
const UseVaccineRouter = require("./routes/useVaccineRoutes");
const medicalRecordRouter = require("./routes/medicalRecordRoutes");

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/VaxGuard")
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorsRouter);
app.use("/api/services", serviceRoutes);
app.use("/api/vaccines", vaccineRoutes);
app.use("/api/children", childrenRoutes);
app.use("/api/services", servicesRoute);
app.use("/api/dosages", dosageRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/usevaccines", UseVaccineRouter);
app.use("/api/medicalrecords", medicalRecordRouter);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
