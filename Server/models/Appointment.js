const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const appointmentSchema = new mongoose.Schema({
  child: {
    type: Schema.ObjectId,
    ref: "Child",
  },
  purposeOfVisit: {
    type: Schema.ObjectId,
    ref: "Service",
  },
  dateOfVisit: {
    type: Date,
    required: true,
  },
  bookedBy: {
    type: Schema.ObjectId,
    ref: "User",
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
  },
  doctor: {
    type: Schema.ObjectId,
    ref: "Doctor",
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Pending",
  },
  shareWithEmail: {
    type: Boolean,
    default: false,
  },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
