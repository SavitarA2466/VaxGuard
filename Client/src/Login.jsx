import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useGlobalStore from "./globalStore";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { setUser } = useGlobalStore();

  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === "password") {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);

      if (response.data.user.role === "admin") {
        navigate("/adminDashboard");
      } else if (response.data.user.role === "doctor") {
        navigate("/doctorDashboard");
      } else {
        console.log("userDashboard");
        navigate("/userDashboard");
      }
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  };

  return (
    <div className="w-full h-screen flex-colo bg-dry">
      <form
        className="w-2/5 p-8 mx-auto bg-white rounded-2xl flex-colo"
        onSubmit={handleSubmit}
      >
        <img
          src="/images/logo.png"
          alt="logo"
          className="object-contain w-48 h-16 mb-6"
        />
        <div className="flex flex-col w-full gap-4 mb-6">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={formData.email}
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            className={`p-2 border border-gray-300 rounded-md w-full ${
              passwordError ? "border-red-500" : ""
            }`}
            value={formData.password}
            onChange={handleChange}
          />
          {passwordError && (
            <p className="mt-1 text-sm text-red-500">{passwordError}</p>
          )}
        </div>
        <div className="flex flex-col w-full gap-4">
          <button
            type="submit"
            className="w-full p-2 text-white bg-blue-500 rounded-md"
          >
            Login
          </button>
          <button
            type="button"
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

export default Login;
