// Importing necessary modules and components from external libraries and internal files
import React from "react";
import { FiEdit, FiEye } from "react-icons/fi"; // Importing edit and eye icons from 'react-icons'
import { RiDeleteBin6Line } from "react-icons/ri"; // Importing delete bin icon from 'react-icons'
import { toast } from "react-hot-toast"; // Importing toast notifications from 'react-hot-toast'
import axios from "axios"; // Importing axios for making HTTP requests
import { useState } from "react"; // Importing useState hook from React
import Modal from "../Modals/A.AddEditServiceModal"; // Importing a modal component from a relative path
import { useQueryClient } from "@tanstack/react-query"; // Importing useQueryClient hook from '@tanstack/react-query'
import { useServices } from "../../hooks/useServices"; // Importing a custom hook for fetching services data

// Defining CSS classes for table headers and cells
const thclass = "text-start text-sm font-medium py-3 px-2 whitespace-nowrap";
const tdclass = "text-start text-sm py-4 px-2 whitespace-nowrap";

// Defining the AServiceTable functional component
export function AServiceTable() {
  // Defining state variables using useState hook
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [editServiceId, setEditServiceId] = useState(null);

  // Fetching data using the custom useServices hook
  const { data } = useServices();

  // Getting the query client instance for invalidating queries
  const qc = useQueryClient();

  // Function to handle editing a service
  const handleEdit = (item) => {
    setSelectedService(item);
    setEditServiceId(item._id);
    setIsModalOpen(true);
  };

  // Function to handle deleting a service
  const handleDelete = async (itemId) => {
    try {
      // Sending a delete request to the server
      await axios.delete(`http://localhost:5000/api/services/${itemId}`);
      // Invalidating the 'all_services' query to refetch data
      qc.invalidateQueries({ queryKey: ["all_services"] });
      toast.success("Service deleted successfully");
    } catch (error) {
      console.error("Error deleting service:", error);
      toast.error("Error deleting service");
    }
  };

  return (
    <div>
      {/* Rendering the table only if data is available */}
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
            {/* Mapping through the data to render each service's information */}
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
                  {/* Button to edit the service */}
                  <button
                    onClick={() => handleEdit(item)}
                    className="mr-2 text-blue-500"
                  >
                    <FiEdit className="inline ml-1" />
                  </button>
                  {/* Button to delete the service */}
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
      {/* Rendering the modal if isModalOpen is true */}
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
