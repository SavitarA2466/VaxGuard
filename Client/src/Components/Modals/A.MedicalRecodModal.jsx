import React from 'react';
import Modal from './Modal';
import { Button } from '../Form';
import { FiEye } from 'react-icons/fi';
import { AVaccineDosageTable } from '../Tables';
import { medicineData } from '../Datas';
import { useNavigate } from 'react-router-dom';

function AMedicalRecodModal({ closeModal, isOpen, datas }) {
  const navigate = useNavigate();
  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      title="12 May 2021"
      width={'max-w-4xl'}
    >
      <div className="flex-colo gap-6">
        {datas?.data?.slice(0, 3).map((data) => (
          <div key={data.id} className="grid grid-cols-12 gap-4 w-full">
            <div className="col-span-12 md:col-span-3">
              <p className="text-sm font-medium">{data.title}:</p>
            </div>
            <div className="col-span-12 md:col-span-9 border-[1px] border-border rounded-xl p-6">
              <p className="text-xs text-main font-light leading-5">
                {data.value}
              </p>
            </div>
          </div>
        ))}
        {/* medicine */}
        <div className="grid grid-cols-12 gap-4 w-full">
          <div className="col-span-12 md:col-span-3">
            <p className="text-sm font-medium">Vaccine</p>
          </div>
          <div className="col-span-12 md:col-span-9 border-[1px] border-border rounded-xl overflow-hidden p-4">
            <AVaccineDosageTable
              data={medicineData?.slice(0, 3)}
              functions={{}}
              button={false}
            />
          </div>
        </div>
        {/* attachments */}
        <div className="grid grid-cols-12 gap-4 w-full">
          <div className="col-span-12 md:col-span-3">
            <p className="text-sm font-medium">Attachments:</p>
          </div>
          <div className="col-span-12 md:col-span-9 border-[1px] border-border rounded-xl p-6 xs:grid-cols-2 md:grid-cols-4 grid gap-4">
            {
              // show attachments
              datas?.attachments?.map((item) => (
                <img
                  key={item}
                  src={item}
                  alt="attachment"
                  className="w-full md:h-32 object-cover rounded-md"
                />
              ))
            }
          </div>
        </div>


      </div>
    </Modal>
  );
}

export default AMedicalRecodModal;
