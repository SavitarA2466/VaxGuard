import React, { useEffect } from 'react';
import { FiEye } from 'react-icons/fi';
import { RiDeleteBin6Line} from 'react-icons/ri';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useState } from 'react';
import Modal from '../../Components/Modals/A.AddDoctorModal';
import { Link } from 'react-router-dom'; 

const thclass = 'text-start text-sm font-medium py-3 px-2 whitespace-nowrap';
const tdclass = 'text-start text-sm py-4 px-2 whitespace-nowrap';

export function UDoctorsTable() {
    const [data, setData] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [editDoctorId, setEditDoctorId]= useState(null);
    
    useEffect(() => {
      async function fetchData() {
        try {
          const response = await axios.get('http://localhost:5000/api/doctors'); 
          setData(response.data);
        } catch (error) {
          console.error('Error fetching doctors:', error);
          toast.error('Error fetching doctors');
        }
      }
    
      fetchData();
    }, []);
    
    const handleView = (item) => {
      setSelectedDoctor(item);
      setEditDoctorId(item._id)
      setIsModalOpen(true);
    };
    
    const handleDelete = async (itemId) => {
      try {
        await axios.delete(`http://localhost:5000/api/doctors/${itemId}`); 
        setData(data.filter((item) => item._id !== itemId));
        toast.success('Doctor deleted successfully');
      } catch (error) {
        console.error('Error deleting doctor:', error);
        toast.error('Error deleting doctor');
      }
    };
    
    return (
      <div>
        <table className="table-auto w-full">
          <thead className="bg-dry rounded-md overflow-hidden">
            <tr>
              <th className={thclass}>#</th>
              <th className={thclass}>Doctor</th>
              <th className={thclass}>Phone Number</th>
              <th className={thclass}>Email</th>
            </tr>
          </thead>
          <tbody>
              {data.map((item, index) => (
              <tr
                key={item._id}
                className="border-b border-border hover:bg-greyed transitions"
              >
                <td className={tdclass}>{index + 1}</td>
                <td className={tdclass}>{item.fullName}</td>
                <td className={tdclass}>
                  <p className="text-textGray">{item.phoneNumber}</p>
                </td>
                <td className={tdclass}>{item.email}</td>
              </tr>
            ))} 
          </tbody>
        </table>
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
