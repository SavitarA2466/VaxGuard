import React, { useState } from 'react'; 
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom'; 

const Signup = () => {
  const navigate = useNavigate(); // Hook for programmatic navigation
  const [formData, setFormData] = useState({
    firstName: '', // State for first name input
    lastName: '', // State for last name input
    email: '', // State for email input
    phoneNumber: '', // State for phone number input
    password: '', // State for password input
    confirmPassword: '', // State for confirm password input
    role: 'user', // Default role is 'user'
  });

  const [confirmPasswordError, setConfirmPasswordError] = useState(''); // State for managing confirm password errors

  const handleChange = (e) => {
    setFormData({
      ...formData, // Spread the existing formData
      [e.target.name]: e.target.value, // Update the specific field
    });

    if (e.target.name === 'confirmPassword') {
      setConfirmPasswordError(''); // Clear confirm password error when input changes
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Client-side form validation
    let isFormValid = true;
    if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordError('Passwords do not match'); // Set error if passwords don't match
      isFormValid = false; // Mark form as invalid
    }

    if (!isFormValid) {
      return; // Exit function if form is invalid
    }

    try {
      await axios.post('http://localhost:5000/api/auth/signup', formData); // Send form data to server
      navigate('/'); // Navigate to home page after successful signup
    } catch (error) {
      console.error(error); // Log error if signup fails
      alert('Signup failed'); // Alert user about signup failure
    }
  };

  return (
    <div className="w-full h-screen flex-colo bg-dry">
      <form
        className="w-2/5 p-8 rounded-2xl mx-auto bg-white flex-colo"
        onSubmit={handleSubmit} // Attach submit handler to form
      >
        <img
          src="/images/logo.png" // Logo image
          alt="logo"
          className="w-48 h-16 object-contain mb-6"
        />
        <div className="flex flex-col gap-4 w-full mb-6">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text" // Text input type
            name="firstName" // Name attribute to match formData
            className="p-2 border border-gray-300 rounded-md w-full"
            value={formData.firstName} // Set value from state
            onChange={handleChange} // Handle input changes
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text" // Text input type
            name="lastName" // Name attribute to match formData
            className="p-2 border border-gray-300 rounded-md w-full"
            value={formData.lastName} // Set value from state
            onChange={handleChange} // Handle input changes
          />
          <label htmlFor="email">Email</label>
          <input
            type="email" // Email input type
            name="email" // Name attribute to match formData
            className="p-2 border border-gray-300 rounded-md w-full"
            value={formData.email} // Set value from state
            onChange={handleChange} // Handle input changes
          />
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text" // Text input type
            name="phoneNumber" // Name attribute to match formData
            className="p-2 border border-gray-300 rounded-md w-full"
            value={formData.phoneNumber} // Set value from state
            onChange={handleChange} // Handle input changes
          />
          <label htmlFor="password">Password</label>
          <input
            type="password" // Password input type
            name="password" // Name attribute to match formData
            className="p-2 border border-gray-300 rounded-md w-full"
            value={formData.password} // Set value from state
            onChange={handleChange} // Handle input changes
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password" // Password input type
            name="confirmPassword" // Name attribute to match formData
            className={`p-2 border border-gray-300 rounded-md w-full ${
              confirmPasswordError ? 'border-red-500' : ''
            }`} // Apply error styling if confirmPasswordError exists
            value={formData.confirmPassword} // Set value from state
            onChange={handleChange} // Handle input changes
          />
          {confirmPasswordError && (
            <p className="text-red-500 text-sm mt-1">{confirmPasswordError}</p> // Display confirm password error if any
          )}
          <label htmlFor="role">Role</label>
          <input
            type="text" // Text input type
            name="role" // Name attribute to match formData
            className="p-2 border border-gray-300 rounded-md w-full"
            value={formData.role} // Set value from state
            disabled // Disable editing of role
          />
        </div>
        <div className="flex flex-col gap-4 w-full">
          <button
            type="submit" // Submit button type
            className="p-2 bg-blue-500 text-white rounded-md w-full"
          >
            Sign Up
          </button>
          <button
            type="button" // Button to navigate to login page
            onClick={() => navigate('/')}
            className="p-2 bg-blue-500 text-white rounded-md w-full"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup; // Export the Signup component
