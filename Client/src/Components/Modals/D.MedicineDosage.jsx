import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { BiPlus } from 'react-icons/bi';
import { Button, Input } from '../Form';
import axios from 'axios';

function DMedicineDosageModal({ closeModal, isOpen, vaccineId }) {
  const [vaccines, setVaccines] = useState([]); // State to hold the list of vaccines
  const [selectedVaccine, setSelectedVaccine] = useState(null); // State to hold the currently selected vaccine
  const [batchNumber, setBatchNumber] = useState(''); // State to hold the batch number
  const [message, setMessage] = useState(''); // State to hold success or error messages

  useEffect(() => {
    const fetchVaccines = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/vaccines'); // Fetch vaccines from API
        setVaccines(response.data); // Update the state with the fetched vaccines
      } catch (error) {
        console.error('Error fetching Vaccines:', error); // Log any errors to the console
      }
    };
    fetchVaccines(); // Call the fetch function when the component mounts
  }, []); // Empty dependency array ensures this effect runs only once after the initial render

  const handleVaccineSelection = (e) => {
    const selectedVaccineId = e.target.value; // Get the selected vaccine ID from the event
    const selectedVaccine = vaccines.find(vaccine => vaccine._id === selectedVaccineId); // Find the selected vaccine
    setSelectedVaccine(selectedVaccine); // Update the state with the selected vaccine
    if (selectedVaccine) {
      setBatchNumber(selectedVaccine.batchNumber || ''); // Set the batch number from the selected vaccine
    }
  };

  const handleAddItem = async () => {
    try {
      // Send a POST request to add a new vaccine to the database
      await axios.post('http://localhost:5000/api/usevaccines', {
        vaccineName: selectedVaccine.vaccineName, // Pass the vaccine name and batch number
        batchNumber: batchNumber
      });
      // Fetch the updated list of vaccines
      const response = await axios.get('http://localhost:5000/api/usevaccines');
      setVaccines(response.data); // Update the state with the new vaccine list
      setMessage('Vaccine added to the table'); // Set success message
      closeModal(); // Close the modal
    } catch (error) {
      console.error('Error adding vaccine:', error); // Log any errors to the console
    }
  };

  return (
    <Modal
      closeModal={closeModal} // Function to close the modal
      isOpen={isOpen} // Boolean to control if the modal is open
      title="Add Item" // Title of the modal
      width={'max-w-xl'} // Width of the modal
    >
      <div className="flex flex-col gap-6">
        {/* Choose Vaccine */}
        <div className="flex flex-col gap-4 w-full">
          <p className="text-black text-sm">Choose Vaccine</p>
          <div className="flex items-center justify-between rounded-lg border border-subMain border-dashed py-4 w-full">
            <select
              onChange={handleVaccineSelection} // Event handler for selecting a vaccine
              value={selectedVaccine ? selectedVaccine._id : ''} // Set the value of the select box
              className="px-4 py-2 w-full text-sm"
            >
              <option value="">Select a vaccine</option>
              {vaccines.map((vaccine) => (
                <option key={vaccine._id} value={vaccine._id}>
                  {vaccine.vaccineName} // Display vaccine names
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
          value={batchNumber} // Set the value of the input field
          onChange={(e) => setBatchNumber(e.target.value)} // Event handler for input changes
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
