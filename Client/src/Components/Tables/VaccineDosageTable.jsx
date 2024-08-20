import React, { useEffect, useState } from "react";
import { FiEdit, FiEye } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-hot-toast";
import axios from "axios";
import DMedicineDosageModal from "../Modals/D.MedicineDosage";

// CSS classes for table headers and cells
const thclass = "text-start text-xs font-medium py-3 px-2 whitespace-nowrap";
const tdclass = "text-start text-xs py-4 px-2 whitespace-nowrap";

// Functional component for displaying vaccine dosages
export function VaccineDosageTable() {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [selectedUseVaccine, setSelectedUseVaccine] = useState(null); // State to hold selected vaccine for editing
  const [data, setData] = useState([]); // State to hold the fetched vaccine dosage data
  const [editItemId, setEditItemId] = useState(null); // State to hold the ID of the item being edited

  // Fetch data when the component mounts
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:5000/api/usevaccines");
        setData(response.data); // Set fetched data to state
      } catch (error) {
        console.error("Error fetching vaccines:", error); // Log errors
        toast.error("Error fetching vaccines"); // Show error toast notification
      }
    }

    fetchData(); // Call the fetchData function
  }, []);

  // Function to handle the edit button click
  const handleEdit = (item) => {
    setSelectedUseVaccine(item); // Set the selected item
    setEditItemId(item._id); // Set the ID of the item being edited
    setIsModalOpen(true); // Open the modal
  };

  // Function to handle the delete button click
  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`http://localhost:5000/api/usevaccines/${itemId}`);
      setData(data.filter((item) => item._id !== itemId)); // Remove deleted item from state
      toast.success("Vaccine deleted successfully"); // Show success toast notification
    } catch (error) {
      console.error("Error deleting vaccine:", error); // Log errors
      toast.error("Error deleting vaccine"); // Show error toast notification
    }
  };

  return (
    <div>
      <table className="w-full table-auto">
        <thead className="overflow-hidden rounded-md bg-dry">
          <tr>
            <th className={thclass}>Vaccine</th>
            <th className={thclass}>Batch Number</th>
            <th className={thclass}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr
              key={item._id}
              className="border-b border-border hover:bg-greyed transitions"
            >
              <td className={tdclass}>{item.vaccineName}</td>
              <td className={tdclass}>{item.batchNumber}</td>
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
      {isModalOpen && (
        <DMedicineDosageModal
          closeModal={() => setIsModalOpen(false)} // Function to close the modal
          isOpen={isModalOpen} // Modal visibility state
          datas={selectedUseVaccine} // Selected vaccine data
          isEdit={true} // Set the modal to edit mode
          itemId={editItemId} // ID of the item being edited
        />
      )}
    </div>
  );
}
