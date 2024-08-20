// Importing necessary modules and components from external libraries and internal files
import React from "react";
import { FiEye } from "react-icons/fi"; // Importing the eye icon from 'react-icons'
import { RiDeleteBin6Line } from "react-icons/ri"; // Importing the delete bin icon from 'react-icons'
import { toast } from "react-hot-toast"; // Importing toast notifications from 'react-hot-toast'
import axios from "axios"; // Importing axios for making HTTP requests
import { useState } from "react"; // Importing useState hook from React
import Modal from "../../Components/Modals/A.AddDoctorModal"; // Importing a modal component from a relative path
import { Link } from "react-router-dom"; // Importing Link component from 'react-router-dom' for navigation
import { useQueryClient } from "@tanstack/react-query"; // Importing useQueryClient hook from '@tanstack/react-query'
import { useDoctors } from "../../hooks/useDoctors"; // Importing a custom hook for fetching doctors data

// Defining CSS classes for table headers and cells
const thclass = "text-start text-sm font-medium py-3 px-2 whitespace-nowrap";
const tdclass = "text-start text-sm py-4 px-2 whitespace-nowrap";

// Defining the ADoctorsTable functional component
export function ADoctorsTable() {
  // Defining state variables using useState hook
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [editDoctorId, setEditDoctorId] = useState(null);

  // Fetching data using the custom useDoctors hook
  const { data } = useDoctors();

  // Getting the query client instance for invalidating queries
  const qc = useQueryClient();

  // Function to handle viewing a doctor's details in a modal
  const handleView = (item) => {
    setSelectedDoctor(item);
    setEditDoctorId(item._id);
    setIsModalOpen(true);
  };

  // Function to handle deleting a doctor
  const handleDelete = async (itemId) => {
    try {
      // Sending a delete request to the server
      await axios.delete(`http://localhost:5000/api/doctors/${itemId}`);
      // Invalidating the 'all_doctors' query to refetch data
      qc.invalidateQueries({ queryKey: ["all_doctors"] });
      toast.success("Doctor deleted successfully");
    } catch (error) {
      console.error("Error deleting doctor:", error);
      toast.error("Error deleting doctor");
    }
  };

  return (
    <div>
      {/* Rendering the table only if data is available */}
      {data && (
        <table className="w-full table-auto">
          <thead className="overflow-hidden rounded-md bg-dry">
            <tr>
              <th className={thclass}>#</th>
              <th className={thclass}>Doctor</th>
              <th className={thclass}>Created At</th>
              <th className={thclass}>Phone Number</th>
              <th className={thclass}>Email</th>
              <th className={thclass}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Mapping through the data to render each doctor's information */}
            {data.map((item, index) => (
              <tr
                key={item._id}
                className="border-b border-border hover:bg-greyed transitions"
              >
                <td className={tdclass}>{index + 1}</td>
                <td className={tdclass}>{item.fullName}</td>
                <td className={tdclass}>
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
                <td className={tdclass}>
                  <p className="text-textGray">{item.phoneNumber}</p>
                </td>
                <td className={tdclass}>{item.email}</td>
                <td className={tdclass}>
                  {/* Link to view the doctor's details */}
                  <Link
                    to={`/A.doctors/preview/${item._id}`}
                    className="mr-2 text-blue-500"
                  >
                    <FiEye className="inline ml-1" />
                  </Link>
                  {/* Button to delete the doctor */}
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
          datas={selectedDoctor}
          isEdit={true}
          itemId={editDoctorId}
        />
      )}
    </div>
  );
}
