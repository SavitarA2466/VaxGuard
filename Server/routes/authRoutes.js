const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const JWT_SECRET = "147852369";

// User Registration
router.post('/signup', async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password, confirmPassword } = req.body;
  if (password !== confirmPassword) return res.status(400).send('Passwords do not match');

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).send('User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ firstName, lastName, email, phoneNumber, password: hashedPassword });

    await user.save();
    res.status(201).send('User created successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// User Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Invalid email or password');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).send('Invalid email or password');

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Middleware to authenticate user using JWT
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).send('Access denied');

  jwt.verify(token.split(' ')[1], JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send('Invalid token');
    req.user = user;
    next();
  });
};

// Get all users (Read)
router.get('/users', authenticateToken, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Get a user by ID (Read)
router.get('/users/:id', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('User not found');
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Update a user by ID (Update)
router.put('/users/:id', authenticateToken, async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password, confirmPassword } = req.body;
  if (password !== confirmPassword) return res.status(400).send('Passwords do not match');

  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('User not found');

    const hashedPassword = password ? await bcrypt.hash(password, 10) : user.password;
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.password = hashedPassword;

    await user.save();
    res.status(200).send('User updated successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Delete a user by ID (Delete)
router.delete('/users/:id', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('User not found');

    await user.remove();
    res.status(200).send('User deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
