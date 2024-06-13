import React, { useEffect } from 'react';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { FiEdit, FiEye } from 'react-icons/fi';
import { RiDeleteBin6Line, RiDeleteBinLine } from 'react-icons/ri';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useState } from 'react';
import AAddEditServiceModal from '../Modals/A.AddEditServiceModal';
import { Link } from 'react-router-dom';

const thclass = 'text-start text-sm font-medium py-3 px-2 whitespace-nowrap';
const tdclass = 'text-start text-sm py-4 px-2 whitespace-nowrap';
export function ServiceTable() {
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);

    
    useEffect(() => {
        async function fetchData() {
          try {
            const response = await axios.get('http://localhost:5000/api/services'); 
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
        setSelectedService(item);
        setIsModalOpen(true);
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
                    item.status ? 'text-red-600' : 'text-green-600'
                  }`}
                >
                  {item.status ? 'Disabled' : 'Enabled'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
       {isModalOpen && (
        <AAddEditServiceModal
          closeModal={() => setIsModalOpen(false)}
          isOpen={isModalOpen}
          datas={selectedService}
          isEdit={true}
        />
      )}
      </div>
    );
  }  