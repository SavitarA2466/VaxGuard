// backend/routes/appointments.js
const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

// Create a new appointment
router.post("/", async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).json(appointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find().populate([
      "child",
      "doctor",
      "bookedBy",
      "purposeOfVisit",
    ]);
    res.status(201).json(appointments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/today", async (req, res) => {
  try {
    const appointments = await Appointment.find({
      dateOfVisit: {
        $gte: new Date().setHours(0, 0, 0, 0),
        $lte: new Date().setHours(24, 0, 0, 0),
      },
    }).populate(["child", "doctor", "bookedBy", "purposeOfVisit"]);

    const formatted = appointments.map((a) => ({
      id: a._id,
      time: "2 hrs later",
      user: {
        name: a.child.fullName,
      },
      from: new Date(a.startTime).toLocaleTimeString(),
      to: "12:00 PM",
      hours: 2,
      status: "Pending",
      doctor: {
        name: a.doctor.fullName,
      },
      date: new Date(a.dateOfVisit).toDateString(),
    }));

    res.status(201).json(formatted);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/mine/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const appointments = await Appointment.find({
      bookedBy: id,
    }).populate(["child", "doctor", "purposeOfVisit"]);
    res.status(201).json(appointments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/doctor/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const appointments = await Appointment.find({
      doctor: id,
    }).populate(["child", "doctor", "purposeOfVisit"]);
    res.status(201).json(appointments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Other CRUD routes can be added here

module.exports = router;
