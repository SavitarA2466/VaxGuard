import React, { useEffect } from 'react';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin6Line} from 'react-icons/ri';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useState } from 'react';
import Modal from '../../Components/Modals/A.AddEditVaccine';

const thclass = 'text-start text-sm font-medium py-3 px-2 whitespace-nowrap';
const tdclass = 'text-start text-sm py-4 px-2 whitespace-nowrap';

export function AVaccineTable() {
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVaccine, setSelectedVaccine] = useState(null);
    const [editItemId, setEditItemId]= useState(null);
  
    useEffect(() => {
      async function fetchData() {
        try {
          const response = await axios.get('http://localhost:5000/api/vaccines'); 
          setData(response.data);
        } catch (error) {
          console.error('Error fetching vaccines:', error);
          toast.error('Error fetching vaccines');
        }
      }
  
      fetchData();
    }, []);
    console.log(data) 
    const handleEdit = (item) => {
      setSelectedVaccine(item);
      setEditItemId(item._id)
      setIsModalOpen(true);
    };
  
    const handleDelete = async (itemId) => {
      try {
        await axios.delete(`http://localhost:5000/api/vaccines/${itemId}`); 
        setData(data.filter((item) => item._id !== itemId));
        toast.success('Vaccine deleted successfully');
      } catch (error) {
        console.error('Error deleting vaccine:', error);
        toast.error('Error deleting vaccine');
      }
    };
  
    return (
      <div>
        <table className="table-auto w-full">
          <thead className="bg-dry rounded-md overflow-hidden">
            <tr>
              <th className={thclass}>Name</th>
              <th className={thclass}>InStock</th>
              <th className={thclass}>Status</th>
              <th className={thclass}>Actions</th>
            </tr>
          </thead>
          <tbody>
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
                      item.instock > 0 ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {item.instock > 0 ? 'Available' : 'Out of stock'}
                  </span>
                </td>
                <td className={tdclass}>
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-500 mr-2"
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
