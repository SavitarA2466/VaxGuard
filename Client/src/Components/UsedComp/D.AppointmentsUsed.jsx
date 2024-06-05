import { useState } from 'react';
import { appointmentsData } from '../Datas';
import DAddAppointmentModal from '../Modals/D.AddApointmentModal';
import { AppointmentTable } from '../Tables';

function DAppointmentsUsed({ doctor }) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});

  // onClick event handler
  const handleEventClick = (event) => {
    setData(event);
    setOpen(!open);
  };
  // handle modal close
  const handleClose = () => {
    setOpen(!open);
    setData({});
  };
  return (
    <div className="w-full">
      {open && (
        <DAddAppointmentModal
          datas={data}
          isOpen={open}
          closeModal={() => {
            handleClose();
          }}
        />
      )}
      <h1 className="text-sm font-medium mb-6">Appointments</h1>
      <div className="w-full overflow-x-scroll">
        <AppointmentTable
          data={appointmentsData}
          doctor={doctor}
          functions={{
            preview: handleEventClick,
          }}
        />
      </div>
    </div>
  );
}

export default DAppointmentsUsed;

