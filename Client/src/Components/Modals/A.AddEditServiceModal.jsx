import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "./Modal";
import { Button, Input, Switchi, Textarea } from "../Form";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

function AAddEditServiceModal({ closeModal, isOpen, datas }) {
  const [check, setCheck] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (datas) {
      setName(datas.name || "");
      setDescription(datas.description || "");
      setCheck(datas.status || false);
    }
  }, [datas]);

  const qc = useQueryClient();

  const handleSave = async () => {
    try {
      if (datas?._id) {
        await axios.put(`http://localhost:5000/api/services/${datas._id}`, {
          name,
          description,
          status: check,
        });
        qc.invalidateQueries({ queryKey: ["all_services"] });
        toast.success("Service updated successfully");
      } else {
        await axios.post("http://localhost:5000/api/services", {
          name,
          description,
          status: check,
        });
        qc.invalidateQueries({ queryKey: ["all_services"] });
        toast.success("Service created successfully");
      }
      closeModal();
    } catch (error) {
      toast.error("Error saving service");
    }
  };

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      title={datas?.name ? "Edit Service" : "New Service"}
      width={"max-w-3xl"}
    >
      <div className="gap-6 flex-colo">
        <Input
          label="Service Name"
          color={true}
          placeholder="Enter service name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Textarea
          label="Description"
          placeholder="Write description here..."
          color={true}
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex items-center w-full gap-2">
          <Switchi
            label="Status"
            checked={check}
            onChange={() => setCheck(!check)}
          />
          <p className={`text-sm ${check ? "text-subMain" : "text-textGray"}`}>
            {check ? "Enabled" : "Disabled"}
          </p>
        </div>
        <div className="grid w-full gap-4 sm:grid-cols-2">
          <button
            onClick={closeModal}
            className="p-4 text-sm font-light text-red-600 bg-red-600 rounded-lg bg-opacity-5"
          >
            {datas?.name ? "Discard" : "Cancel"}
          </button>
          <Button
            label="Save"
            Icon={HiOutlineCheckCircle}
            onClick={handleSave}
          />
        </div>
      </div>
    </Modal>
  );
}

export default AAddEditServiceModal;
