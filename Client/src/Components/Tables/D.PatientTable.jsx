import React from "react";
import { FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useDoctorsAll } from "../../hooks/useDocotorAll";

const thclass = "text-start text-sm font-medium py-3 px-2 whitespace-nowrap";
const tdclass = "text-start text-sm py-4 px-2 whitespace-nowrap";

export function DPatientTable() {
  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const { data: allData } = useDoctorsAll();

  return (
    <div>
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
          {allData &&
            allData
              .map((d) => d.child)
              .map((c) => ({ ...c, age: calculateAge(c.dateOfBirth) }))
              .map((item, index) => (
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
                      to={`/D.Patients/${item._id}`}
                      className="mr-2 text-blue-500"
                    >
                      <FiEye className="inline ml-1" />
                    </Link>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}
