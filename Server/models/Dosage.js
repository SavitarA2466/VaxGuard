const mongoose = require('mongoose');

const dosageSchema = new mongoose.Schema({
  vaccineName: {
    type: String,
    required: true,
  },
  batchNumber: {
    type: String,
    required: true,
  },
  dosageQuantity: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Dosage', dosageSchema);

