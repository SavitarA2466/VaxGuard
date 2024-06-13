const express = require('express');
const router = express.Router();
const Doctor = require('../models/doctor');

// Get all doctors
router.get('/', async (req, res) => {
try {
const doctors = await Doctor.find();
res.json(doctors);
} catch (error) {
console.error('Error fetching doctors:', error);
res.status(500).json({ message: 'Server Error' });
}
});

// Add a doctor
router.post('/', async (req, res) => {
const newDoctor = new Doctor(req.body);
try {
const savedDoctor = await newDoctor.save();
res.status(201).json(savedDoctor);
} catch (error) {
console.error('Error adding doctor:', error);
res.status(400).json({ message: 'Failed to add doctor', error: error.message });
}
});

// Delete a doctor by ID
router.delete('/:id', async (req, res) => {
try {
await Doctor.findByIdAndDelete(req.params.id);
res.sendStatus(204);
} catch (error) {
console.error('Error deleting doctor:', error);
res.status(500).json({ message: 'Server Error' });
}
});

// Update a doctor by ID
router.put('/:id', async (req, res) => {
try {
const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.id, req.body);
res.json(updatedDoctor);
} catch (error) {
console.error('Error updating doctor:', error);
res.status(400).json({ message: 'Failed to update doctor' });
}
});

// Get a single doctor by ID
router.get('/:id', async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.status(200).json(doctor);
    } catch (error) {
        console.error('Error fetching doctor:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;


