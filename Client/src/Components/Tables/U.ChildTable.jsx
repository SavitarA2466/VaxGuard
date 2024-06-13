import React, { useEffect, useState } from "react";
import { FiEye, FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
import UAddChildModal from "../../Components/Modals/U.AddChildModal";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMyChildren } from "../../hooks/useMyChildren";

const thclass = "text-start text-sm font-medium py-3 px-2 whitespace-nowrap";
const tdclass = "text-start text-sm py-4 px-2 whitespace-nowrap";

export function UChildTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChild, setSelectedChild] = useState(null);
  const [editChildId, setEditChildId] = useState(null);

  const { data } = useMyChildren();

  const qc = useQueryClient();

  const handleEdit = (item) => {
    setSelectedChild(item);
    setEditChildId(item._id);
    setIsModalOpen(true);
  };

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`http://localhost:5000/api/children/${itemId}`);
      qc.invalidateQueries({ queryKey: ["children"] });
      toast.success("Child deleted successfully");
    } catch (error) {
      console.error("Error deleting child:", error);
      toast.error("Error deleting child");
    }
  };

  return (
    <div>
      {data && (
        <table className="w-full table-auto">
          <thead className="overflow-hidden rounded-md bg-dry">
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
              <tr
                key={item._id}
                className="border-b border-border hover:bg-greyed transitions"
              >
                <td className={tdclass}>{index + 1}</td>
                <td className={tdclass}>{item.fullName}</td>
                <td className={tdclass}>
                  <span
                    className={`py-1 px-4 ${
                      item.gender === "Male"
                        ? "bg-subMain text-subMain"
                        : "bg-orange-500 text-orange-500"
                    } bg-opacity-10 text-xs rounded-xl`}
                  >
                    {item.gender}
                  </span>
                </td>
                <td className={tdclass}>{item.bloodType}</td>
                <td className={tdclass}>{item.age}</td>
                <td className={tdclass}>
                  <Link
                    to={`/child/profile/${item._id}`}
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
