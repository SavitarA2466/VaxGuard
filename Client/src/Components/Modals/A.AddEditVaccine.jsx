import React, { useState } from 'react';
import axios from 'axios';
import Modal from './Modal';
import { Button, Input, Textarea } from '../Form';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import { toast } from 'react-hot-toast';

function AAddEditVaccineModal({ closeModal, isOpen, datas,  isEdit,itemId }) {
  const [vaccine, setVaccine] = useState({
    vaccineName: '',
    batchNumber: '',
    instock: '',
    description: '',
  });

  const handleInputChange = (e) => {
    setVaccine({ ...vaccine, 
      [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    console.log('vaccine:', vaccine);

    // Check if all required fields are filled
    if (!vaccine.vaccineName.trim() || !vaccine.batchNumber.trim() || !vaccine.instock.trim() || !vaccine.description.trim()) {
      toast.error('Please fill in all the fields');
      return;
    }
    if(isEdit){
      try {
        console.log(itemId)
        await axios.put(`http://localhost:5000/api/vaccines/${itemId}`, vaccine);
        toast.success('Vaccine updated successfully');
        closeModal();
      } catch (error) {
        console.error('Error updating Vaccine:', error.response.data);
        toast.error('Error updating vaccine');
      }
    } 
    if(!isEdit){
    try {
      await axios.post('http://localhost:5000/api/vaccines', vaccine);
      toast.success('Vaccine saved successfully');
      closeModal();
    } catch (error) {
      console.error('Error saving Vaccine:', error.response.data);
      toast.error('Error saving vaccine');
    }
  }
  };

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      title={datas?.name ? 'Edit Vaccine' : 'New Vaccine'}
      width={'max-w-3xl'}
      onSubmit={handleSubmit}
    >
      <div className="flex-colo gap-6">
        <div className="grid sm:grid-cols-1 gap-4 w-full">
          <div className="flex w-full flex-col gap-3">
            <Input
              label="Vaccine Name"
              name="vaccineName"
              value={vaccine.vaccineName}
              onChange={handleInputChange}
              type="text"
              color={true}
            />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <Input
            label="Batch Number"
            name="batchNumber"
            value={vaccine.batchNumber}
            onChange={handleInputChange}
            type="text"
            color={true}
          />
          <Input
            label="Instock"
            name="instock"
            value={vaccine.instock}
            onChange={handleInputChange}
            type="number"
            color={true}
          />
        </div>
        <Textarea
          label="Description"
          name="description"
          value={vaccine.description}
          onChange={handleInputChange}
          placeholder="Write description here..."
          color={true}
          rows={5}
        />
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <button
            onClick={closeModal}
            className="bg-red-600 bg-opacity-5 text-red-600 text-sm p-4 rounded-lg font-light"
          >
            {datas?.name ? 'Discard' : 'Cancel'}
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

export default AAddEditVaccineModal;
