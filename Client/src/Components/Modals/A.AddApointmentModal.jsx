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
import { useChildren } from "../../hooks/useChildren";
import { useDoctors } from "../../hooks/useDoctors";
import { useServices } from "../../hooks/useServices";
import axios from "axios";
import useGlobalStore from "../../globalStore";
import { useQueryClient } from "@tanstack/react-query";

const statuses = [
  {
    id: 2,
    name: "Pending",
  },
  {
    id: 3,
    name: "Approved",
  },
  {
    id: 4,
    name: "Cancelled",
  },
];

function AAddAppointmentModal({ closeModal, isOpen, datas }) {
  const [child, setChild] = useState(null);
  const [services, setServices] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [status, setStatus] = useState(null);
  const [doctors, setDoctors] = useState(null);
  const [shares, setShares] = useState({
    email: false,
  });
  const [description, setDescription] = useState(false);

  // on change share
  const onChangeShare = (e) => {
    setShares({ ...shares, [e.target.name]: e.target.checked });
  };

  const { data: children } = useChildren();
  const { data: serviceList } = useServices();
  const { data: doctorsList } = useDoctors();
  const { user } = useGlobalStore();

  const qc = useQueryClient();

  // set data
  useEffect(() => {
    if (datas?.title) {
      setServices(datas?.service);
      setStartTime(datas?.start);
      setEndTime(datas?.end);
      setShares(datas?.shareData);
    }
  }, [datas]);

  async function createAppointment() {
    const data = {
      child: child.id,
      purposeOfVisit: services.id,
      dateOfVisit: startDate,
      bookedBy: user._id,
      startTime,
      endTime,
      doctor: doctors.id,
      description,
    };
    const res = await axios.post(
      "http://localhost:5000/api/appointments",
      data
    );
    if (res.status === 201) {
      qc.invalidateQueries({ queryKey: ["all_appointments"] });
      toast.success("Appointment created successfully");
      closeModal();
    } else {
      toast.error("Appointment creation failed");
    }
  }

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
            <p className="text-sm text-black">Select Child</p>
            {children && (
              <Select
                selectedPerson={child}
                setSelectedPerson={setChild}
                datas={children.map((c) => ({ id: c._id, name: c.fullName }))}
              >
                <div className="w-full p-4 text-sm font-light border rounded-lg flex-btn text-textGray border-border focus:border focus:border-subMain">
                  Select Child <BiChevronDown className="text-xl" />
                </div>
              </Select>
            )}
          </div>
          {/* date */}
          <DatePickerComp
            label="Date of visit"
            startDate={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>
        <div className="grid w-full gap-4 sm:grid-cols-2">
          <div className="flex flex-col w-full gap-3">
            <p className="text-sm text-black">Purpose of visit</p>
            {serviceList && (
              <Select
                selectedPerson={services}
                setSelectedPerson={setServices}
                datas={serviceList.map((s) => ({ id: s._id, name: s.name }))}
              >
                <div className="w-full p-4 text-sm font-light border rounded-lg flex-btn text-textGray border-border focus:border focus:border-subMain">
                  Select Service <BiChevronDown className="text-xl" />
                </div>
              </Select>
            )}
          </div>
          {/* date */}
          <DatePickerComp
            label="Date of visit"
            startDate={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>

        <div className="grid w-full gap-4 sm:grid-cols-2">
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

        {/* status & doctor */}
        <div className="grid w-full gap-4 sm:grid-cols-2">
          <div className="flex flex-col w-full gap-3">
            <p className="text-sm text-black">Status</p>
            <Select
              selectedPerson={status}
              setSelectedPerson={setStatus}
              datas={statuses}
            >
              <div className="w-full p-4 text-sm font-light border rounded-lg flex-btn text-textGray border-border focus:border focus:border-subMain">
                Appointment Status <BiChevronDown className="text-xl" />
              </div>
            </Select>
          </div>
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

export default AAddAppointmentModal;
