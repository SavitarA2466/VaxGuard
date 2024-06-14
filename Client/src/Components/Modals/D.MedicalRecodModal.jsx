import React from "react";
import Modal from "./Modal";
import { Button, Textarea } from "../Form";
import { VaccineDosageTable } from "../Tables/VaccineDosageTable";
import { medicineData } from "../Datas";
import { useNavigate } from "react-router-dom";

function DMedicalRecodModal({ closeModal, isOpen, datas }) {
  const navigate = useNavigate();
  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      title="12 May 2021"
      width={"max-w-4xl"}
    >
      <div className="gap-6 flex-colo">
        {datas?.data?.slice(0, 3).map((data) => (
          <div key={data.id} className="grid w-full grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-3">
              <p className="text-sm font-medium">{data.title}:</p>
            </div>
            <div className="col-span-12 md:col-span-9 border-[1px] border-border rounded-xl p-6">
              <p className="text-xs font-light leading-5 text-main">
                {data.value}
              </p>
            </div>
          </div>
        ))}

        <Textarea
          label="Description"
          placeholder="Write description here..."
          color={true}
          rows={5}
        />

        {/* medicine */}
        <div className="grid w-full grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-3">
            <p className="text-sm font-medium">Vaccine</p>
          </div>
          <div className="col-span-12 md:col-span-9 border-[1px] border-border rounded-xl overflow-hidden p-4">
            <VaccineDosageTable
              data={medicineData?.slice(0, 3)}
              functions={{}}
              button={false}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default DMedicalRecodModal;
