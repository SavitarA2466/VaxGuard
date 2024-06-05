import React, { useEffect, useState } from 'react';
import { Checkbox } from './Form';

function Access({ setAccess }) {
  const thclass = 'text-start text-xs font-medium py-3 px-2 whitespace-nowrap';
  const tdclass = 'text-start text-sm py-4 px-2 whitespace-nowrap';
  const [parientAccess, setParientAccess] = useState({
    read: false,
    create: false,
    delete: false,
    edit: false,
  });
  const [appointmentAccess, setAppointmentAccess] = useState({
    read: false,
    create: false,
    delete: false,
    edit: false,
  });

  // on change patient
  const onChangePatient = (e) => {
    setParientAccess({ ...parientAccess, [e.target.name]: e.target.checked });
  };
  // on change appointment
  const onChangeAppointment = (e) => {
    setAppointmentAccess({
      ...appointmentAccess,
      [e.target.name]: e.target.checked,
    });
  };


  const datas = [
    {
      id: 1,
      name: 'Parient',
      access: parientAccess,
      onChange: onChangePatient,
    },
    {
      id: 2,
      name: 'Appointment',
      access: appointmentAccess,
      onChange: onChangeAppointment,
    },
  ];

  // send access to parent component
  useEffect(() => {
    setAccess({
      parientAccess,
      appointmentAccess,
    });
  }, [
    parientAccess,
    appointmentAccess,
    setAccess,
  ]);

  return (
    <div className="w-full">
      <h1 className="text-black text-sm mb-3">Access</h1>
      <div className="w-full overflow-x-scroll">
        <table className="table-auto w-full">
          <thead className="bg-dry rounded-md overflow-hidden">
            <tr>
              <th className={thclass}></th>
              <th className={thclass}>Read</th>
              <th className={thclass}>Edit</th>
              <th className={thclass}>Create</th>
              <th className={thclass}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {datas.map((item) => (
              <tr
                key={item.id}
                className="border-b border-border hover:bg-greyed transitions"
              >
                <td className={`font-light text-xs ${tdclass}`}>{item.name}</td>
                <td className={tdclass}>
                  <Checkbox
                    name="read"
                    checked={item.access.read}
                    onChange={item.onChange}
                  />
                </td>
                <td className={tdclass}>
                  <Checkbox
                    name="edit"
                    checked={item.access.edit}
                    onChange={item.onChange}
                  />
                </td>
                <td className={tdclass}>
                  <Checkbox
                    name="create"
                    checked={item.access.create}
                    onChange={item.onChange}
                  />
                </td>
                <td className={tdclass}>
                  <Checkbox
                    name="delete"
                    checked={item.access.delete}
                    onChange={item.onChange}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Access;
