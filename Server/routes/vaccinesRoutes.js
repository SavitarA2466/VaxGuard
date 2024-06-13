const express = require('express');
const router = express.Router();
const Vaccine = require('../models/Vaccine');

// Create a new vaccine
router.post('/', async (req, res) => {
  try {
    const vaccine = new Vaccine(req.body);
    const savedVaccine = await vaccine.save();
    res.status(201).json(savedVaccine);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all vaccines
router.get('/', async (req, res) => {
  try {
    const vaccines = await Vaccine.find();
    res.status(200).json(vaccines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a vaccine by ID
router.get('/:id', async (req, res) => {
  try {
    const vaccine = await Vaccine.findById(req.params.id);
    if (vaccine) {
      res.status(200).json(vaccine);
    } else {
      res.status(404).json({ message: 'Vaccine not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a vaccine by ID
router.put('/:id', async (req, res) => {
  try {
    const vaccine = await Vaccine.findByIdAndUpdate(req.params.id, req.body,);
    if (vaccine) {
      res.status(200).json(vaccine);
    } else {
      res.status(404).json({ message: 'Vaccine not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// Delete a vaccine by ID
router.delete('/:id', async (req, res) => {
  try {
    const vaccine = await Vaccine.findByIdAndDelete(req.params.id);
    if (vaccine) {
      res.status(200).json({ message: 'Vaccine deleted' });
    } else {
      res.status(404).json({ message: 'Vaccine not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
