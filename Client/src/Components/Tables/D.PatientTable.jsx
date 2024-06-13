import React, { useEffect, useState } from 'react';
import { FiEye, FiEdit } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UAddChildModal from '../../Components/Modals/U.AddChildModal';

const thclass = 'text-start text-sm font-medium py-3 px-2 whitespace-nowrap';
const tdclass = 'text-start text-sm py-4 px-2 whitespace-nowrap';

export function DPatientTable() {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChild, setSelectedChild] = useState(null);
  const [editChildId, setEditChildId] = useState(null);

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:5000/api/children');
        const childrenData = response.data.map((child) => ({
          ...child,
          age: calculateAge(child.dateOfBirth)
        }));
        setData(childrenData);
      } catch (error) {
        console.error('Error fetching children:', error);
        toast.error('Error fetching children');
      }
    }

    fetchData();
  }, []);

  console.log(data) 
  const handleEdit = (item) => {
    setSelectedChild(item);
    setEditChildId(item._id);
    setIsModalOpen(true);
  };

  return (
    <div>
      <table className="table-auto w-full">
        <thead className="bg-dry rounded-md overflow-hidden">
          <tr>
            <th className={thclass}>#</th>
            <th className={thclass}>Child</th>
            <th className={thclass}>Gender</th>
            <th className={thclass}>Blood Group</th>
            <th className={thclass}>Age</th>
            <th className={thclass}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item._id} className="border-b border-border hover:bg-greyed transitions">
              <td className={tdclass}>{index + 1}</td>
              <td className={tdclass}>{item.fullName}</td>
              <td className={tdclass}>
                <span className={`py-1 px-4 ${item.gender === 'Male' ? 'bg-subMain text-subMain' : 'bg-orange-500 text-orange-500'} bg-opacity-10 text-xs rounded-xl`}>
                  {item.gender}
                </span>
              </td>
              <td className={tdclass}>{item.bloodType}</td>
              <td className={tdclass}>{item.age}</td>
              <td className={tdclass}>
                <Link to={`/D.Patients/D.PatientProfile`} className="text-blue-500 mr-2">
                  <FiEye className="inline ml-1" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <UAddChildModal
          closeModal={() => setIsModalOpen(false)}
          isOpen={isModalOpen}
          datas={selectedChild}
          isEdit={true}
          itemId={editChildId}
        />
      )}
    </div>
  );
}
