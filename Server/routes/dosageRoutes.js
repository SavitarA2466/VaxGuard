const express = require('express');
const router = express.Router();
const Dosage = require('../models/Dosage');

// Create a dosage
router.post('/', async (req, res) => {
  try {
    const dosage = new Dosage(req.body);
    await dosage.save();
    res.status(201).send(dosage);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all dosages
router.get('/', async (req, res) => {
  try {
    const dosages = await Dosage.find();
    res.send(dosages);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a single dosage
router.get('/:id', async (req, res) => {
  try {
    const dosage = await Dosage.findById(req.params.id);
    if (!dosage) {
      return res.status(404).send({ message: 'Dosage not found' });
    }
    res.send(dosage);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a dosage
router.patch('/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['vaccineName', 'batchNumber', 'dosageQuantity'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const dosage = await Dosage.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!dosage) {
      return res.status(404).send({ message: 'Dosage not found' });
    }
    res.send(dosage);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a dosage
router.delete('/:id', async (req, res) => {
  try {
    const dosage = await Dosage.findByIdAndDelete(req.params.id);
    if (!dosage) {
      return res.status(404).send({ message: 'Dosage not found' });
    }
    res.send(dosage);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;


