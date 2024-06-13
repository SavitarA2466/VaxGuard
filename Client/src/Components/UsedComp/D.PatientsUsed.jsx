import React from 'react';
import { DPatientTable } from '../Tables/D.PatientTable';
import { useNavigate } from 'react-router-dom';
import { memberData } from '../Datas';

function DPatientsUsed() {
  const navigate = useNavigate();
  // preview
  const preview = (id) => {
    navigate(`/D.patients/preview/${id}`);
  };
  return (
    <div className="w-full">
      <h1 className="text-sm font-medium mb-6">Patients</h1>
      <div className="w-full overflow-x-scroll">
        <DPatientTable
          used={true}
          data={memberData}
          functions={{
            preview: preview,
          }}
        />
      </div>
    </div>
  );
}

export default DPatientsUsed;
