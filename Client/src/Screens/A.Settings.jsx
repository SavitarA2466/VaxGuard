import React from 'react';
import Layout from '../Layout/AdminLayout/A.index';
import { BiUserPlus } from 'react-icons/bi';
import { RiLockPasswordLine } from 'react-icons/ri';
import APersonalInfo from '../Components/UsedComp/A.PersonalInfo';
import ChangePassword from '../Components/UsedComp/ChangePassword';

function ASettings() {
  const [activeTab, setActiveTab] = React.useState(1);
  const tabs = [
    {
      id: 1,
      name: 'Change Password',
      icon: RiLockPasswordLine,
    },
  ];

  const tabPanel = () => {
    switch (activeTab) {
      case 1:
        return <ChangePassword />;
      default:
        return;
    }
  };

  return (
    <Layout>
      <h1 className="text-xl font-semibold">Settings</h1>
      <div className=" grid grid-cols-12 gap-6 my-8 items-start">
        <div
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-delay="100"
          data-aos-offset="200"
          className="col-span-12 flex-colo gap-6 lg:col-span-4 bg-white rounded-xl border-[1px] border-border p-6 lg:sticky top-28"
        >
          <div className="gap-2 flex-colo">
            <h2 className="text-sm font-semibold">Admin</h2>
            <p className="text-xs text-textGray">admin@gmail.com</p>
          </div>
          {/* tabs */}
          <div className="flex-colo gap-3 px-2 xl:px-12 w-full">
            {tabs.map((tab, index) => (
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
                <tab.icon className="text-lg" /> {tab.name}
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

export default ASettings;
