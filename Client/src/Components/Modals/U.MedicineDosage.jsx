import React, { useState } from 'react'; // Import React and useState hook
import UModal from './U.Modal'; // Import custom UModal component
import { BiChevronDown, BiPlus } from 'react-icons/bi'; // Import icons for dropdown and add
import UPatientMedicineServiceModal from './U.PatientMedicineServiceModal'; // Import patient medicine service modal
import { Button, Checkbox, Input, Select } from '../U.Form'; // Import UI components from U.Form
import { sortsDatas } from '../Datas'; // Import static data for instructions and dosage

function UMedicineDosageModal({ closeModal, isOpen }) {
  const [open, setOpen] = useState(false); // State to control visibility of UPatientMedicineServiceModal
  const [instraction, setInstraction] = useState(sortsDatas.instractions[0]); // State for selected instruction
  const [dosage, setDosage] = useState(
    sortsDatas.dosage.map((item) => { // Initialize dosage state with static data
      return {
        name: item.value,
        checked: false,
      };
    })
  );

  // Function to handle changes in dosage checkboxes
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
        <UPatientMedicineServiceModal
          closeModal={() => setOpen(!open)} // Toggle the modal visibility
          isOpen={open}
          patient={false}
        />
      )}
      <UModal
        closeModal={closeModal} // Function to close the main modal
        isOpen={isOpen} // Modal open/close state
        title="Add Item" // Modal title
        width={'max-w-xl'} // Modal width
      >
        <div className="flex-colo gap-6">
          {/* Medicine selection */}
          <div className="flex flex-col gap-4 w-full">
            <p className="text-black text-sm">Choose Medicine</p>
            <button
              onClick={() => setOpen(!open)} // Toggle UPatientMedicineServiceModal visibility
              className=" text-subMain flex-rows gap-2 rounded-lg border border-subMain border-dashed py-4 w-full text-sm"
            >
              <BiPlus /> Add Item
            </button>
          </div>

          {/* Instruction selection */}
          <div className="flex w-full flex-col gap-3">
            <p className="text-black text-sm">Instruction</p>
            <Select
              selectedPerson={instraction}
              setSelectedPerson={setInstraction}
              datas={sortsDatas.instractions}
            >
              <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                {instraction.name} <BiChevronDown className="text-xl" />
              </div>
            </Select>
          </div>

          {/* Quantity and dosage inputs */}
          <Input label="Quantity" color={true} type={'number'} />
          <Input label="Dosage Quantity" color={true} type={'number'} />

          {/* Dosage checkboxes */}
          <div className="flex w-full flex-col gap-4">
            <p className="text-black text-sm">Dosage</p>
            <div className="grid xs:grid-cols-3 gap-6 pb-6">
              {sortsDatas?.dosage?.map((item) => (
                <Checkbox
                  label={item.name}
                  checked={dosage?.find((i) => i.name === item.value)?.checked}
                  onChange={onChangeDosage}
                  name={item.value}
                  key={item.id}
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

          {/* Add button */}
          <Button onClick={closeModal} label="Add" Icon={BiPlus} />
        </div>
      </UModal>
    </>
  );
}

export default UMedicineDosageModal;
