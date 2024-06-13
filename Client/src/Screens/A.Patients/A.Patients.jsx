import React, { useState } from 'react';
import { MdOutlineCloudDownload } from 'react-icons/md';
import Layout from '../../Layout/AdminLayout/A.index';
import { memberData, sortsDatas } from '../../Components/Datas';
import { Link, useNavigate } from 'react-router-dom';
import { BiChevronDown, BiPlus, BiTime } from 'react-icons/bi';
import { BsCalendarMonth } from 'react-icons/bs';
import { MdFilterList, MdOutlineCalendarMonth } from 'react-icons/md';
import { toast } from 'react-hot-toast';
import { Button, FromToDate, Select } from '../../Components/Form';
import { APatientTable } from '../../Components/Tables/A.PatientTable';

function APatients() {
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [startDate, endDate] = dateRange;
  const navigate = useNavigate();

  // boxes
  const boxes = [
    {
      id: 1,
      title: 'Today Patients',
      value: '10',
      color: ['bg-subMain', 'text-subMain'],
      icon: BiTime,
    },
    {
      id: 2,
      title: 'Monthly Patients',
      value: '230',
      color: ['bg-orange-500', 'text-orange-500'],
      icon: BsCalendarMonth,
    },
    {
      id: 3,
      title: 'Yearly Patients',
      value: '1,500',
      color: ['bg-green-500', 'text-green-500'],
      icon: MdOutlineCalendarMonth,
    },
  ];

  // preview
  const previewPayment = (id) => {
    navigate(`/A.patients/preview/${id}`);
  };

  return (
    <Layout>
      <h1 className="text-xl font-semibold">Patients</h1>
      {/* boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {boxes.map((box) => (
          <div
            key={box.id}
            className="bg-white flex-btn gap-4 rounded-xl border-[1px] border-border p-5"
          >
            <div className="w-3/4">
              <h2 className="text-sm font-medium">{box.title}</h2>
              <h2 className="text-xl my-6 font-medium">{box.value}</h2>
              <p className="text-xs text-textGray">
                Total Patients <span className={box.color[1]}>{box.value}</span>{' '}
                {box.title === 'Today Patients'
                  ? 'today'
                  : box.title === 'Monthly Patients'
                  ? 'this month'
                  : 'this year'}
              </p>
            </div>
            <div
              className={`w-10 h-10 flex-colo rounded-md text-white text-md ${box.color[0]}`}
            >
              <box.icon />
            </div>
          </div>
        ))}
      </div>
      {/* datas */}
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="100"
        data-aos-offset="200"
        className="bg-white my-8 rounded-xl border-[1px] border-border p-5"
      >
        {/* datas */}

        <div className="grid md:grid-cols-6 sm:grid-cols-2 grid-cols-1 gap-2">
          <div className="md:col-span-5 grid lg:grid-cols-4 items-center gap-6">
            <input
              type="text"
              placeholder='Search'
              className="h-14 w-full text-sm text-main rounded-md bg-dry border border-border px-4"
            />
          </div>

          {/* export */}
          <Button
            label="Export"
            Icon={MdOutlineCloudDownload}
            onClick={() => {
              toast.error('Exporting is not available yet');
            }}
          />
        </div>
        <div className="mt-8 w-full overflow-x-scroll">
          <APatientTable
            data={memberData}
            functions={{
              preview: previewPayment,
            }}
            used={false}
          />
        </div>
      </div>
    </Layout>
  );
}

export default APatients;
