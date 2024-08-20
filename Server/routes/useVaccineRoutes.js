const router = require('express').Router();
const UseVaccine = require('../models/useVaccine');

// Get all vaccines
router.route('/').get((req, res) => {
  UseVaccine.find()
    .then(vaccines => res.json(vaccines))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get a single vaccine by ID
router.route('/:id').get((req, res) => {
  UseVaccine.findById(req.params.id)
    .then(vaccine => res.json(vaccine))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add a new vaccine
router.route('/').post((req, res) => {
  const vaccineName = req.body.vaccineName;
  const batchNumber = req.body.batchNumber;

  const newVaccine = new UseVaccine({ vaccineName, batchNumber });

  newVaccine.save()
    .then(() => res.json('Vaccine added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Update a vaccine by ID
router.route('/:id').put((req, res) => {
  UseVaccine.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(() => res.json('Vaccine updated!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete a vaccine by ID
router.route('/:id').delete((req, res) => {
  UseVaccine.findByIdAndDelete(req.params.id)
    .then(() => res.json('Vaccine deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;

