import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import {
  Button,
  Checkbox,
  DatePickerComp,
  Select,
  Textarea,
  TimePickerComp,
} from "../Form";
import { BiChevronDown } from "react-icons/bi";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { toast } from "react-hot-toast";
import UPatientMedicineServiceModal from "./U.PatientMedicineServiceModal";
import { useDoctors } from "../../hooks/useDoctors";
import { useServices } from "../../hooks/useServices";
import { useMyChildren } from "../../hooks/useMyChildren";
import useGlobalStore from "../../globalStore";
import axios from "axios";

function UAddAppointmentModal({ closeModal, isOpen, datas }) {
  const [services, setServices] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [child, setChild] = useState(null);
  const [doctors, setDoctors] = useState(null);
  const [shares, setShares] = useState({ email: false });
  const [description, setDescription] = useState(false);

  // on change share
  const onChangeShare = (e) => {
    setShares({ ...shares, [e.target.name]: e.target.checked });
  };

  // set data
  useEffect(() => {
    if (datas?.title) {
      setServices(datas?.service);
      setStartTime(datas?.start);
      setEndTime(datas?.end);
      setShares(datas?.shareData);
    }
  }, [datas]);

  const { data: doctorsList } = useDoctors();
  const { data: servicesList } = useServices();
  const { data: myChildren } = useMyChildren();
  const { user } = useGlobalStore();

  async function createAppointment() {
    const data = {
      child: child.id,
      purposeOfVisit: services._id,
      dateOfVisit: startDate,
      bookedBy: user._id,
      startTime,
      doctor: doctors.id,
      description,
    };
    const res = await axios.post(
      "http://localhost:5000/api/appointments",
      data
    );
    if (res.status === 201) {
      toast.success("Appointment created successfully");
    } else {
      toast.error("Appointment creation failed");
    }
  }

  console.log(child, services, doctors);

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      title={datas?.title ? "Edit Appointment" : "New Appointment"}
      width={"max-w-3xl"}
    >
      <div className="gap-6 flex-colo">
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

        {/* status && doctor */}
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

        {/* des */}
        <Textarea
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          color={true}
          rows={5}
        />

        {/* share */}
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
        {/* buttones */}
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
