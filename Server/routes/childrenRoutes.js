const express = require('express');
const router = express.Router();
const Child = require('../models/Child');

// Create a new child record
router.post('/', async (req, res) => {
  const { fullName, gender, dateOfBirth, bloodType, weight, address } = req.body;

  try {
    const newChild = new Child({
      fullName,
      gender,
      dateOfBirth,
      bloodType,
      weight,
      address,
    });

    const savedChild = await newChild.save();
    res.status(201).json(savedChild);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all child records
router.get('/', async (req, res) => {
  try {
    const children = await Child.find();
    res.status(200).json(children);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a specific child record by ID
router.get('/:id', async (req, res) => {
  try {
    const child = await Child.findById(req.params.id);
    if (!child) return res.status(404).json({ message: 'Child not found' });
    res.status(200).json(child);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a child record by ID
router.put('/:id', async (req, res) => {
  const { fullName, gender, dateOfBirth, bloodType, weight, address } = req.body;

  try {
    const updatedChild = await Child.findByIdAndUpdate(
      req.params.id,
      { fullName, gender, dateOfBirth, bloodType, weight, address },
      { new: true }
    );

    if (!updatedChild) return res.status(404).json({ message: 'Child not found' });
    res.status(200).json(updatedChild);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a child record by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedChild = await Child.findByIdAndDelete(req.params.id);
    if (!deletedChild) return res.status(404).json({ message: 'Child not found' });
    res.status(200).json({ message: 'Child deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

// Get all child names
router.get('/names', async (req, res) => {
  try {
    const children = await Child.find({}, 'fullName'); // Only select the fullName field
    res.status(200).json(children);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});