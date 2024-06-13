const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const usevaccineSchema = new Schema({
  vaccineName: { type: String, required: true },
  batchNumber: { type: String, required: true },
}, {
  timestamps: true,
});

const UseVaccine = mongoose.model('UseVaccine', usevaccineSchema);

module.exports = UseVaccine;
