import React from 'react';
import Layout from '../Layout/UserLayout/U.index';
import {
  BsCheckCircleFill,
  BsClockFill,
  BsXCircleFill,
} from 'react-icons/bs';
import {
  UImmunizationChartData,
  servicesData,  // Assuming you have service data
  medicineData, // Assuming you have medicine data
} from '../Components/Datas';
import { Link } from 'react-router-dom';
import { ServiceTable, VaccineTable } from '../Components/Tables';

function UserDashboard() {
  const handleEditService = (item) => {
    // Handle edit service logic here
    console.log('Edit service:', item);
  };

  const handleEditMedicine = (item) => {
    // Handle edit medicine logic here
    console.log('Edit medicine:', item);
  };

  return (
    <Layout>
      <div className="w-full my-6 grid grid-cols-1 gap-6">
        {/* Add content here if needed */}
        <div
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-delay="10"
          data-aos-offset="200"
          className="w-full"
        >
          {/* Immunization Chart */}
          <div className="bg-white rounded-xl border-[1px] border-border p-5">
            <h2 className="text-sm mb-4 font-medium">Immunization Chart</h2>
            <div className="flex overflow-x-auto space-x-4">
              {UImmunizationChartData.map((immunization) => (
                <div
                  key={immunization.id}
                  className="flex-shrink-0 flex flex-col items-center space-y-2 p-2"
                  style={{ width: '150px', height: '150px' }} // Adjusted width and height
                >
                  <p className="text-textGray text-sm font-light">
                    {immunization.date}
                  </p>
                  <div className="flex-colo relative" style={{ height: '50px' }}>
                    <hr className="w-20 h-[2px] bg-border" />
                    <div
                      className={`w-8 h-8 flex-colo text-base bg-opacity-10
                        ${
                          immunization.status === 'Pending' && 'bg-orange-500 text-orange-500'
                        }
                        ${
                          immunization.status === 'Cancel' && 'bg-red-500 text-red-500'
                        }
                        ${
                          immunization.status === 'Approved' && 'bg-green-500 text-green-500'
                        }
                        rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
                    >
                      {immunization.status === 'Pending' && <BsClockFill />}
                      {immunization.status === 'Cancel' && <BsXCircleFill />}
                      {immunization.status === 'Approved' && <BsCheckCircleFill />}
                    </div>
                  </div>
                  <div className="flex flex-col items-center space-y-1">
                    <h2 className="text-sm font-medium text-center">
                      {immunization.name}
                    </h2>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Service Table */}
        <div className="bg-white rounded-xl border-[1px] border-border p-5">
          <h2 className="text-sm mb-4 font-medium">Service Table</h2>
          <ServiceTable data={servicesData} onEdit={handleEditService} />
        </div>

        {/* Medicine Table */}
        <div className="bg-white rounded-xl border-[1px] border-border p-5">
          <h2 className="text-sm mb-4 font-medium">Vaccine Table</h2>
          <VaccineTable data={medicineData} onEdit={handleEditMedicine} />
        </div>
      </div>
    </Layout>
  );
}

export default UserDashboard;
