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
  doctor: {
    type: Schema.ObjectId,
    ref: "Doctor",
  },
  description: {
    type: String,
    required: true,
  },
  shareWithEmail: {
    type: Boolean,
    default: false,
  },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
