import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from './Modal';
import { Button, Input, Switchi, Textarea } from '../Form';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import { toast } from 'react-hot-toast';

function AAddEditServiceModal({ closeModal, isOpen, datas }) {
  const [check, setCheck] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (datas) {
      setName(datas.name || '');
      setDescription(datas.description || '');
      setCheck(datas.status || false);
    }
  }, [datas]);

  const handleSave = async () => {
    try {
      if (datas?._id) {
        await axios.put(`http://localhost:5000/api/services/${datas._id}`, {
          name,
          description,
          status: check,
        });
        toast.success('Service updated successfully');
      } else {
        await axios.post('http://localhost:5000/api/services', {
          name,
          description,
          status: check,
        });
        toast.success('Service created successfully');
      }
      closeModal();
    } catch (error) {
      toast.error('Error saving service');
    }
  };

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      title={datas?.name ? 'Edit Service' : 'New Service'}
      width={'max-w-3xl'}
    >
      <div className="flex-colo gap-6">
        <Input
          label="Service Name"
          color={true}
          placeholder="Enter service name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Textarea
          label="Description"
          placeholder="Write description here..."
          color={true}
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex items-center gap-2 w-full">
          <Switchi
            label="Status"
            checked={check}
            onChange={() => setCheck(!check)}
          />
          <p className={`text-sm ${check ? 'text-subMain' : 'text-textGray'}`}>
            {check ? 'Enabled' : 'Disabled'}
          </p>
        </div>
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
            onClick={handleSave}
          />
        </div>
      </div>
    </Modal>
  );
}

export default AAddEditServiceModal;

