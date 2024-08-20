import React, { useState } from "react"; // Import React and useState hook
import Modal from "./Modal"; // Import custom Modal component
import { BiSearch, BiPlus } from "react-icons/bi"; // Import search and plus icons
import { memberData } from "../Datas"; // Import static member data
import { RadioGroup } from "@headlessui/react"; // Import RadioGroup from Headless UI for radio button functionality
import { Button } from "../Form"; // Import custom Button component
import { useMyChildren } from "../../hooks/useMyChildren"; // Import custom hook to fetch children data

function UPatientMedicineServiceModal({ closeModal, isOpen, patient }) {
  const [selected, setSelected] = useState(memberData[0]); // State to manage the currently selected option
  const { data: myChildren } = useMyChildren(); // Fetch children data using custom hook

  return (
    <Modal
      closeModal={closeModal} // Function to close the modal
      isOpen={isOpen} // Modal open/close state
      title={patient ? "Patients" : "Medicine & Services"} // Modal title based on the `patient` prop
      width={"max-w-xl"} // Modal width
    >
      <div className="gap-6 flex-colo">
        {/* Search input */}
        <div className="flex items-center w-full gap-4 p-3 border rounded-lg border-border">
          <input type="text" placeholder="Search" className="w-full" /> {/* Input field for search */}
          <BiSearch className="text-xl " /> {/* Search icon */}
        </div>

        {/* Data list */}
        <div className="w-full h-[500px] overflow-y-scroll">
          <RadioGroup value={selected} onChange={setSelected}> {/* RadioGroup to manage selection */}
            <div className="space-y-2">
              {myChildren && // Check if myChildren data exists
                myChildren.map((user) => (
                  <RadioGroup.Option
                    key={user._id} // Unique key for each option
                    value={user} // Value for each radio option
                    className={({ active, checked }) =>
                      `
                      ${active ? "border-subMain bg-subMain text-white" : ""}
                      rounded-xl border-[1px] border-border p-4 group hover:bg-subMain hover:text-white`
                    } // Conditional styling based on active/checked state
                  >
                    {({ active, checked }) => (
                      <>
                        <h6 className="text-sm">{user.fullName}</h6> {/* Display user full name */}
                        {patient && (
                          <p
                            className={`${
                              active && "text-white"
                            } text-xs group-hover:text-white text-textGray mt-1`}
                          >
                            {user.dateOfBirth} {/* Display user date of birth if `patient` is true */}
                          </p>
                        )}
                      </>
                    )}
                  </RadioGroup.Option>
                ))}
            </div>
          </RadioGroup>
        </div>

        {/* Button to close modal */}
        <Button onClick={closeModal} label="Add" Icon={BiPlus} />
      </div>
    </Modal>
  );
}

export default UPatientMedicineServiceModal;
