import React, { useState } from 'react';
import Modal from './D.Modal';
import { BiChevronDown, BiPlus } from 'react-icons/bi';
import DPatientMedicineServiceModal from './D.PatientMedicineServiceModal';
import { Button, Checkbox, Input, Select } from './Form';
import { sortsDatas } from '../Datas';

function DMedicineDosageModal({ closeModal, isOpen }) {
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
  // on change dosage
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

  return (
    <>
      {open && (
        <DPatientMedicineServiceModal
          closeModal={() => setOpen(!open)}
          isOpen={open}
          patient={false}
        />
      )}
      <Modal
        closeModal={closeModal}
        isOpen={isOpen}
        title="Add Item"
        width={'max-w-xl'}
      >
        <div className="flex-colo gap-6">
          {/* title */}
          <div className="flex flex-col gap-4 w-full">
            <p className="text-black text-sm">Choose Vaccine</p>
            <button
              onClick={() => setOpen(!open)}
              className=" text-subMain flex-rows gap-2 rounded-lg border border-subMain border-dashed py-4 w-full text-sm"
            >
              <BiPlus /> Add Item
            </button>
          </div>
          {/* quantity */}
          <Input label="Batch Number" color={true} type={'text'} />
          {/* dosage */}
          <Input label="Dosage Quantity" color={true} type={'text'} />
          {/* button */}
          <Button onClick={closeModal} label="Add" Icon={BiPlus} />
        </div>
      </Modal>
    </>
  );
}

export default DMedicineDosageModal;

