import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import {
  Button,
  Checkbox,
  DatePickerComp,
  Input,
  Select,
  Textarea,
  TimePickerComp,
} from '../Form';
import { BiChevronDown, BiPlus } from 'react-icons/bi';
import { memberData, servicesData, sortsDatas } from '../Datas';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import { toast } from 'react-hot-toast';
import DPatientMedicineServiceModal from './D.PatientMedicineServiceModal';

// Edit member data
const doctorsData = memberData.map((item) => {
  return {
    id: item.id,
    name: item.title,
  };
});

function DAddAppointmentModal({ closeModal, isOpen, datas }) {
  const [services, setServices] = useState(servicesData[0]); // Current selected service
  const [startDate, setStartDate] = useState(new Date()); // Appointment start date
  const [startTime, setStartTime] = useState(new Date()); // Appointment start time
  const [endTime, setEndTime] = useState(new Date()); // Appointment end time
  const [status, setStatus] = useState(sortsDatas.status[0]); // Current status
  const [doctors, setDoctors] = useState(doctorsData[0]); // Current selected doctor
  const [shares, setShares] = useState({
    email: false, // Share with email
  });
  const [open, setOpen] = useState(false); // Modal state for selecting patient

  // Handle change in share options
  const onChangeShare = (e) => {
    setShares({ ...shares, [e.target.name]: e.target.checked });
  };

  // Set initial data if `datas` is provided
  useEffect(() => {
    if (datas?.title) {
      setServices(datas?.service);
      setStartTime(datas?.start);
      setEndTime(datas?.end);
      setShares(datas?.shareData);
    }
  }, [datas]);

  return (
    <Modal
      closeModal={closeModal} // Function to close the modal
      isOpen={isOpen} // Boolean to control if the modal is open
      title={datas?.title ? 'Edit Appointment' : 'New Appointment'} // Modal title
      width={'max-w-3xl'} // Width of the modal
    >
      {open && (
        <DPatientMedicineServiceModal
          closeModal={() => setOpen(!isOpen)} // Function to close the inner modal
          isOpen={open} // State to control inner modal
          patient={true} // Indicator for patient selection
        />
      )}
      <div className="flex-colo gap-6">
        {/* Patient name input */}
        <div className="grid sm:grid-cols-12 gap-4 w-full items-center">
          <div className="sm:col-span-10">
            <Input
              label="Patient Name"
              color={true}
              placeholder={
                datas?.title
                  ? datas.title
                  : 'Select Patient and patient name will appear here'
              }
            />
          </div>
        </div>

        {/* Service and date picker */}
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <div className="flex w-full flex-col gap-3">
            <p className="text-black text-sm">Purpose of visit</p>
            <Select
              selectedPerson={services}
              setSelectedPerson={setServices}
              datas={servicesData}
            >
              <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                {services.name} <BiChevronDown className="text-xl" />
              </div>
            </Select>
          </div>
          <DatePickerComp
            label="Date of visit"
            startDate={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>

        {/* Time pickers */}
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <TimePickerComp
            label="Start time"
            startDate={startTime}
            onChange={(date) => setStartTime(date)}
          />
          <TimePickerComp
            label="End time"
            startDate={endTime}
            onChange={(date) => setEndTime(date)}
          />
        </div>

        {/* Doctor and status selectors */}
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <div className="flex w-full flex-col gap-3">
            <p className="text-black text-sm">Doctor</p>
            <Select
              selectedPerson={doctors}
              setSelectedPerson={setDoctors}
              datas={doctorsData}
            >
              <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                {doctors.name} <BiChevronDown className="text-xl" />
              </div>
            </Select>
          </div>
          <div className="flex w-full flex-col gap-3">
            <p className="text-black text-sm">Status</p>
            <Select
              selectedPerson={status}
              setSelectedPerson={setStatus}
              datas={sortsDatas.status}
            >
              <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                {status.name} <BiChevronDown className="text-xl" />
              </div>
            </Select>
          </div>
        </div>

        {/* Description textarea */}
        <Textarea
          label="Description"
          placeholder={
            datas?.message
              ? datas.message
              : 'She will be coming for a checkup.....'
          }
          color={true}
          rows={5}
        />

        {/* Share options */}
        <div className="flex-col flex gap-8 w-full">
          <p className="text-black text-sm">Share with patient via</p>
          <div className="flex flex-wrap sm:flex-nowrap gap-4">
            <Checkbox
              name="email"
              checked={shares.email}
              onChange={onChangeShare}
              label="Email"
            />
          </div>
        </div>

        {/* Action buttons */}
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <button
            onClick={closeModal} // Closes the modal
            className="bg-red-600 bg-opacity-5 text-red-600 text-sm p-4 rounded-lg font-light"
          >
            {datas?.title ? 'Discard' : 'Cancel'}
          </button>
          <Button
            label="Save"
            Icon={HiOutlineCheckCircle}
            onClick={() => {
              toast.error('This feature is not available yet'); // Placeholder for save action
            }}
          />
        </div>
      </div>
    </Modal>
  );
}

export default DAddAppointmentModal;
