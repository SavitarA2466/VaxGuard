import React, { useState, useEffect } from 'react';
import Layout from '../../Layout/AdminLayout/A.index';
import { ApatientTab } from '../../Components/Datas';
import { Link, useParams } from 'react-router-dom';
import { IoArrowBackOutline } from 'react-icons/io5';
import AMedicalRecord from './A.MedicalRecord';
import AAppointmentsUsed from '../../Components/UsedComp/A.AppointmentsUsed';
import APersonalInfo from '../../Components/UsedComp/A.PersonalInfo';
import APatientImages from './A.PatientImages';
import AHealthInfomation from './A.HealthInfomation';
import axios from 'axios';
import { toast } from 'react-hot-toast';

function APatientProfile() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = React.useState(1);
  const [child, setChild] = useState(null);

  useEffect(() => {
    const fetchChild = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/children/${id}`);
        setChild(response.data);
      } catch (error) {
        console.error('Error fetching Child:', error);
        toast.error('Failed to fetch Child data');
      }
    };

    fetchChild();
  }, [id]);

  const tabPanel = () => {
    switch (activeTab) {
      case 1:
        return <AMedicalRecord />;
      case 2:
        return <AAppointmentsUsed doctor={false} />;
      case 3:
        return <APatientImages />;
      case 4:
        return <APersonalInfo titles={false} />;
      case 5:
        return <AHealthInfomation />;
      default:
        return;
    }
  };

  return (
    <Layout>
      <div className="flex items-center gap-4">
        <Link
          to="/A.patients"
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
          <img
            src="/images/user7.png"
            alt="setting"
            className="w-40 h-40 rounded-full object-cover border border-dashed border-subMain"
          />
          <div className="gap-2 flex-colo">
            <h2 className="text-sm font-semibold">Amani Mmassy</h2>
            <p className="text-xs text-textGray">amanimmassy@gmail.com</p>
            <p className="text-xs">+254 712 345 678</p>
          </div>
          {/* tabs */}
          <div className="flex-colo gap-3 px-2 xl:px-12 w-full">
            {ApatientTab.map((tab, index) => (
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

export default APatientProfile;
