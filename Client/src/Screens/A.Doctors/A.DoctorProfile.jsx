import React, { useState, useEffect } from 'react';
import Layout from '../../Layout/AdminLayout/A.index';
import ChangePassword from '../../Components/UsedComp/ChangePassword';
import { Link, useParams } from 'react-router-dom';
import { IoArrowBackOutline } from 'react-icons/io5';
import APatientsUsed from '../../Components/UsedComp/A.PatientsUsed';
import AAppointmentsUsed from '../../Components/UsedComp/A.AppointmentsUsed';
import { AdoctorTab } from '../../Components/Datas';
import axios from 'axios';
import { toast } from 'react-hot-toast';

function ADoctorProfile(props) {
  const { id } = useParams(); // Get the doctor ID from the URL
  const [activeTab, setActiveTab] = useState(1);
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    // Fetch the doctor data by ID when the component mounts
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/doctors/${id}`);
        setDoctor(response.data);
      } catch (error) {
        console.error('Error fetching doctor:', error);
        toast.error('Failed to fetch doctor data');
      }
    };

    fetchDoctor();
  }, [id]);

  const tabPanel = () => {
    switch (activeTab) {
      case 1:
        return <APatientsUsed />;
      case 2:
        return <AAppointmentsUsed doctor={true} />;
      case 3:
        return <ChangePassword />;
      default:
        return;
    }
  };

  if (!doctor) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="flex items-center gap-4">
        <Link
          to="/A.doctors"
          className="bg-white border border-subMain border-dashed rounded-lg py-3 px-4 text-md"
        >
          <IoArrowBackOutline />
        </Link>
        <h1 className="text-xl font-semibold">{doctor.fullName}</h1>
      </div>
      <div className="grid grid-cols-12 gap-6 my-8 items-start">
        <div
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-delay="100"
          data-aos-offset="200"
          className="col-span-12 flex-colo gap-6 lg:col-span-4 bg-white rounded-xl border-[1px] border-border p-6 lg:sticky top-28"
        >
          <div className="gap-2 flex-colo">
            <h2 className="text-sm font-semibold">{doctor.fullName}</h2>
            <p className="text-xs text-textGray">{doctor.email}</p>
            <p className="text-xs">{doctor.phoneNumber}</p>
          </div>
          {/* tabs */}
          <div className="flex-colo gap-3 px-2 2xl:px-12 w-full">
            {AdoctorTab.map((tab, index) => (
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

export default ADoctorProfile;

