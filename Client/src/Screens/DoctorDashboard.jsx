import React from 'react';
import Layout from '../Layout/DoctorLayout/D.index';
import {
  BsCheckCircleFill,
  BsClockFill,
  BsXCircleFill,
} from 'react-icons/bs';
import {
  appointmentsData,
  memberData,
  servicesData, 
  medicineData, 
} from '../Components/Datas';
import { Link } from 'react-router-dom';
import { ServiceTable } from '../Components/Tables/ServiceTable'; 
import { VaccineTable } from '../Components/Tables/VaccineTable'; 

function DoctorDashboard() {
  const handleEditService = (item) => {
    // Handle edit service
    console.log("Editing service", item);
  };

  const handleEditMedicine = (item) => {
    // Handle edit medicine
    console.log("Editing medicine", item);
  };

  return (
    <Layout>
      <div className="w-full my-6 grid xl:grid-cols-8 grid-cols-1 gap-6">
        {/* Main content */}
        <div className="xl:col-span-6 w-full">
          {/* Service Table */}
          <div className="bg-white rounded-xl border-[1px] border-border p-5 mb-6">
            <h2 className="text-sm font-medium mb-4">Services</h2>
            <ServiceTable data={servicesData} onEdit={handleEditService} />
          </div>
          {/* vaccine Availability Table */}
          <div className="bg-white rounded-xl border-[1px] border-border p-5">
            <h2 className="text-sm font-medium mb-4">Vaccine Availability</h2>
            <VaccineTable data={medicineData} onEdit={handleEditMedicine} />
          </div>
        </div>
        {/* Sidebar */}
        <div
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-delay="10"
          data-aos-offset="200"
          className="xl:col-span-2 xl:block grid sm:grid-cols-2 gap-6"
        >
          {/* Today's Appointments */}
          <div className="bg-white rounded-xl border-[1px] border-border p-5 xl:mt-6">
            <h2 className="text-sm mb-4 font-medium">Today Appointments</h2>
            {appointmentsData.map((appointment, index) => (
              <div
                key={appointment.id}
                className="grid grid-cols-12 gap-2 items-center"
              >
                <p className="text-textGray text-[12px] col-span-3 font-light">
                  {appointment.time}
                </p>
                <div className="flex-colo relative col-span-2">
                  <hr className="w-[2px] h-20 bg-border" />
                  <div
                    className={`w-7 h-7 flex-colo text-sm bg-opacity-10
                   ${
                     appointment.status === 'Pending' &&
                     'bg-orange-500 text-orange-500'
                   }
                  ${
                    appointment.status === 'Cancel' && 'bg-red-500 text-red-500'
                  }
                  ${
                    appointment.status === 'Approved' &&
                    'bg-green-500 text-green-500'
                  }
                   rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
                  >
                    {appointment.status === 'Pending' && <BsClockFill />}
                    {appointment.status === 'Cancel' && <BsXCircleFill />}
                    {appointment.status === 'Approved' && <BsCheckCircleFill />}
                  </div>
                </div>
                <Link
                  to="/D.appointments"
                  className="flex flex-col gap-1 col-span-6"
                >
                  <h2 className="text-xs font-medium">
                    {appointment.user?.title}
                  </h2>
                  <p className="text-[12px] font-light text-textGray">
                    {appointment.from} - {appointment.to}
                  </p>
                </Link>
              </div>
            ))}
          </div>

          {/* Recent Patients */}
          <div className="bg-white rounded-xl border-[1px] border-border p-5">
            <h2 className="text-sm font-medium">Recent Patients</h2>
            {memberData.slice(0, 5).map((member, index) => (
              <Link
                to={`/D.patients/preview/${member.id}`}
                key={index}
                className="flex-btn gap-4 mt-6 border-b pb-4 border-border"
              >
                <div className="flex gap-4 items-center">
                  <img
                    src={member.image}
                    alt="member"
                    className="w-10 h-10 rounded-md object-cover"
                  />
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xs font-medium">{member.title}</h3>
                    <p className="text-xs text-gray-400">{member.phone}</p>
                  </div>
                </div>
                <p className="text-xs text-textGray">2:00 PM</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default DoctorDashboard;
