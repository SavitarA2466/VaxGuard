import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import { Button, Input, Select, Textarea } from '../Form';
import { BiChevronDown } from 'react-icons/bi';
import { sortsDatas } from '../Datas';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import { toast } from 'react-hot-toast';

function AAddEditVaccineModal({ closeModal, isOpen, datas }) {
  const [medicine, setMedicine] = useState(sortsDatas.medicine[0]);

  useEffect(() => {
    if (datas?.name) {
      setMedicine({
        id: datas.medicine,
        name: datas.medicine,
      });
    }
  }, [datas]);

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      title={datas?.name ? 'Edit Medicine' : 'New Medicine'}
      width={'max-w-3xl'}
    >
      <div className="flex-colo gap-6">
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <div className="flex w-full flex-col gap-3">
            <p className="text-black text-sm">Medicine Name</p>
            <Select
              selectedPerson={medicine}
              setSelectedPerson={setMedicine}
              datas={sortsDatas.medicine}
            >
              <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                {medicine?.name} <BiChevronDown className="text-xl" />
              </div>
            </Select>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 w-full">
        <Input
            label="Batch Number"
            type="text"
            color={true}
            placeholder={datas?.stock ? datas.stock : 0}
          />
          <Input
            label="Instock"
            type="number"
            color={true}
            placeholder={datas?.stock ? datas.stock : 0}
          />
        </div>

        {/* des */}
        <Textarea
          label="Description"
          placeholder="Write description here..."
          color={true}
          rows={5}
        />
        {/* buttones */}
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
            onClick={() => {
              toast.error('This feature is not available yet');
            }}
          />
        </div>
      </div>
    </Modal>
  );
}

export default AAddEditVaccineModal;
