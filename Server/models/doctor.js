const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  role: {
    type: String,
    enum: ["Doctor", "User"], // 'Doctor' or 'User' roles
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
