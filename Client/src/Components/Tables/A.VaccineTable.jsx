// Importing necessary modules and components from external libraries and internal files
import React from "react";
import { FiEdit } from "react-icons/fi"; // Importing edit icon from 'react-icons'
import { RiDeleteBin6Line } from "react-icons/ri"; // Importing delete bin icon from 'react-icons'
import { toast } from "react-hot-toast"; // Importing toast notifications from 'react-hot-toast'
import axios from "axios"; // Importing axios for making HTTP requests
import { useState } from "react"; // Importing useState hook from React
import Modal from "../../Components/Modals/A.AddEditVaccine"; // Importing a modal component from a relative path
import { useQueryClient } from "@tanstack/react-query"; // Importing useQueryClient hook from '@tanstack/react-query'
import { useVaccines } from "../../hooks/useVaccines"; // Importing a custom hook for fetching vaccines data

// Defining CSS classes for table headers and cells
const thclass = "text-start text-sm font-medium py-3 px-2 whitespace-nowrap";
const tdclass = "text-start text-sm py-4 px-2 whitespace-nowrap";

// Defining the AVaccineTable functional component
export function AVaccineTable() {
  // Defining state variables using useState hook
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVaccine, setSelectedVaccine] = useState(null);
  const [editItemId, setEditItemId] = useState(null);

  // Fetching data using the custom useVaccines hook
  const { data } = useVaccines();

  // Getting the query client instance for invalidating queries
  const qc = useQueryClient();

  // Function to handle editing a vaccine
  const handleEdit = (item) => {
    setSelectedVaccine(item);
    setEditItemId(item._id);
    setIsModalOpen(true);
  };

  // Function to handle deleting a vaccine
  const handleDelete = async (itemId) => {
    try {
      // Sending a delete request to the server
      await axios.delete(`http://localhost:5000/api/vaccines/${itemId}`);
      // Invalidating the 'vaccines' query to refetch data
      qc.invalidateQueries({ queryKey: ["vaccines"] });
      toast.success("Vaccine deleted successfully");
    } catch (error) {
      console.error("Error deleting vaccine:", error);
      toast.error("Error deleting vaccine");
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
              <th className={thclass}>InStock</th>
              <th className={thclass}>Status</th>
              <th className={thclass}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Mapping through the data to render each vaccine's information */}
            {data.map((item) => (
              <tr
                key={item._id}
                className="border-b border-border hover:bg-greyed transitions"
              >
                <td className={tdclass}>
                  <h4 className="text-sm font-medium">{item.vaccineName}</h4>
                </td>
                <td className={tdclass}>{item.instock}</td>
                <td className={tdclass}>
                  <span
                    className={`text-xs font-medium ${
                      item.instock > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {item.instock > 0 ? "Available" : "Out of stock"}
                  </span>
                </td>
                <td className={tdclass}>
                  {/* Button to edit the vaccine */}
                  <button
                    onClick={() => handleEdit(item)}
                    className="mr-2 text-blue-500"
                  >
                    <FiEdit className="inline ml-1" />
                  </button>
                  {/* Button to delete the vaccine */}
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
          datas={selectedVaccine}
          isEdit={true}
          itemId={editItemId}
        />
      )}
    </div>
  );
}
