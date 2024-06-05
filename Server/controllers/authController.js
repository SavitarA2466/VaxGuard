const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  const payload = { userId: user._id };
  const options = { expiresIn: '1h' };
  return jwt.sign(payload, process.env.JWT_SECRET, options);
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email not found' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const token = generateToken(user);

    // Return token in response
    res.json({ token });
  } catch (error) {
    console.error('Login failed:', error);
    res.status(500).json({ message: 'Login failed' });
  }
};
