import React, { useState } from "react"; 
import axios from "axios"; 
import { Navigate, useNavigate } from "react-router-dom"; 
import useGlobalStore from "./globalStore"; 

const Login = () => {
  const navigate = useNavigate(); // Hook for programmatic navigation
  const [formData, setFormData] = useState({
    email: "", // State for email input
    password: "", // State for password input
  });

  const { setUser, user } = useGlobalStore(); // Destructure setUser and user from global store

  const [passwordError, setPasswordError] = useState(""); // State for managing password input errors

  const handleChange = (e) => {
    setFormData({
      ...formData, // Spread the existing formData
      [e.target.name]: e.target.value, // Update the specific field
    });

    if (e.target.name === "password") {
      setPasswordError(""); // Clear password error when input changes
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login", // Endpoint for login
        formData // Send form data to server
      );

      localStorage.setItem("token", response.data.token); // Save token to localStorage
      setUser(response.data.user); // Update global store with user data

      // Navigate based on user role
      if (response.data.user.role === "admin") {
        navigate("/adminDashboard");
      } else if (response.data.user.role === "doctor") {
        navigate("/doctorDashboard");
      } else {
        console.log("userDashboard");
        navigate("/userDashboard");
      }
    } catch (error) {
      console.error(error); // Log error if login fails
      alert("Login failed"); // Alert user about login failure
    }
  };

  // Redirect based on user role if already logged in
  if (user && user.role === "admin") {
    return <Navigate to="/adminDashboard" />;
  }
  if (user && user.role === "doctor") {
    return <Navigate to="/doctorDashboard" />;
  }
  if (user && user.role === "user") {
    return <Navigate to="/userDashboard" />;
  }

  return (
    <div className="w-full h-screen flex-colo bg-dry">
      <form
        className="w-2/5 p-8 mx-auto bg-white rounded-2xl flex-colo"
        onSubmit={handleSubmit} // Attach submit handler to form
      >
        <img
          src="/images/logo.png" // Logo image
          alt="logo"
          className="object-contain w-48 h-16 mb-6"
        />
        <div className="flex flex-col w-full gap-4 mb-6">
          <label htmlFor="email">Email</label>
          <input
            type="email" // Email input type
            name="email" // Name attribute to match formData
            className="w-full p-2 border border-gray-300 rounded-md"
            value={formData.email} // Set value from state
            onChange={handleChange} // Handle input changes
          />
          <label htmlFor="password">Password</label>
          <input
            type="password" // Password input type
            name="password" // Name attribute to match formData
            className={`p-2 border border-gray-300 rounded-md w-full ${
              passwordError ? "border-red-500" : ""
            }`} // Apply error styling if passwordError exists
            value={formData.password} // Set value from state
            onChange={handleChange} // Handle input changes
          />
          {passwordError && (
            <p className="mt-1 text-sm text-red-500">{passwordError}</p> // Display password error if any
          )}
        </div>
        <div className="flex flex-col w-full gap-4">
          <button
            type="submit" // Submit button type
            className="w-full p-2 text-white bg-blue-500 rounded-md"
          >
            Login
          </button>
          <button
            type="button" // Button to navigate to sign-up page
            onClick={() => navigate("/signup")}
            className="w-full p-2 text-white bg-blue-500 rounded-md"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login; // Export the Login component
