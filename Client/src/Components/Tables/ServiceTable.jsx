// Importing necessary modules and components from external libraries and internal files
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast'; 
import axios from 'axios'; 
import AAddEditServiceModal from '../Modals/A.AddEditServiceModal'; 
import { Link } from 'react-router-dom'; 

// Defining CSS classes for table headers and cells
const thclass = 'text-start text-sm font-medium py-3 px-2 whitespace-nowrap';
const tdclass = 'text-start text-sm py-4 px-2 whitespace-nowrap';

// Defining the ServiceTable functional component
export function ServiceTable() {
    const [data, setData] = useState([]); // State to hold the fetched data
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
    const [selectedService, setSelectedService] = useState(null); // State to hold the selected service for editing

    // useEffect to fetch data when the component mounts
    useEffect(() => {
        async function fetchData() {
          try {
            const response = await axios.get('http://localhost:5000/api/services'); // Fetching services data from the API
            setData(response.data); // Setting the fetched data to state
          } catch (error) {
            console.error('Error fetching vaccines:', error); // Logging error in case of failure
            toast.error('Error fetching vaccines'); // Showing error toast notification
          }
        }

        fetchData(); // Calling the fetchData function
    }, []);

    console.log(data); // Logging the fetched data

    // Function to handle edit action
    const handleEdit = (item) => {
        setSelectedService(item); // Setting the selected service to state
        setIsModalOpen(true); // Opening the modal
    };

    return (
        <div>
            <table className="table-auto w-full">
                <thead className="bg-dry rounded-md overflow-hidden">
                    <tr>
                        <th className={thclass}>Name</th>
                        <th className={thclass}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Mapping through the fetched data to render table rows */}
                    {data.map((item) => (
                        <tr
                            key={item.id}
                            className="border-b border-border hover:bg-greyed transition"
                        >
                            <td className={tdclass}>
                                <h4 className="text-sm font-medium">{item.name}</h4>
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
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Conditional rendering of the modal */}
            {isModalOpen && (
                <AAddEditServiceModal
                    closeModal={() => setIsModalOpen(false)} // Function to close the modal
                    isOpen={isModalOpen} // Modal visibility state
                    datas={selectedService} // Selected service data
                    isEdit={true} // Setting the modal to edit mode
                />
            )}
        </div>
    );
}
