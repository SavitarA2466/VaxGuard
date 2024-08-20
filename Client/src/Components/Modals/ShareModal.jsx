import React, { useState } from 'react'; // Import React and useState hook
import Modal from './Modal'; // Import the Modal component
import { shareData } from '../Datas'; // Import shareData which contains data for sharing options
import { RadioGroup } from '@headlessui/react'; // Import RadioGroup component from Headless UI for radio button functionality
import { Button } from './Form'; // Import Button component for actions
import { toast } from 'react-hot-toast'; // Import toast for showing notifications

// Define the ShareModal component
function ShareModal({ closeModal, isOpen }) {
  const [selected, setSelected] = useState(); // State to keep track of selected sharing option
  
  return (
    <Modal
      closeModal={closeModal} // Function to close the modal
      isOpen={isOpen} // Boolean to control modal visibility
      title="Share with patient via" // Title of the modal
      width={'max-w-xl'} // Width of the modal
    >
      <div className="flex-colo gap-6">
        {/* Data section for sharing options */}
        <div className="w-full">
          <RadioGroup value={selected} onChange={setSelected}>
            <div className="space-y-2">
              {/* Map over shareData to create RadioGroup.Option for each sharing option */}
              {shareData.map((user) => (
                <RadioGroup.Option
                  key={user.id} // Unique key for each option
                  value={user} // Value to be set on selection
                  className={({ active, checked }) =>
                    `
                    ${active ? 'border-subMain bg-subMain text-white' : ''}
                    rounded-xl border-[1px] border-border p-4 group hover:bg-subMain hover:text-white`
                  }
                >
                  {({ active, checked }) => (
                    <div className="flex gap-6 items-center">
                      {/* Icon container */}
                      <div className="w-12 h-12 bg-text rounded-full flex-colo">
                        <user.icon className="text-subMain text-xl" /> {/* Icon for the option */}
                      </div>
                      <div>
                        <h6 className="text-sm">{user.title}</h6> {/* Title of the option */}
                        <p
                          className={`${
                            active && 'text-white'
                          } text-xs group-hover:text-white text-textGray mt-1`}
                        >
                          {user.description} {/* Description of the option */}
                        </p>
                      </div>
                    </div>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </div>
        {/* Button to trigger an action */}
        <Button
          onClick={() => {
            toast.error('This feature is not available yet'); // Show an error toast
            closeModal(); // Close the modal
          }}
          label="Send" // Label for the button
        />
      </div>
    </Modal>
  );
}

export default ShareModal;
