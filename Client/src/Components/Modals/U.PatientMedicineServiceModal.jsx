import React, { useState } from "react";
import Modal from "./Modal";
import { BiSearch, BiPlus } from "react-icons/bi";
import { memberData } from "../Datas";
import { RadioGroup } from "@headlessui/react";
import { Button } from "../Form";
import { useMyChildren } from "../../hooks/useMyChildren";

function UPatientMedicineServiceModal({ closeModal, isOpen, patient }) {
  const [selected, setSelected] = useState(memberData[0]);
  const { data: myChildren } = useMyChildren();

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      title={patient ? "Patients" : "Medicine & Services"}
      width={"max-w-xl"}
    >
      <div className="gap-6 flex-colo">
        {/* search */}
        <div className="flex items-center w-full gap-4 p-3 border rounded-lg border-border">
          <input type="text" placeholder="Search" className="w-full" />
          <BiSearch className="text-xl " />
        </div>
        {/* data */}
        <div className="w-full h-[500px] overflow-y-scroll">
          <RadioGroup value={selected} onChange={setSelected}>
            <div className="space-y-2">
              {myChildren &&
                myChildren.map((user) => (
                  <RadioGroup.Option
                    key={user._id}
                    value={user}
                    className={({ active, checked }) =>
                      `
                    ${active ? "border-subMain bg-subMain text-white" : ""}
                    rounded-xl border-[1px] border-border p-4 group hover:bg-subMain hover:text-white`
                    }
                  >
                    {({ active, checked }) => (
                      <>
                        <h6 className="text-sm">{user.fullName}</h6>
                        {patient && (
                          <p
                            className={`${
                              active && "text-white"
                            } text-xs group-hover:text-white text-textGray mt-1`}
                          >
                            {user.dateOfBirth}
                          </p>
                        )}
                      </>
                    )}
                  </RadioGroup.Option>
                ))}
            </div>
          </RadioGroup>
        </div>
        {/* button */}

        <Button onClick={closeModal} label="Add" Icon={BiPlus} />
      </div>
    </Modal>
  );
}

export default UPatientMedicineServiceModal;
