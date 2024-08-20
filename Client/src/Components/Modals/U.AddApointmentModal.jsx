import React, { useEffect, useState } from "react"; // Import React, useEffect, and useState hooks
import Modal from "./Modal"; // Import the Modal component
import {
  Button,
  Checkbox,
  DatePickerComp,
  Select,
  Textarea,
  TimePickerComp,
} from "../Form"; // Import various form components
import { BiChevronDown } from "react-icons/bi"; // Import icon for dropdown arrow
import { HiOutlineCheckCircle } from "react-icons/hi"; // Import icon for check circle
import { toast } from "react-hot-toast"; // Import toast for notifications
import { useDoctors } from "../../hooks/useDoctors"; // Custom hook for fetching doctors
import { useServices } from "../../hooks/useServices"; // Custom hook for fetching services
import { useMyChildren } from "../../hooks/useMyChildren"; // Custom hook for fetching children
import useGlobalStore from "../../globalStore"; // Global state store
import axios from "axios"; // Import axios for making HTTP requests

// Define UAddAppointmentModal component
function UAddAppointmentModal({ closeModal, isOpen, datas }) {
  // State variables
  const [services, setServices] = useState(null); // State for selected service
  const [startDate, setStartDate] = useState(new Date()); // State for appointment start date
  const [startTime, setStartTime] = useState(new Date()); // State for appointment start time
  const [endTime, setEndTime] = useState(new Date()); // State for appointment end time (not used in the current code)
  const [child, setChild] = useState(null); // State for selected child
  const [doctors, setDoctors] = useState(null); // State for selected doctor
  const [shares, setShares] = useState({ email: false }); // State for sharing options
  const [description, setDescription] = useState(""); // State for description

  // Handle change in share options
  const onChangeShare = (e) => {
    setShares({ ...shares, [e.target.name]: e.target.checked });
  };

  // Set data when `datas` prop changes
  useEffect(() => {
    if (datas?.title) {
      setServices(datas?.service); // Set selected service
      setStartTime(datas?.start); // Set start time
      setEndTime(datas?.end); // Set end time
      setShares(datas?.shareData); // Set share options
    }
  }, [datas]);

  // Fetch data using custom hooks
  const { data: doctorsList } = useDoctors(); // List of doctors
  const { data: servicesList } = useServices(); // List of services
  const { data: myChildren } = useMyChildren(); // List of children
  const { user } = useGlobalStore(); // Current user

  // Function to create an appointment
  async function createAppointment() {
    const data = {
      child: child.id, // Child ID
      purposeOfVisit: services._id, // Service ID
      dateOfVisit: startDate, // Start date
      bookedBy: user._id, // User ID
      startTime, // Start time
      doctor: doctors.id, // Doctor ID
      description, // Description
    };
    const res = await axios.post(
      "http://localhost:5000/api/appointments", // API endpoint
      data
    );
    if (res.status === 201) {
      toast.success("Appointment created successfully"); // Success message
    } else {
      toast.error("Appointment creation failed"); // Error message
    }
  }

  return (
    <Modal
      closeModal={closeModal} // Function to close the modal
      isOpen={isOpen} // Boolean to control modal visibility
      title={datas?.title ? "Edit Appointment" : "New Appointment"} // Modal title
      width={"max-w-3xl"} // Modal width
    >
      <div className="gap-6 flex-colo">
        {/* Child selection */}
        <div className="grid w-full gap-4 sm:grid-cols-2">
          <div className="flex flex-col w-full gap-3">
            <p className="text-sm text-black">Select Your Child</p>
            {myChildren && (
              <Select
                selectedPerson={child}
                setSelectedPerson={setChild}
                datas={myChildren.map((c) => ({ id: c._id, name: c.fullName }))}
              >
                <div className="w-full p-4 text-sm font-light border rounded-lg flex-btn text-textGray border-border focus:border focus:border-subMain">
                  Select Child <BiChevronDown className="text-xl" />
                </div>
              </Select>
            )}
          </div>
        </div>

        {/* Service selection */}
        <div className="grid w-full gap-4 sm:grid-cols-2">
          <div className="flex flex-col w-full gap-3">
            <p className="text-sm text-black">Purpose of visit</p>
            {servicesList && (
              <Select
                selectedPerson={services}
                setSelectedPerson={setServices}
                datas={servicesList}
              >
                <div className="w-full p-4 text-sm font-light border rounded-lg flex-btn text-textGray border-border focus:border focus:border-subMain">
                  Select Service <BiChevronDown className="text-xl" />
                </div>
              </Select>
            )}
          </div>
        </div>

        {/* Date and time pickers */}
        <div className="grid w-full gap-4 sm:grid-cols-2">
          <DatePickerComp
            label="Date of visit"
            startDate={startDate}
            onChange={(date) => setStartDate(date)}
          />
          <TimePickerComp
            label="Start time"
            startDate={startTime}
            onChange={(date) => setStartTime(date)}
          />
        </div>

        {/* Doctor selection */}
        <div className="grid w-full gap-4 sm:grid-cols-2">
          <div className="flex flex-col w-full gap-3">
            <p className="text-sm text-black">Doctor</p>
            {doctorsList && (
              <Select
                selectedPerson={doctors}
                setSelectedPerson={setDoctors}
                datas={doctorsList.map((d) => ({
                  id: d._id,
                  name: d.fullName,
                }))}
              >
                <div className="w-full p-4 text-sm font-light border rounded-lg flex-btn text-textGray border-border focus:border focus:border-subMain">
                  Select Doctor <BiChevronDown className="text-xl" />
                </div>
              </Select>
            )}
          </div>
        </div>

        {/* Description textarea */}
        <Textarea
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          color={true}
          rows={5}
        />

        {/* Share options */}
        <div className="flex flex-col w-full gap-8">
          <p className="text-sm text-black">Share with patient via</p>
          <div className="flex flex-wrap gap-4 sm:flex-nowrap">
            <Checkbox
              name="email"
              checked={shares.email}
              onChange={onChangeShare}
              label="Email"
            />
          </div>
        </div>

        {/* Action buttons */}
        <div className="grid w-full gap-4 sm:grid-cols-2">
          <button
            onClick={closeModal}
            className="p-4 text-sm font-light text-red-600 bg-red-600 rounded-lg bg-opacity-5"
          >
            {datas?.title ? "Discard" : "Cancel"}
          </button>
          <Button
            label="Save"
            Icon={HiOutlineCheckCircle}
            onClick={createAppointment}
          />
        </div>
      </div>
    </Modal>
  );
}

export default UAddAppointmentModal;
