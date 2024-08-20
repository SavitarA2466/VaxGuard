import React from 'react';
import Modal from './Modal';
import { Button } from '../Form';
import { FiEye } from 'react-icons/fi';
import { VaccineDosageTable } from '../Tables/VaccineDosageTable';
import { medicineData } from '../Datas';
import { useNavigate } from 'react-router-dom';

// Functional component AMedicalRecodModal
function AMedicalRecodModal({ closeModal, isOpen, datas }) {
  // Hook for programmatic navigation
  const navigate = useNavigate();

  return (
    <Modal
      closeModal={closeModal} // Function to close the modal
      isOpen={isOpen} // Boolean to control if the modal is open
      title="16 Jun 2024" // Title of the modal
      width={'max-w-4xl'} // Width of the modal
    >
      <div className="flex-colo gap-6">
        {/* Map over data array and display each entry */}
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
        {/* Vaccine section */}
        <div className="grid grid-cols-12 gap-4 w-full">
          <div className="col-span-12 md:col-span-3">
            <p className="text-sm font-medium">Vaccine</p>
          </div>
          <div className="col-span-12 md:col-span-9 border-[1px] border-border rounded-xl overflow-hidden p-4">
            <VaccineDosageTable
              data={medicineData?.slice(0, 3)} // Data for the table
              functions={{}} // Empty functions object (could be used for callbacks)
              button={false} // Disable the button in the table
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default AMedicalRecodModal;

