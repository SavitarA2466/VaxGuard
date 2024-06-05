import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === 'confirmPassword') {
      setConfirmPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side form validation
    let isFormValid = true;
    if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      isFormValid = false;
    }

    if (!isFormValid) {
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/auth/signup', formData);
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('Signup failed');
    }
  };

  return (
    <div className="w-full h-screen flex-colo bg-dry">
      <form
        className="w-2/5 p-8 rounded-2xl mx-auto bg-white flex-colo"
        onSubmit={handleSubmit}
      >
        <img
          src="/images/logo.png"
          alt="logo"
          className="w-48 h-16 object-contain mb-6"
        />
        <div className="flex flex-col gap-4 w-full mb-6">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            className="p-2 border border-gray-300 rounded-md w-full"
            value={formData.firstName}
            onChange={handleChange}
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            className="p-2 border border-gray-300 rounded-md w-full"
            value={formData.lastName}
            onChange={handleChange}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            className="p-2 border border-gray-300 rounded-md w-full"
            value={formData.email}
            onChange={handleChange}
          />
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            className="p-2 border border-gray-300 rounded-md w-full"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            className="p-2 border border-gray-300 rounded-md w-full"
            value={formData.password}
            onChange={handleChange}
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            className={`p-2 border border-gray-300 rounded-md w-full ${
              confirmPasswordError ? 'border-red-500' : ''
            }`}
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {confirmPasswordError && (
            <p className="text-red-500 text-sm mt-1">{confirmPasswordError}</p>
          )}
        </div>
        <div className="flex flex-col gap-4 w-full">
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-md w-full"
          >
            Sign Up
          </button>
          <button
            type="button"
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

export default Signup;
