import React from "react";
import { FiEdit, FiEye } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import Modal from "../Modals/A.AddEditServiceModal";
import { useQueryClient } from "@tanstack/react-query";
import { useServices } from "../../hooks/useServices";

const thclass = "text-start text-sm font-medium py-3 px-2 whitespace-nowrap";
const tdclass = "text-start text-sm py-4 px-2 whitespace-nowrap";

export function AServiceTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [editServiceId, setEditServiceId] = useState(null);

  const { data } = useServices();

  const qc = useQueryClient();

  const handleEdit = (item) => {
    setSelectedService(item);
    setEditServiceId(item._id);
    setIsModalOpen(true);
  };

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`http://localhost:5000/api/services/${itemId}`);
      qc.invalidateQueries({ queryKey: ["all_services"] });
      toast.success("Service deleted successfully");
    } catch (error) {
      console.error("Error deleting service:", error);
      toast.error("Error deleting service");
    }
  };

  return (
    <div>
      {data && (
        <table className="w-full table-auto">
          <thead className="overflow-hidden rounded-md bg-dry">
            <tr>
              <th className={thclass}>Name</th>
              <th className={thclass}>Created At</th>
              <th className={thclass}>Status</th>
              <th className={thclass}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                key={item._id}
                className="transition border-b border-border hover:bg-greyed"
              >
                <td className={tdclass}>
                  <h4 className="text-sm font-medium">{item.name}</h4>
                </td>
                <td className={tdclass}>
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
                <td className={tdclass}>
                  <span
                    className={`text-xs font-medium ${
                      !item?.status ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {!item?.status ? "Disabled" : "Enabled"}
                  </span>
                </td>
                <td className={tdclass}>
                  <button
                    onClick={() => handleEdit(item)}
                    className="mr-2 text-blue-500"
                  >
                    <FiEdit className="inline ml-1" />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-500"
                  >
                    <RiDeleteBin6Line className="inline ml-1" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {isModalOpen && (
        <Modal
          closeModal={() => setIsModalOpen(false)}
          isOpen={isModalOpen}
          datas={selectedService}
          isEdit={true}
          itemId={editServiceId}
        />
      )}
    </div>
  );
}
