import React, { useEffect } from 'react'; 
import { toast } from 'react-hot-toast'; 
import axios from 'axios'; 
import { useState } from 'react'; 
import Modal from '../../Components/Modals/A.AddEditVaccine'; 

const thclass = 'text-start text-sm font-medium py-3 px-2 whitespace-nowrap'; // Class for table header cells
const tdclass = 'text-start text-sm py-4 px-2 whitespace-nowrap'; // Class for table data cells

export function VaccineTable() {
    const [data, setData] = useState([]); // State to hold vaccine data
    const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
    const [selectedVaccine, setSelectedVaccine] = useState(null); // State to hold the currently selected vaccine
    const [editItemId, setEditItemId]= useState(null); // State to hold the ID of the vaccine being edited
  
    useEffect(() => {
      async function fetchData() { // Define an async function to fetch data
        try {
          const response = await axios.get('http://localhost:5000/api/vaccines'); // Make GET request to fetch vaccines
          setData(response.data); // Set fetched data to state
        } catch (error) {
          console.error('Error fetching vaccines:', error); // Log error if fetch fails
          toast.error('Error fetching vaccines'); // Display error notification
        }
      }
  
      fetchData(); // Call the fetchData function
    }, []); // Empty dependency array means this effect runs once on mount
    
    console.log(data); // Log data to the console (for debugging)
    
    const handleEdit = (item) => { // Function to handle editing a vaccine
      setSelectedVaccine(item); // Set selected vaccine to state
      setEditItemId(item._id); // Set the ID of the vaccine to edit
      setIsModalOpen(true); // Open the modal
    };
  
    return (
      <div>
        <table className="table-auto w-full"> {/* Render table with full width */}
          <thead className="bg-dry rounded-md overflow-hidden"> {/* Table header styling */}
            <tr>
              <th className={thclass}>Name</th> {/* Column header for vaccine name */}
              <th className={thclass}>Status</th> {/* Column header for vaccine status */}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => ( // Map over data to create table rows
              <tr
                key={item._id} // Unique key for each row
                className="border-b border-border hover:bg-greyed transitions" // Row styling
              >
                <td className={tdclass}>
                  <h4 className="text-sm font-medium">{item.vaccineName}</h4> {/* Vaccine name */}
                </td>
                <td className={tdclass}>
                  <span
                    className={`text-xs font-medium ${
                      item.instock > 0 ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {item.instock > 0 ? 'Available' : 'Out of stock'} {/* Vaccine availability status */}
                  </span>
                </td>
                <td className={tdclass}>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isModalOpen && (
          <Modal
            closeModal={() => setIsModalOpen(false)} // Function to close modal
            isOpen={isModalOpen} // Pass modal open state
            datas={selectedVaccine} // Pass selected vaccine data
            isEdit={true} // Indicate that this is an edit action
            itemId={editItemId} // Pass the ID of the item being edited
          />
        )}
      </div>
    );
}
