import React from 'react';
import Modal from './Modal';
import { Button } from '../Form';
import { FiEye } from 'react-icons/fi';
import { VaccineDosageTable } from '../Tables';
import { medicineData } from '../Datas';
import { useNavigate } from 'react-router-dom';
import { MdOutlineCloudDownload } from 'react-icons/md';
import { toast } from 'react-hot-toast';

function UMedicalRecodModal({ closeModal, isOpen, datas }) {
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
            <VaccineDosageTable
              data={medicineData?.slice(0, 3)}
              functions={{}}
              button={false}
            />
          </div>
        </div>

          {/* export */}
          <Button
            label="Export"
            Icon={MdOutlineCloudDownload}
            onClick={() => {
              toast.error('Exporting is not available yet');
            }}
          />
      </div>
    </Modal>
  );
}

export default UMedicalRecodModal;
