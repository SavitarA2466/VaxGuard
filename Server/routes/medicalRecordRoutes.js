// backend/routes/medicalRecords.js
const express = require('express');
const router = express.Router();
const MedicalRecord = require('../models/MedicalRecord');

// Middleware to get medical record by ID
async function getMedicalRecord(req, res, next) {
  try {
    const medicalRecord = await MedicalRecord.findById(req.params.id).populate('doctor services');
    if (medicalRecord == null) {
      return res.status(404).json({ message: 'Medical record not found' });
    }
    res.medicalRecord = medicalRecord;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// Create a new medical record
router.post('/', async (req, res) => {
  const { doctor, services, description } = req.body;

  // Check if all required fields are provided
  if (!doctor || !services || !description) {
    return res.status(400).json({ message: 'Doctor, services, and description are required' });
  }

  try {
    const newMedicalRecord = new MedicalRecord({
      doctor,
      services,
      description
    });

    await newMedicalRecord.save();
    res.status(201).json(newMedicalRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Fetch all medical records
router.get('/', async (req, res) => {
  try {
    const medicalRecords = await MedicalRecord.find().populate('doctor services');
    res.json(medicalRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Fetch a specific medical record
router.get('/:id', getMedicalRecord, (req, res) => {
  res.json(res.medicalRecord);
});

// Update a medical record
router.put('/:id', getMedicalRecord, async (req, res) => {
  if (req.body.doctor != null) {
    res.medicalRecord.doctor = req.body.doctor;
  }
  if (req.body.services != null) {
    res.medicalRecord.services = req.body.services;
  }
  if (req.body.description != null) {
    res.medicalRecord.description = req.body.description;
  }

  try {
    const updatedMedicalRecord = await res.medicalRecord.save();
    res.json(updatedMedicalRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a medical record
router.delete('/:id', getMedicalRecord, async (req, res) => {
  try {
    await res.medicalRecord.remove();
    res.json({ message: 'Medical record deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
