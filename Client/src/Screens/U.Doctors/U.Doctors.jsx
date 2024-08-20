import React from "react";
import { UDoctorsTable } from "../../Components/Tables/U.DoctorTable";
import { doctorsData } from "../../Components/Datas";
import { useNavigate } from "react-router-dom";
import Layout from "../../Layout/UserLayout/U.index";

function UDoctors() {
  const navigate = useNavigate();

  const preview = (data) => {
    navigate(`/D.doctors/preview/${data.id}`);
  };

  return (
    <Layout>
      <h1 className="text-xl font-semibold">Doctors</h1>
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="100"
        data-aos-offset="200"
        className="bg-white my-8 rounded-xl border-[1px] border-border p-5"
      >
        <div className="w-full mt-8 overflow-x-scroll">
          <UDoctorsTable
            doctor={true}
            data={doctorsData}
            functions={{
              preview: preview,
            }}
          />
        </div>
      </div>
    </Layout>
  );
}

export default UDoctors;
