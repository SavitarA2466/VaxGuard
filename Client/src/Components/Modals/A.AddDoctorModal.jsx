import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { sortsDatas } from '../Datas';
import { Button, Input, Select } from '../Form';
import { BiChevronDown } from 'react-icons/bi';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import { toast } from 'react-hot-toast';
import axios from 'axios';

function AAddDoctorModal({ closeModal, isOpen, doctor, datas }) {
  const [instraction, setInstraction] = useState(sortsDatas.title[0]);
  const [access, setAccess] = useState({});
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    title: "",
    phoneNumber: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnclick = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/doctors', formData);
      toast.success('Doctor added successfully');
      closeModal();
    } catch (error) {
      toast.error('Error adding doctor');
    }
  };

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      title={doctor ? 'Add Doctor' : datas?.id ? 'Edit Stuff' : 'Add Stuff'}
      width={'max-w-3xl'}
    >
      <div className="flex-colo gap-6">
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <Input
            label="Full Name"
            color={true}
            placeholder="John Doe"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
          />

          <div className="flex w-full flex-col gap-3">
            <p className="text-black text-sm">Title</p>
            <Select
              selectedPerson={instraction}
              setSelectedPerson={setInstraction}
              datas={sortsDatas.title}
            >
              <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                {instraction.name} <BiChevronDown className="text-xl" />
              </div>
            </Select>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 w-full">
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

        {/* password */}
        <Input
          label="Password"
          color={true}
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />

        {/* buttones */}
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <button
            onClick={closeModal}
            className="bg-red-600 bg-opacity-5 text-red-600 text-sm p-4 rounded-lg font-light"
          >
            Cancel
          </button>
          <Button label="Save" Icon={HiOutlineCheckCircle} onClick={handleOnclick} />
        </div>
      </div>
    </Modal>
  );
}

export default AAddDoctorModal;
