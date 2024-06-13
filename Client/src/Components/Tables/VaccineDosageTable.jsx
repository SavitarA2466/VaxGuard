import React, { useEffect } from 'react';
import { MenuSelect } from '../Form';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { FiEdit, FiEye } from 'react-icons/fi';
import { RiDeleteBin6Line, RiDeleteBinLine } from 'react-icons/ri';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useState } from 'react';
import DMedicineDosageModal from '../Modals/D.MedicineDosage';
import { Link } from 'react-router-dom';

const thclass = 'text-start text-xs font-medium py-3 px-2 whitespace-nowrap';
const tdclass = 'text-start text-xs py-4 px-2 whitespace-nowrap';

export function VaccineDosageTable() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUseVaccine, setSelectedUseVaccine] = useState(null);
    const [data, setData] = useState([]);
    const [editItemId, setEditItemId]= useState(null);

      
    useEffect(() => {
        async function fetchData() {
          try {
            const response = await axios.get('http://localhost:5000/api/usevaccines'); 
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
        setSelectedUseVaccine(item);
        setEditItemId(item._id)
        setIsModalOpen(true);
      };
    
      const handleDelete = async (itemId) => {
        try {
          await axios.delete(`http://localhost:5000/api/usevaccines/${itemId}`); 
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
        <DMedicineDosageModal
          closeModal={() => setIsModalOpen(false)}
          isOpen={isModalOpen}
          datas={selectedUseVaccine}
          isEdit={true}
          itemId={editItemId}
        />
      )}
      </div>
    );
  }