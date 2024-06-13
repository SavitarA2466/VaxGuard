const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

// Create a new service
router.post('/', async (req, res) => {
  const { name, description, status } = req.body;
  try {
    const newService = new Service({ name, description, status });
    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a single service by ID
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) throw new Error('Service not found');
    res.status(200).json(service);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a service by ID
router.put('/:id', async (req, res) => {
  const { name, description, status } = req.body;
  try {
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      { name, description, status },
      { new: true }
    );
    if (!updatedService) throw new Error('Service not found');
    res.status(200).json(updatedService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a service by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);
    if (!deletedService) throw new Error('Service not found');
    res.status(200).json({ message: 'Service deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
