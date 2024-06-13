const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  childName: {
    type: String,
    required: true,
  },
  purposeOfVisit:{
    type: String,
    required: true,
  },
  dateOfVisit: {
    type: Date,
    required: true,
  },
  startTime:{
    type: Date,
    required: true,
  },
  doctor: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  shareWithEmail:  {
    type: Boolean,
    default: false,
  },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;