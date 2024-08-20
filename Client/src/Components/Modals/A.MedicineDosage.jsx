import React, { useState } from 'react';
import Modal from './Modal';
import { BiChevronDown, BiPlus } from 'react-icons/bi';
import APatientMedicineServiceModal from './A.PatientMedicineServiceModal';
import { Button, Checkbox, Input, Select } from './Form';
import { sortsDatas } from '../Datas';

// Functional component AMedicineDosageModal
function AMedicineDosageModal({ closeModal, isOpen }) {
  // Local state to manage modal visibility and selected options
  const [open, setOpen] = useState(false);
  const [instraction, setInstraction] = useState(sortsDatas.instractions[0]);
  const [dosage, setDosage] = useState(
    sortsDatas.dosage.map((item) => {
      return {
        name: item.value,
        checked: false,
      };
    })
  );

  // Handle changes to the dosage checkboxes
  const onChangeDosage = (e) => {
    const { name, checked } = e.target;
    const newDosage = dosage.map((item) => {
      if (item.name === name) {
        return {
          ...item,
          checked: checked,
        };
      }
      return item;
    });
    setDosage(newDosage);
  };

  // Static summary data
  const summery = [
    {
      title: 'Service Name',
      value: 'Paracetamol',
      color: false,
    },
    {
      title: 'Quantity',
      value: 6,
      color: false,
    },
  ];

  return (
    <>
      {open && (
        <APatientMedicineServiceModal
          closeModal={() => setOpen(!open)}
          isOpen={open}
          patient={false}
        />
      )}
      <Modal
        closeModal={closeModal} // Function to close the modal
        isOpen={isOpen} // Boolean to control if the modal is open
        title="Add Item" // Title of the modal
        width={'max-w-xl'} // Width of the modal
      >
        <div className="flex-colo gap-6">
          {/* Title section */}
          <div className="flex flex-col gap-4 w-full">
            <p className="text-black text-sm">Choose Medicine</p>
            <button
              onClick={() => setOpen(!open)} // Toggle the visibility of APatientMedicineServiceModal
              className=" text-subMain flex-rows gap-2 rounded-lg border border-subMain border-dashed py-4 w-full text-sm"
            >
              <BiPlus /> Add Item
            </button>
          </div>
          {/* Instruction dropdown */}
          <div className="flex w-full flex-col gap-3">
            <p className="text-black text-sm">Instruction</p>
            <Select
              selectedPerson={instraction} // Currently selected instruction
              setSelectedPerson={setInstraction} // Function to update the selected instruction
              datas={sortsDatas.instractions} // List of instructions
            >
              <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                {instraction.name} <BiChevronDown className="text-xl" />
              </div>
            </Select>
          </div>
          {/* Quantity input */}
          <Input label="Quantity" color={true} type={'number'} />
          {/* Dosage input */}
          <Input label="Dosage Quantity" color={true} type={'number'} />
          {/* Dosage checkboxes */}
          <div className="flex w-full flex-col gap-4">
            <p className="text-black text-sm">Dosage</p>
            <div className="grid xs:grid-cols-3 gap-6 pb-6">
              {sortsDatas?.dosage?.map((item) => (
                <Checkbox
                  label={item.name} // Label for the checkbox
                  checked={dosage?.find((i) => i.name === item.value)?.checked} // Checked status
                  onChange={onChangeDosage} // Handler for checkbox changes
                  name={item.value} // Name of the checkbox
                  key={item.id} // Unique key for each checkbox
                />
              ))}
            </div>
          </div>

          {/* Summary section */}
          <div className="flex flex-col gap-4 w-full">
            <p className="text-black text-sm">Summary</p>
            <div className="flex flex-col gap-4">
              {summery.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-row justify-between items-center"
                >
                  <p className="text-xs text-textGray">{item.title}</p>
                  <p
                    className={
                      item.color
                        ? 'text-xs text-subMain bg-subMain bg-opacity-10 font-semibold py-1 px-4 rounded-full'
                        : 'text-sm font-medium text-textGray'
                    }
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Save button */}
          <Button onClick={closeModal} label="Add" Icon={BiPlus} />
        </div>
      </Modal>
    </>
  );
}

export default AMedicineDosageModal;
