const mongoose = require('mongoose');

const vaccineSchema = new mongoose.Schema({
  vaccineName: {
    type: String,
    required: true,
  },
  batchNumber: {
    type: String,
    required: true,
    unique: true,
  },
  instock: {
    type: Number,
    required: true,
  },
  description:{
    type: String,
    required: true,
  } 
}); 

const Vaccine = mongoose.model('Vaccine', vaccineSchema);

module.exports = Vaccine;