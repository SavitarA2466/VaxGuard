const express = require("express"); 
const router = express.Router(); 
const Appointment = require("../models/Appointment"); 

// Create a new appointment
router.post("/", async (req, res) => {
  try {
    const appointment = new Appointment(req.body); // Create a new appointment instance with the request body data
    await appointment.save(); // Save the appointment to the database
    res.status(201).json(appointment); // Respond with the created appointment and a 201 status code
  } catch (error) {
    res.status(400).json({ message: error.message }); // Respond with an error message and a 400 status code if there is an error
  }
});

// Retrieve all appointments
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find().populate([
      "child", // Populate child field
      "doctor", // Populate doctor field
      "bookedBy", // Populate bookedBy field
      "purposeOfVisit", // Populate purposeOfVisit field
    ]);
    res.status(201).json(appointments); // Respond with the list of appointments and a 201 status code
  } catch (error) {
    res.status(400).json({ message: error.message }); // Respond with an error message and a 400 status code if there is an error
  }
});

// Retrieve today's appointments
router.get("/today", async (req, res) => {
  try {
    const appointments = await Appointment.find({
      dateOfVisit: {
        $gte: new Date().setHours(0, 0, 0, 0), // Start of the current day
        $lte: new Date().setHours(24, 0, 0, 0), // End of the current day
      },
    }).populate(["child", "doctor", "bookedBy", "purposeOfVisit"]);

    // Format the appointments for the response
    const formatted = appointments.map((a) => ({
      id: a._id,
      time: "2 hrs later", // Placeholder for the time
      user: {
        name: a.child.fullName, // User's name
      },
      from: new Date(a.startTime).toLocaleTimeString(), // Start time of the appointment
      to: "12:00 PM", // Placeholder for end time
      hours: 2, // Duration of the appointment
      status: "Pending", // Status of the appointment
      doctor: {
        name: a.doctor.fullName, // Doctor's name
      },
      date: new Date(a.dateOfVisit).toDateString(), // Date of the appointment
    }));

    res.status(201).json(formatted); // Respond with the formatted appointments and a 201 status code
  } catch (error) {
    res.status(400).json({ message: error.message }); // Respond with an error message and a 400 status code if there is an error
  }
});

// Retrieve appointments for a specific user
router.get("/mine/:id", async (req, res) => {
  try {
    const id = req.params.id; // Get the user ID from the request parameters
    const appointments = await Appointment.find({
      bookedBy: id, // Find appointments booked by the user with the specified ID
    }).populate(["child", "doctor", "purposeOfVisit"]);
    res.status(201).json(appointments); // Respond with the list of appointments and a 201 status code
  } catch (error) {
    res.status(400).json({ message: error.message }); // Respond with an error message and a 400 status code if there is an error
  }
});

// Retrieve appointments for a specific doctor
router.get("/doctor/:id", async (req, res) => {
  try {
    const id = req.params.id; // Get the doctor ID from the request parameters
    const appointments = await Appointment.find({
      doctor: id, // Find appointments for the doctor with the specified ID
    }).populate(["child", "doctor", "purposeOfVisit"]);
    res.status(201).json(appointments); // Respond with the list of appointments and a 201 status code
  } catch (error) {
    res.status(400).json({ message: error.message }); // Respond with an error message and a 400 status code if there is an error
  }
});

module.exports = router; // Export the router
