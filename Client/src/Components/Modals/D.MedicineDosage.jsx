import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { BiPlus } from 'react-icons/bi';
import { Button, Input } from '../Form';
import axios from 'axios';

function DMedicineDosageModal({ closeModal, isOpen, vaccineId }) {
  const [vaccines, setVaccines] = useState([]);
  const [selectedVaccine, setSelectedVaccine] = useState(null);
  const [batchNumber, setBatchNumber] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchVaccines = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/vaccines');
        setVaccines(response.data);
      } catch (error) {
        console.error('Error fetching Vaccines:', error);
      }
    };
    fetchVaccines();
  }, []);

  const handleVaccineSelection = (e) => {
    const selectedVaccineId = e.target.value;
    const selectedVaccine = vaccines.find(vaccine => vaccine._id === selectedVaccineId);
    setSelectedVaccine(selectedVaccine);
    if (selectedVaccine) {
      setBatchNumber(selectedVaccine.batchNumber || '');
    }
  };

  const handleAddItem = async () => {
    try {
      // Send a POST request to add a new vaccine
      await axios.post('http://localhost:5000/api/usevaccines', {
        vaccineName: selectedVaccine.vaccineName,
        batchNumber: batchNumber
      });
      // Fetch updated vaccine list after adding
      const response = await axios.get('http://localhost:5000/api/usevaccines');
      setVaccines(response.data);
      // Show message
      setMessage('Vaccine added to the table');
      // Close the modal
      closeModal();
    } catch (error) {
      console.error('Error adding vaccine:', error);
    }
  };

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      title="Add Item"
      width={'max-w-xl'}
    >
      <div className="flex flex-col gap-6">
        {/* Choose Vaccine */}
        <div className="flex flex-col gap-4 w-full">
          <p className="text-black text-sm">Choose Vaccine</p>
          <div className="flex items-center justify-between rounded-lg border border-subMain border-dashed py-4 w-full">
            <select
              onChange={handleVaccineSelection}
              value={selectedVaccine ? selectedVaccine._id : ''}
              className="px-4 py-2 w-full text-sm"
            >
              <option value="">Select a vaccine</option>
              {vaccines.map((vaccine) => (
                <option key={vaccine._id} value={vaccine._id}>
                  {vaccine.vaccineName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Batch Number */}
        <Input
          label="Batch Number"
          color={true}
          type={'text'}
          value={batchNumber}
          onChange={(e) => setBatchNumber(e.target.value)}
        />

        {/* Add Button */}
        <Button onClick={handleAddItem} label="Add" Icon={BiPlus} />
        
        {/* Display Message */}
        {message && <p className="text-green-500">{message}</p>}
      </div>
    </Modal>
  );
}

export default DMedicineDosageModal;

