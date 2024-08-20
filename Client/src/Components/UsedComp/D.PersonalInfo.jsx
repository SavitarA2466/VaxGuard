import React, { useState, useEffect } from 'react';
import { Button, Input } from '../Form';
import { toast } from 'react-hot-toast';
import axios from 'axios';

function DPersonalInfo({ doctorId }) {
  const [doctor, setDoctor] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
  });

  useEffect(() => {
    // Fetch doctor data by ID when component mounts
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(`/api/doctors/${doctorId}`);
        setDoctor(response.data);
      } catch (error) {
        console.error('Error fetching doctor:', error);
      }
    };

    fetchDoctor();
  }, [doctorId]);

  const handleChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(`/api/doctors/${doctorId}`, doctor);
      toast.success('Doctor details updated successfully');
    } catch (error) {
      console.error('Error updating doctor:', error);
      toast.error('Failed to update doctor details');
    }
  };

  return (
    <div className="flex-colo gap-4">
      <Input
        label="Full Name"
        name="fullName"
        value={doctor.fullName}
        onChange={handleChange}
        color={true}
        type="text"
      />
      <Input
        label="Phone Number"
        name="phoneNumber"
        value={doctor.phoneNumber}
        onChange={handleChange}
        color={true}
        type="number"
      />
      <Input
        label="Email"
        name="email"
        value={doctor.email}
        onChange={handleChange}
        color={true}
        type="email"
      />
      <div className="flex justify-center"> 
        <Button label={'Save Changes'} onClick={handleSubmit} />
      </div>
    </div>
  );
}

export default DPersonalInfo;

