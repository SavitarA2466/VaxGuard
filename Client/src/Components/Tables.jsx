import React from 'react';
import { MenuSelect } from './Form';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { FiEdit, FiEye } from 'react-icons/fi';
import { RiDeleteBin6Line, RiDeleteBinLine } from 'react-icons/ri';
import { toast } from 'react-hot-toast';

const thclass = 'text-start text-sm font-medium py-3 px-2 whitespace-nowrap';
const tdclass = 'text-start text-sm py-4 px-2 whitespace-nowrap';

// Admin Vaccine Table
export function AVaccineTable({ data, onEdit }) {
    const DropDown1 = [
      {
        title: 'Edit',
        icon: FiEdit,
        onClick: (item) => {
          onEdit(item);
        },
      },
      {
        title: 'Delete',
        icon: RiDeleteBin6Line,
        onClick: () => {
          toast.error('This feature is not available yet');
        },
      },
    ];
    return (
      <table className="table-auto w-full">
        <thead className="bg-dry rounded-md overflow-hidden">
          <tr>
            <th className={thclass}>Name</th>
            <th className={thclass}>Status</th>
            <th className={thclass}>InStock</th>
            <th className={thclass}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={item.id}
              className="border-b border-border hover:bg-greyed transitions"
            >
              <td className={tdclass}>
                <h4 className="text-sm font-medium">{item?.name}</h4>
              </td>
              <td className={tdclass}>
                <span
                  className={`text-xs font-medium ${
                    item?.status === 'Out of stock'
                      ? 'text-red-600'
                      : 'text-green-600'
                  }`}
                >
                  {item?.status}
                </span>
              </td>
              <td className={tdclass}>{item?.stock}</td>
              <td className={tdclass}>
                <MenuSelect datas={DropDown1} item={item}>
                  <div className="bg-dry border text-main text-xl py-2 px-4 rounded-lg">
                    <BiDotsHorizontalRounded />
                  </div>
                </MenuSelect>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

//Admin Service table
export function AServiceTable({ data, onEdit }) {
    const DropDown1 = [
      {
        title: 'Edit',
        icon: FiEdit,
        onClick: (item) => {
          onEdit(item);
        },
      },
      {
        title: 'Delete',
        icon: RiDeleteBin6Line,
        onClick: () => {
          toast.error('This feature is not available yet');
        },
      },
    ];
  
    return (
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
              key={item.id}
              className="border-b border-border hover:bg-greyed transition"
            >
              <td className={tdclass}>
                <h4 className="text-sm font-medium">{item?.name}</h4>
              </td>
              <td className={tdclass}>{item?.date}</td>
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
                <MenuSelect datas={DropDown1} item={item}>
                  <div className="bg-dry border text-main text-xl py-2 px-4 rounded-lg">
                    <BiDotsHorizontalRounded />
                  </div>
                </MenuSelect>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

//Admin Patient Table
export function APatientTable({ data, functions, used }) {
    const DropDown1 = !used
      ? [
          {
            title: 'View',
            icon: FiEye,
            onClick: (data) => {
              functions.preview(data.id);
            },
          },
          {
            title: 'Delete',
            icon: RiDeleteBin6Line,
            onClick: () => {
              toast.error('This feature is not available yet');
            },
          },
        ]
      : [
          {
            title: 'View',
            icon: FiEye,
            onClick: (data) => {
              functions.preview(data.id);
            },
          },
        ];
    const thclasse = 'text-start text-sm font-medium py-3 px-2 whitespace-nowrap';
    const tdclasse = 'text-start text-xs py-4 px-2 whitespace-nowrap';
    return (
      <table className="table-auto w-full">
        <thead className="bg-dry rounded-md overflow-hidden">
          <tr>
            <th className={thclasse}>#</th>
            <th className={thclasse}>Patient</th>
            <th className={thclasse}>Created At</th>
            <th className={thclasse}>Gender</th>
            {!used && (
              <>
                <th className={thclasse}>Blood Group</th>
                <th className={thclasse}>Age</th>
              </>
            )}
  
            <th className={thclasse}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={item.id}
              className="border-b border-border hover:bg-greyed transitions"
            >
              <td className={tdclasse}>{index + 1}</td>
              <td className={tdclasse}>
                <div className="flex gap-4 items-center">
                  {!used && (
                    <span className="w-12">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-12 rounded-full object-cover border border-border"
                      />
                    </span>
                  )}
  
                  <div>
                    <h4 className="text-sm font-medium">{item.title}</h4>
                    <p className="text-xs mt-1 text-textGray">{item.phone}</p>
                  </div>
                </div>
              </td>
              <td className={tdclasse}>{item.date}</td>
  
              <td className={tdclasse}>
                <span
                  className={`py-1 px-4 ${
                    item.gender === 'Male'
                      ? 'bg-subMain text-subMain'
                      : 'bg-orange-500 text-orange-500'
                  } bg-opacity-10 text-xs rounded-xl`}
                >
                  {item.gender}
                </span>
              </td>
              {!used && (
                <>
                  <td className={tdclasse}>{item.blood}</td>
                  <td className={tdclasse}>{item.age}</td>
                </>
              )}
  
              <td className={tdclasse}>
                <MenuSelect datas={DropDown1} item={item}>
                  <div className="bg-dry border text-main text-xl py-2 px-4 rounded-lg">
                    <BiDotsHorizontalRounded />
                  </div>
                </MenuSelect>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

//Admin Doctor table
export function ADoctorsTable({ data, functions, doctor }) {
    const DropDown1 = [
      {
        title: 'View',
        icon: FiEye,
        onClick: (data) => {
          functions.preview(data);
        },
      },
      {
        title: 'Delete',
        icon: RiDeleteBin6Line,
        onClick: () => {
          toast.error('This feature is not available yet');
        },
      },
    ];
    return (
      <table className="table-auto w-full">
        <thead className="bg-dry rounded-md overflow-hidden">
          <tr>
            <th className={thclass}>#</th>
            <th className={thclass}>{doctor ? 'Doctor' : 'Receptionist'}</th>
            <th className={thclass}>Created At</th>
            <th className={thclass}>Phone</th>
            <th className={thclass}>Title</th>
            <th className={thclass}>Email</th>
            <th className={thclass}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* {data.map((item, index) => (
            <tr
              key={item.id}
              className="border-b border-border hover:bg-greyed transitions"
            >
              <td className={tdclass}>{index + 1}</td>
              <td className={tdclass}>
                <div className="flex gap-4 items-center">
                  <span className="w-12">
                    <img
                      src={item.user.image}
                      alt={item.user.title}
                      className="w-full h-12 rounded-full object-cover border border-border"
                    />
                  </span>
                  <h4 className="text-sm font-medium">{item.user.title}</h4>
                </div>
              </td>
              <td className={tdclass}>12 May, 2021</td>
              <td className={tdclass}>
                <p className="text-textGray">{item.user.phone}</p>
              </td>
              <td className={tdclass}>{item.title}</td>
              <td className={tdclass}>{item.user.email}</td>
  
              <td className={tdclass}>
                <MenuSelect datas={DropDown1} item={item}>
                  <div className="bg-dry border text-main text-xl py-2 px-4 rounded-lg">
                    <BiDotsHorizontalRounded />
                  </div>
                </MenuSelect>
              </td>
            </tr>
          ))} */}
        </tbody>
      </table>
    );
  }

//Admin Appointment table
export function AAppointmentTable({ data, functions, doctor }) {
    return (
      <table className="table-auto w-full">
        <thead className="bg-dry rounded-md overflow-hidden">
          <tr>
            <th className={thclass}>Date</th>
            <th className={thclass}>{doctor ? 'Patient' : 'Doctor'}</th>
            <th className={thclass}>Status</th>
            <th className={thclass}>Time</th>
            <th className={thclass}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              className="border-b border-border hover:bg-greyed transitions"
            >
              <td className={tdclass}>
                <p className="text-xs">{item.date}</p>
              </td>
              <td className={tdclass}>
                <h4 className="text-xs font-medium">
                  {doctor ? item.user.title : item.doctor.title}
                </h4>
                <p className="text-xs mt-1 text-textGray">
                  {doctor ? item.user.phone : item.doctor.phone}
                </p>
              </td>
              <td className={tdclass}>
                <span
                  className={`py-1  px-4 ${
                    item.status === 'Approved'
                      ? 'bg-subMain text-subMain'
                      : item.status === 'Pending'
                      ? 'bg-orange-500 text-orange-500'
                      : item.status === 'Cancel' && 'bg-red-600 text-red-600'
                  } bg-opacity-10 text-xs rounded-xl`}
                >
                  {item.status}
                </span>
              </td>
              <td className={tdclass}>
                <p className="text-xs">{`${item.from} - ${item.to}`}</p>
              </td>
  
              <td className={tdclass}>
                <button
                  onClick={() => functions.preview(item)}
                  className="text-sm flex-colo bg-white text-subMain border rounded-md w-10 h-10"
                >
                  <FiEye />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

//Admin Vaccine Dosage table
export function AVaccineDosageTable({ data, functions, button }) {
    const thclasse = 'text-start text-xs font-medium py-3 px-2 whitespace-nowrap';
    const tdclasse = 'text-start text-xs py-4 px-2 whitespace-nowrap';
  
    return (
      <table className="table-auto w-full">
        <thead className="bg-dry rounded-md overflow-hidden">
          <tr>
            <th className={thclasse}>Item</th>
            <th className={thclasse}>Dosage</th>
            <th className={thclasse}>Batch Number</th> {/* Added Batch Number column */}
            {button && <th className={thclasse}>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr
              key={item.id}
              className="border-b border-border hover:bg-greyed transitions"
            >
              <td className={tdclasse}>{item.name}</td>
              <td className={tdclasse}>{item.dosage}</td> {/* Changed to item.dosage for consistency */}
              <td className={tdclasse}>{item.batchNumber}</td> {/* Added batch number cell */}
              {button && (
                <td className={tdclasse}>
                  <button
                    onClick={() => functions.delete(item.id)}
                    className="bg-red-600 bg-opacity-5 text-red-600 rounded-lg border border-red-100 py-3 px-4 text-sm"
                  >
                    <RiDeleteBinLine />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

// Vaccine Table
export function VaccineTable({ data, onEdit }) {
  
    return (
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
              className="border-b border-border hover:bg-greyed transitions"
            >
              <td className={tdclass}>
                <h4 className="text-sm font-medium">{item?.name}</h4>
              </td>
              <td className={tdclass}>
                <span
                  className={`text-xs font-medium ${
                    item?.status === 'Out of stock'
                      ? 'text-red-600'
                      : 'text-green-600'
                  }`}
                >
                  {item?.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

//Service table
export function ServiceTable({ data, onEdit }) {
 
    return (
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
                <h4 className="text-sm font-medium">{item?.name}</h4>
              </td>
              <td className={tdclass}>
                <span
                  className={`text-xs font-medium ${
                    !item?.status ? 'text-red-600' : 'text-green-600'
                  }`}
                >
                  {!item?.status ? 'Disabled' : 'Enabled'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }  

// Doctor Patient Table  
export function DPatientTable({ data, functions, used }) {
    const DropDown1 = [
      {
        title: 'View',
        icon: FiEye,
        onClick: (data) => {
          functions.preview(data.id);
        },
      },
    ];
  
    const thclasse = 'text-start text-sm font-medium py-3 px-2 whitespace-nowrap';
    const tdclasse = 'text-start text-xs py-4 px-2 whitespace-nowrap';
  
    return (
      <table className="table-auto w-full">
        <thead className="bg-dry rounded-md overflow-hidden">
          <tr>
            <th className={thclasse}>#</th>
            <th className={thclasse}>Patient</th>
            <th className={thclasse}>Gender</th>
            {!used && (
              <>
                <th className={thclasse}>Blood Group</th>
                <th className={thclasse}>Age</th>
              </>
            )}
            <th className={thclasse}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={item.id}
              className="border-b border-border hover:bg-greyed transitions"
            >
              <td className={tdclasse}>{index + 1}</td>
              <td className={tdclasse}>
                <div className="flex gap-4 items-center">
                  {!used && (
                    <span className="w-12">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-12 rounded-full object-cover border border-border"
                      />
                    </span>
                  )}
                  <div>
                    <h4 className="text-sm font-medium">{item.title}</h4>
                    <p className="text-xs mt-1 text-textGray">{item.phone}</p>
                  </div>
                </div>
              </td>
              <td className={tdclasse}>
                <span
                  className={`py-1 px-4 ${
                    item.gender === 'Male'
                      ? 'bg-subMain text-subMain'
                      : 'bg-orange-500 text-orange-500'
                  } bg-opacity-10 text-xs rounded-xl`}
                >
                  {item.gender}
                </span>
              </td>
              {!used && (
                <>
                  <td className={tdclasse}>{item.blood}</td>
                  <td className={tdclasse}>{item.age}</td>
                </>
              )}
              <td className={tdclasse}>
                <MenuSelect datas={DropDown1} item={item}>
                  <div className="bg-dry border text-main text-xl py-2 px-4 rounded-lg">
                    <BiDotsHorizontalRounded />
                  </div>
                </MenuSelect>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

//User Patient Table
export function UPatientTable({ data, functions, used }) {
    const DropDown1 = !used
      ? [
          {
            title: 'View',
            icon: FiEye,
            onClick: (data) => {
              functions.preview(data.id);
            },
          },
          {
            title: 'Delete',
            icon: RiDeleteBin6Line,
            onClick: () => {
              toast.error('This feature is not available yet');
            },
          },
        ]
      : [
          {
            title: 'View',
            icon: FiEye,
            onClick: (data) => {
              functions.preview(data.id);
            },
          },
        ];
    const thclasse = 'text-start text-sm font-medium py-3 px-2 whitespace-nowrap';
    const tdclasse = 'text-start text-xs py-4 px-2 whitespace-nowrap';
    return (
      <table className="table-auto w-full">
        <thead className="bg-dry rounded-md overflow-hidden">
          <tr>
            <th className={thclasse}>#</th>
            <th className={thclasse}>Child</th>
            <th className={thclasse}>Gender</th>
            {!used && (
              <>
                <th className={thclasse}>Blood Group</th>
                <th className={thclasse}>Age</th>
              </>
            )}
            <th className={thclasse}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={item.id}
              className="border-b border-border hover:bg-greyed transitions"
            >
              <td className={tdclasse}>{index + 1}</td>
              <td className={tdclasse}>
                <div className="flex gap-4 items-center">
                  {!used && (
                    <span className="w-12">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-12 rounded-full object-cover border border-border"
                      />
                    </span>
                  )}
  
                  <div>
                    <h4 className="text-sm font-medium">{item.title}</h4>
                    <p className="text-xs mt-1 text-textGray">{item.phone}</p>
                  </div>
                </div>
              </td>
              <td className={tdclasse}>
                <span
                  className={`py-1 px-4 ${
                    item.gender === 'Male'
                      ? 'bg-subMain text-subMain'
                      : 'bg-orange-500 text-orange-500'
                  } bg-opacity-10 text-xs rounded-xl`}
                >
                  {item.gender}
                </span>
              </td>
              {!used && (
                <>
                  <td className={tdclasse}>{item.blood}</td>
                  <td className={tdclasse}>{item.age}</td>
                </>
              )}
              <td className={tdclasse}>
                <MenuSelect datas={DropDown1} item={item}>
                  <div className="bg-dry border text-main text-xl py-2 px-4 rounded-lg">
                    <BiDotsHorizontalRounded />
                  </div>
                </MenuSelect>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

//User Doctor table
export function UDoctorsTable({ data, functions, doctor }) {

    const thclass = 'text-start text-sm font-medium py-3 px-2 whitespace-nowrap';
    const tdclass = 'text-start text-xs py-4 px-2 whitespace-nowrap';
  
    return (
      <table className="table-auto w-full">
        <thead className="bg-dry rounded-md overflow-hidden">
          <tr>
            <th className={thclass}>#</th>
            <th className={thclass}>{doctor ? 'Doctor' : 'Receptionist'}</th>
            <th className={thclass}>Phone</th>
            <th className={thclass}>Title</th>
            <th className={thclass}>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={item.id}
              className="border-b border-border hover:bg-greyed transitions"
            >
              <td className={tdclass}>{index + 1}</td>
              <td className={tdclass}>
                <div className="flex gap-4 items-center">
                  <span className="w-12">
                    <img
                      src={item.user.image}
                      alt={item.user.title}
                      className="w-full h-12 rounded-full object-cover border border-border"
                    />
                  </span>
                  <h4 className="text-sm font-medium">{item.user.title}</h4>
                </div>
              </td>
              <td className={tdclass}>
                <p className="text-textGray">{item.user.phone}</p>
              </td>
              <td className={tdclass}>{item.title}</td>
              <td className={tdclass}>{item.user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

// Appointment table
export function AppointmentTable({ data, functions, doctor }) {
    return (
      <table className="table-auto w-full">
        <thead className="bg-dry rounded-md overflow-hidden">
          <tr>
            <th className={thclass}>Date</th>
            <th className={thclass}>{doctor ? 'Patient' : 'Doctor'}</th>
            <th className={thclass}>Status</th>
            <th className={thclass}>Time</th>
            <th className={thclass}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              className="border-b border-border hover:bg-greyed transitions"
            >
              <td className={tdclass}>
                <p className="text-xs">{item.date}</p>
              </td>
              <td className={tdclass}>
                <h4 className="text-xs font-medium">
                  {doctor ? item.user.title : item.doctor.title}
                </h4>
                <p className="text-xs mt-1 text-textGray">
                  {doctor ? item.user.phone : item.doctor.phone}
                </p>
              </td>
              <td className={tdclass}>
                <span
                  className={`py-1  px-4 ${
                    item.status === 'Approved'
                      ? 'bg-subMain text-subMain'
                      : item.status === 'Pending'
                      ? 'bg-orange-500 text-orange-500'
                      : item.status === 'Cancel' && 'bg-red-600 text-red-600'
                  } bg-opacity-10 text-xs rounded-xl`}
                >
                  {item.status}
                </span>
              </td>
              <td className={tdclass}>
                <p className="text-xs">{`${item.from} - ${item.to}`}</p>
              </td>
  
              <td className={tdclass}>
                <button
                  onClick={() => functions.preview(item)}
                  className="text-sm flex-colo bg-white text-subMain border rounded-md w-10 h-10"
                >
                  <FiEye />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

//Vaccine Dosage table
export function VaccineDosageTable({ data, functions, button }) {
    const thclasse = 'text-start text-xs font-medium py-3 px-2 whitespace-nowrap';
    const tdclasse = 'text-start text-xs py-4 px-2 whitespace-nowrap';
  
    return (
      <table className="table-auto w-full">
        <thead className="bg-dry rounded-md overflow-hidden">
          <tr>
            <th className={thclasse}>Item</th>
            <th className={thclasse}>Dosage</th>
            <th className={thclasse}>Batch Number</th> {/* Added Batch Number column */}
            {button && <th className={thclasse}>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr
              key={item.id}
              className="border-b border-border hover:bg-greyed transitions"
            >
              <td className={tdclasse}>{item.name}</td>
              <td className={tdclasse}>{item.dosage}</td> {/* Changed to item.dosage for consistency */}
              <td className={tdclasse}>{item.batchNumber}</td> {/* Added batch number cell */}
              {button && (
                <td className={tdclasse}>
                  <button
                    onClick={() => functions.delete(item.id)}
                    className="bg-red-600 bg-opacity-5 text-red-600 rounded-lg border border-red-100 py-3 px-4 text-sm"
                  >
                    <RiDeleteBinLine />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }