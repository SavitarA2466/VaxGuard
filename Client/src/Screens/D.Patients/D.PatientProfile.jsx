import React from 'react';
import Layout from '../../Layout/DoctorLayout/D.index';
import { DpatientTab } from '../../Components/Datas';
import { Link } from 'react-router-dom';
import { IoArrowBackOutline } from 'react-icons/io5';
import DMedicalRecord from './D.MedicalRecord';
import DAppointmentsUsed from '../../Components/UsedComp/D.AppointmentsUsed';
import DPersonalInfo from '../../Components/UsedComp/D.PersonalInfo';
import DPatientImages from './D.PatientImages';
import DHealthInfomation from './D.HealthInfomation';

function DPatientProfile() {
  const [activeTab, setActiveTab] = React.useState(1);

  const tabPanel = () => {
    switch (activeTab) {
      case 1:
        return <DMedicalRecord />;
      case 2:
        return <DAppointmentsUsed doctor={false} />;
      case 3:
        return <DPatientImages />;
      case 4:
        return <DPersonalInfo titles={false} />;
      case 5:
        return <DHealthInfomation />;
      default:
        return;
    }
  };

  return (
    <Layout>
      <div className="flex items-center gap-4">
        <Link
          to="/D.patients"
          className="bg-white border border-subMain border-dashed rounded-lg py-3 px-4 text-md"
        >
          <IoArrowBackOutline />
        </Link>
        <h1 className="text-xl font-semibold">Amani Mmassy</h1>
      </div>
      <div className=" grid grid-cols-12 gap-6 my-8 items-start">
        <div
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-delay="100"
          data-aos-offset="200"
          className="col-span-12 flex-colo gap-6 lg:col-span-4 bg-white rounded-xl border-[1px] border-border p-6 lg:sticky top-28"
        >
          <div className="gap-2 flex-colo">
            <h2 className="text-sm font-semibold">Amani Mmassy</h2>
            <p className="text-xs text-textGray">amanimmassy@gmail.com</p>
            <p className="text-xs">+254 712 345 678</p>
          </div>
          {/* tabs */}
          <div className="flex-colo gap-3 px-2 xl:px-12 w-full">
            {DpatientTab.map((tab, index) => (
              <button
                onClick={() => setActiveTab(tab.id)}
                key={index}
                className={`
                ${
                  activeTab === tab.id
                    ? 'bg-text text-subMain'
                    : 'bg-dry text-main hover:bg-text hover:text-subMain'
                }
                text-xs gap-4 flex items-center w-full p-4 rounded`}
              >
                <tab.icon className="text-lg" /> {tab.title}
              </button>
            ))}
          </div>
        </div>
        {/* tab panel */}
        <div
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-delay="100"
          data-aos-offset="200"
          className="col-span-12 lg:col-span-8 bg-white rounded-xl border-[1px] border-border p-6"
        >
          {tabPanel()}
        </div>
      </div>
    </Layout>
  );
}

export default DPatientProfile;
