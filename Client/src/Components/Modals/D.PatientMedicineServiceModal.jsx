import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { BiSearch, BiPlus } from 'react-icons/bi';
import { RadioGroup } from '@headlessui/react';
import { Button } from '../Form';
import axios from 'axios';

function DPatientMedicineServiceModal({ closeModal, isOpen, patient }) {
  const [selected, setSelected] = useState(""); // State to hold the selected item
  const [vaccine, setVaccine] = useState([]);

  useEffect(() => {
    const fetchVaccine = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/vaccines'); // Assuming your backend endpoint is /vaccines
        setVaccine(response.data);
      } catch (error) {
        console.error('Error fetching Vaccine:', error);
      }
    };
    fetchVaccine();
  }, []);

  // Function to handle selection of an item
  const handleSelectItem = (item) => {
    setSelected(item); // Update selected item
  };
  console.log(selected);

  // Function to add selected item
  const handleAddItem = () => {
    // Pass selected item to another component
    // Assuming you have a prop named "addItem" to pass the selected item
    closeModal(selected);
  };

  const vaccineData = vaccine.map((item) => ({
    id: item._id,
    name: item.vaccineName,
   
  }));

  return (
    <Modal
      closeModal={closeModal}
      isOpen
      width={'max-w-xl'}
    >
      <div className="flex-colo gap-6">
        {/* search */}
        <div className="flex items-center gap-4 w-full border border-border rounded-lg p-3">
          <input type="text" placeholder="Search" className="w-full" />
          <BiSearch className=" text-xl" />
        </div>
        {/* data */}
        <div className="w-full h-[500px] overflow-y-scroll">
          <RadioGroup value={selected} onChange={handleSelectItem}>
            <div className="space-y-2">
              {vaccineData.map((item) => (
                <RadioGroup.Option
                  key={item.id}
                  value={item}
                  className={({ active, checked }) =>
                    `
                    ${active ? 'border-subMain bg-subMain text-white' : ''}
                    rounded-xl border-[1px] border-border p-4 group hover:bg-subMain hover:text-white`
                  }
                >
                  {({ active, checked }) => (
                    <>
                      <h6 className="text-sm">{item.name}</h6>
                      {/* Add other details you want to display */}
                      {/* Example: <p>{item.description}</p> */}
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </div>
        {/* button */}
        {/* Pass selected item to another component */}
        <Button onClick={handleAddItem} label="Add" Icon={BiPlus} />
      </div>
    </Modal>
  );
}

export default DPatientMedicineServiceModal;
