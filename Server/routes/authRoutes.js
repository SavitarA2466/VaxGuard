const express = require("express"); 
const bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken"); 
const User = require("../models/User"); 

const router = express.Router(); // Create a new router object
const JWT_SECRET = "147852369"; // Secret key for JWT signing and verification

// User Registration
router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password, confirmPassword } = req.body;

  // Check if passwords match
  if (password !== confirmPassword)
    return res.status(400).send("Passwords do not match");

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).send("User already exists");

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const user = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    // Save the user to the database
    await user.save();
    res.status(201).send("User created successfully"); // Respond with success message
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).send("Server error"); // Respond with error message and 500 status code
  }
});

// User Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("Invalid email or password");

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).send("Invalid email or password");

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "10h" });
    res.status(200).json({ token, user }); // Respond with token and user information
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).send("Server error"); // Respond with error message and 500 status code
  }
});

// Middleware to authenticate user using JWT
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Access denied");

  // Verify the token
  jwt.verify(token.split(" ")[1], JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send("Invalid token");
    req.user = user; // Attach the user to the request object
    next(); // Pass control to the next middleware
  });
};

// Get the current user
router.get("/me", authenticateToken, async (req, res) => {
  try {
    // Find the user by ID from the token
    const user = await User.findById(req.user.userId);
    res.status(200).json(user); // Respond with the user information
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).send("Server error"); // Respond with error message and 500 status code
  }
});

// Get all users
router.get("/users", authenticateToken, async (req, res) => {
  try {
    // Find all users
    const users = await User.find();
    res.status(200).json(users); // Respond with the list of users
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).send("Server error"); // Respond with error message and 500 status code
  }
});

// Get a user by ID
router.get("/users/:id", authenticateToken, async (req, res) => {
  try {
    // Find the user by ID
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("User not found");
    res.status(200).json(user); // Respond with the user information
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).send("Server error"); // Respond with error message and 500 status code
  }
});

// Update a user by ID
router.put("/users/:id", authenticateToken, async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password, confirmPassword } = req.body;

  // Check if passwords match
  if (password !== confirmPassword)
    return res.status(400).send("Passwords do not match");

  try {
    // Find the user by ID
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("User not found");

    // Hash the password if provided
    const hashedPassword = password ? await bcrypt.hash(password, 10) : user.password;
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.password = hashedPassword;

    // Save the updated user
    await user.save();
    res.status(200).send("User updated successfully"); // Respond with success message
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).send("Server error"); // Respond with error message and 500 status code
  }
});

// Delete a user by ID
router.delete("/users/:id", authenticateToken, async (req, res) => {
  try {
    // Find the user by ID
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("User not found");

    // Remove the user from the database
    await user.remove();
    res.status(200).send("User deleted successfully"); // Respond with success message
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).send("Server error"); // Respond with error message and 500 status code
  }
});

module.exports = router; // Export the router
