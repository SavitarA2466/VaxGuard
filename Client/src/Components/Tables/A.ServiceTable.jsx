import React, { useEffect } from 'react';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { FiEdit, FiEye } from 'react-icons/fi';
import { RiDeleteBin6Line, RiDeleteBinLine } from 'react-icons/ri';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useState } from 'react';
import Modal from '../Modals/A.AddEditServiceModal';

const thclass = 'text-start text-sm font-medium py-3 px-2 whitespace-nowrap';
const tdclass = 'text-start text-sm py-4 px-2 whitespace-nowrap';

export function AServiceTable() {
    const [data, setData] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [editServiceId, setEditServiceId]= useState(null);
    
    useEffect(() => {
      async function fetchData() {
        try {
          const response = await axios.get('http://localhost:5000/api/services'); 
          setData(response.data);
        } catch (error) {
          console.error('Error fetching services:', error);
          toast.error('Error fetching services');
        }
      }
    
      fetchData();
    }, []);
    
    console.log(data) 
    const handleEdit = (item) => {
      setSelectedService(item);
      setEditServiceId(item._id)
      setIsModalOpen(true);
    };
    
    const handleDelete = async (itemId) => {
      try {
        await axios.delete(`http://localhost:5000/api/services/${itemId}`); 
        setData(data.filter((item) => item._id !== itemId));
        toast.success('Service deleted successfully');
      } catch (error) {
        console.error('Error deleting service:', error);
        toast.error('Error deleting service');
      }
    };
  
    return (
    <div>
      <table className="table-auto w-full">
        <thead className="bg-dry rounded-md overflow-hidden">
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
              className="border-b border-border hover:bg-greyed transition"
            >
              <td className={tdclass}>
                <h4 className="text-sm font-medium">{item.name}</h4>
              </td>
              <td className={tdclass}>{new Date(item.createdAt).toLocaleDateString()}</td>
              <td className={tdclass}>
                <span
                  className={`text-xs font-medium ${
                    !item?.status ? 'text-red-600' : 'text-green-600'
                  }`}
                >
                  {!item?.status ? 'Disabled' : 'Enabled'}
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
          datas={selectedService}
          isEdit={true}
          itemId={editServiceId}
        />
      )}
      </div>
    );
  }