import React, { useEffect } from 'react';
// Importing Modal, icon, and EmailComp components
import Modal from './Modal';
import { TbBrandWhatsapp } from 'react-icons/tb';
import EmailComp from '../Announcement/EmailComp';

// Functional component AnnouncementModal
function AnnouncementModal({ closeModal, isOpen, data }) {
  // State to track the active tab
  const [indexs, setIndexs] = React.useState(0);

  // Function to change the active tab
  const changeTab = (value) => {
    setIndexs(value);
  };

  // Tabs array with title, value, and icon
  const tabs = [
    {
      title: 'Email',
      value: 'email',
      icon: TbBrandWhatsapp,
    },
  ];

  // useEffect to set the active tab based on `data`
  useEffect(() => {
    if (data?.id) {
      if (data?.type === 'email') {
        setIndexs(0);
      }
    }
  }, [data]); // Dependency array includes `data`

  return (
    // Modal component with props passed in
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      title={data?.id ? 'View Announcement' : 'Create Announcement'}
      width={'max-w-3xl'}
    >
      <div className="flex-colo gap-6">
        {/* Conditional rendering of the tabs if data does not have an id */}
        {!data?.id && (
          <div className="grid sm:grid-cols-3 gap-4 w-full bg-dry rounded-md sm:rounded-full overflow-hidden">
            {/* Mapping over tabs to create tab buttons */}
            {tabs.map((item, index) => (
              <button
                onClick={() => changeTab(index)}
                key={index}
                className={`flex gap-4 items-center p-2 rounded-full 
              ${
                indexs === 0 && item.value === 'email'
                  ? 'bg-subMain text-white'
                  : 'text-black'
              }`}
              >
                <div
                  className={`
              ${
                indexs === 0 && item.value === 'email'
                  ? 'bg-white text-black'
                  : 'bg-white'
              } w-10 h-10 text-md rounded-full flex-colo`}
                >
                  <item.icon />
                </div>
                <h5 className="text-xs font-medium">{item.title}</h5>
              </button>
            ))}
          </div>
        )}

        {/* Conditional rendering of EmailComp based on active tab */}
        {indexs === 0 && <EmailComp data={data} />}
      </div>
    </Modal>
  );
}

// Exporting AnnouncementModal as default export
export default AnnouncementModal;
