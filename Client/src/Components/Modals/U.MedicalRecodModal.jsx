import React from 'react'; // Import React
import Modal from './Modal'; // Import custom Modal component
import { Button } from '../Form'; // Import Button component from Form
import { FiEye } from 'react-icons/fi'; // Import Eye icon (not used in this code)
import { VaccineDosageTable } from '../Tables'; // Import VaccineDosageTable component
import { medicineData } from '../Datas'; // Import static data for medicine
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation
import { MdOutlineCloudDownload } from 'react-icons/md'; // Import Cloud Download icon
import { toast } from 'react-hot-toast'; // Import toast for notifications

// Define UMedicalRecordModal component
function UMedicalRecodModal({ closeModal, isOpen, datas }) {
  const navigate = useNavigate(); // Initialize navigate hook

  return (
    <Modal
      closeModal={closeModal} // Function to close the modal
      isOpen={isOpen} // Modal open/close state
      title="12 May 2021" // Modal title
      width={'max-w-4xl'} // Modal width
    >
      <div className="flex-colo gap-6">
        {/* Render a list of data items */}
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

        {/* Medicine section */}
        <div className="grid grid-cols-12 gap-4 w-full">
          <div className="col-span-12 md:col-span-3">
            <p className="text-sm font-medium">Vaccine</p>
          </div>
          <div className="col-span-12 md:col-span-9 border-[1px] border-border rounded-xl overflow-hidden p-4">
            <VaccineDosageTable
              data={medicineData?.slice(0, 3)} // Pass data to VaccineDosageTable
              functions={{}} // Placeholder for functions (not used)
              button={false} // No button in the table
            />
          </div>
        </div>

        {/* Export button */}
        <Button
          label="Export" // Button label
          Icon={MdOutlineCloudDownload} // Button icon
          onClick={() => {
            toast.error('Exporting is not available yet'); // Show error toast
          }}
        />
      </div>
    </Modal>
  );
}

export default UMedicalRecodModal;
