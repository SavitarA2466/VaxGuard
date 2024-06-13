import React, { useState, useEffect } from 'react';
import Layout from '../Layout/UserLayout/U.index';
import { BiUserPlus } from 'react-icons/bi';
import { RiLockPasswordLine } from 'react-icons/ri';
import UPersonalInfo from '../Components/UsedComp/U.PersonalInfo';
import ChangePassword from '../Components/UsedComp/ChangePassword';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';

function USettings() {
  const [activeTab, setActiveTab] = useState(1);
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/users/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
        toast.error('Failed to fetch user data');
      }
    };

    fetchUser();
  }, [id]);

  const tabs = [
    {
      id: 1,
      name: 'Personal Information',
      icon: BiUserPlus,
    },
    {
      id: 2,
      name: 'Change Password',
      icon: RiLockPasswordLine,
    },
  ];

  const tabPanel = () => {
    switch (activeTab) {
      case 1:
        return <UPersonalInfo titles={true} />;
      case 2:
        return <ChangePassword />;
      default:
        return;
    }
  };

  return (
    <Layout>
      <h1 className="text-xl font-semibold">Settings</h1>
      <div className="grid grid-cols-12 gap-6 my-8 items-start">
        <div
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-delay="100"
          data-aos-offset="200"
          className="col-span-12 flex-colo gap-6 lg:col-span-4 bg-white rounded-xl border-[1px] border-border p-6 lg:sticky top-28"
        >
          {user ? (
            <div className="gap-2 flex-colo">
              <h2 className="text-sm font-semibold">{user.firstName}</h2>
              <p className="text-xs text-textGray">{user.email}</p>
              <p className="text-xs">{user.phoneNumber}</p>
            </div>
          ) : (
            <p>Loading...</p> 
          )}
          <div className="flex-colo gap-3 px-2 xl:px-12 w-full">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-xs gap-4 flex items-center w-full p-4 rounded ${
                  activeTab === tab.id
                    ? 'bg-text text-subMain'
                    : 'bg-dry text-main hover:bg-text hover:text-subMain'
                }`}
              >
                <tab.icon className="text-lg" /> {tab.name}
              </button>
            ))}
          </div>
        </div>
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

export default USettings;
