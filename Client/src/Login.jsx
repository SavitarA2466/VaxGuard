import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [passwordError, setPasswordError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === 'password') {
      setPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      console.log(response.data);
      localStorage.setItem('token', response.data.token);
      navigate('/adminDashboard');
    } catch (error) {
      console.error(error);
      alert('Login failed');
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
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            className="p-2 border border-gray-300 rounded-md w-full"
            value={formData.email}
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            className={`p-2 border border-gray-300 rounded-md w-full ${
              passwordError ? 'border-red-500' : ''
            }`}
            value={formData.password}
            onChange={handleChange}
          />
          {passwordError && (
            <p className="text-red-500 text-sm mt-1">{passwordError}</p>
          )}
        </div>
        <div className="flex flex-col gap-4 w-full">
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-md w-full"
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => navigate('/signup')}
            className="p-2 bg-blue-500 text-white rounded-md w-full"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
