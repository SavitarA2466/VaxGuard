const mongoose = require('mongoose');

const medicalRecordSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  services: [
    {
      type: mongoose.Schema.Types.ObjectId,
      type: Array,
      ref: 'Service',
      required: true
    }
  ],
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('MedicalRecord', medicalRecordSchema);
