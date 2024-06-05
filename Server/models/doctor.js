const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Doctor', DoctorSchema);


