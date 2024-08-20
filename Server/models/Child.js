const mongoose = require("mongoose");

const ChildSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  bloodType: {
    type: String,
    required: true,
  },
  weight: {
    type: String,
    required: true,
  },
  parent: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  address: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Child", ChildSchema);
