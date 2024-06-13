import React, { useState, useEffect } from 'react';
import Layout from '../../Layout/UserLayout/U.index';
import { UpatientTab } from '../../Components/Datas';
import { Link, useParams } from 'react-router-dom';
import { IoArrowBackOutline } from 'react-icons/io5';
import ChildMedicalRecord from './ChildMedicalRecord';
import UAppointmentsUsed from '../../Components/UsedComp/U.AppointmentsUsed';
import UPersonalInfo from '../../Components/UsedComp/U.PersonalInfo';
import ChildImages from './ChildImages';
import ChildHealthInfomation from './ChildHealthInfomation';
import axios from 'axios';
import { toast } from 'react-hot-toast';

function ChildProfile() {
  const [activeTab, setActiveTab] = useState(1);
  const { id } = useParams();
  const [child, setChild] = useState(null);

  useEffect(() => {
    const fetchChild = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/children/${id}`);
        setChild(response.data);
      } catch (error) {
        console.error('Error fetching child:', error);
        toast.error('Failed to fetch child data');
      }
    };

    fetchChild();
  }, [id]);

  const tabPanel = () => {
    switch (activeTab) {
      case 1:
        return <ChildMedicalRecord />;
      case 2:
        return <UAppointmentsUsed doctor={false} />;
      case 3:
        return <ChildImages />;
      default:
        return;
    }
  };

  if (!child) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="flex items-center gap-4">
        <Link
          to="/child"
          className="bg-white border border-subMain border-dashed rounded-lg py-3 px-4 text-md"
        >
          <IoArrowBackOutline />
        </Link>
        <h1 className="text-xl font-semibold">{child.fullName}</h1>
      </div>
      <div className="grid grid-cols-12 gap-6 my-8 items-start">
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
            <h2 className="text-sm font-semibold">{child.fullName}</h2>
          </div>
          {/* tabs */}
          <div className="flex-colo gap-3 px-2 xl:px-12 w-full">
            {UpatientTab.map((tab, index) => (
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

export default ChildProfile;
