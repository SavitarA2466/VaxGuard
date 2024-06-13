import React, { useState } from "react";
import Modal from "./Modal";
import { Button, Input } from "../Form";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

function AAddDoctorModal({ closeModal, isOpen, doctor, datas }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "", // New field for role
  });

  const qc = useQueryClient();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.phoneNumber.trim() ||
      !formData.password.trim() ||
      !formData.role.trim()
    ) {
      toast.error("Please fill in all the fields");
      return;
    }

    try {
      // Send the form data to the backend
      await axios.post("http://localhost:5000/api/doctors", formData);
      qc.invalidateQueries({ queryKey: ["all_doctors"] });
      toast.success("Doctor added successfully");
      closeModal();
    } catch (error) {
      console.error("Error adding doctor:", error.response.data);
      toast.error("Error adding doctor");
    }
  };

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      title={doctor ? "Add Doctor" : datas?.id ? "Edit Stuff" : "Add Stuff"}
      width={"max-w-3xl"}
      onSubmit={handleSubmit}
    >
      <div className="gap-6 flex-colo">
        <div className="grid w-full gap-4 sm:grid-cols-1">
          <Input
            label="Full Name"
            color={true}
            placeholder="John Doe"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
          />
        </div>

        <div className="grid w-full gap-4 sm:grid-cols-2">
          <Input
            label="Email"
            color={true}
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <Input
            label="Phone Number"
            color={true}
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />
        </div>

        <Input
          label="Password"
          color={true}
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />

        {/* Dropdown for Role */}
        <div className="grid w-full gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select Role</option>
            <option value="Doctor">Doctor</option>
            <option value="User">User</option>
          </select>
        </div>

        <div className="grid w-full gap-4 sm:grid-cols-2">
          <button
            onClick={closeModal}
            className="p-4 text-sm font-light text-red-600 bg-red-600 rounded-lg bg-opacity-5"
          >
            Cancel
          </button>
          <Button
            label="Save"
            Icon={HiOutlineCheckCircle}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </Modal>
  );
}

export default AAddDoctorModal;
