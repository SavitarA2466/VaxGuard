import React from "react";
import { FiEye } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import Modal from "../../Components/Modals/A.AddDoctorModal";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const thclass = "text-start text-sm font-medium py-3 px-2 whitespace-nowrap";
const tdclass = "text-start text-sm py-4 px-2 whitespace-nowrap";

export function ADoctorsTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [editDoctorId, setEditDoctorId] = useState(null);

  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:5000/api/doctors");
      return response.data;
    } catch (error) {
      console.error("Error fetching doctors:", error);
      toast.error("Error fetching doctors");
    }
  }

  const { data } = useQuery({
    queryKey: ["all_doctors"],
    queryFn: fetchData,
  });

  const qc = useQueryClient();

  const handleView = (item) => {
    setSelectedDoctor(item);
    setEditDoctorId(item._id);
    setIsModalOpen(true);
  };

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`http://localhost:5000/api/doctors/${itemId}`);
      qc.invalidateQueries({ queryKey: ["all_doctors"] });
      toast.success("Doctor deleted successfully");
    } catch (error) {
      console.error("Error deleting doctor:", error);
      toast.error("Error deleting doctor");
    }
  };

  return (
    <div>
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
                  <Link
                    to={`/A.doctors/preview/${item._id}`}
                    className="mr-2 text-blue-500"
                  >
                    <FiEye className="inline ml-1" />
                  </Link>
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
