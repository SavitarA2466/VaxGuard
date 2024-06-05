import React from 'react';
import { MdOutlineCloudDownload } from 'react-icons/md';
import { toast } from 'react-hot-toast';
import { BiPlus } from 'react-icons/bi';
import Layout from '../../Layout/UserLayout/U.index';
import { Button } from '../../Components/Form';
import { UDoctorsTable } from '../../Components/Tables';
import { doctorsData } from '../../Components/Datas';
import { useNavigate } from 'react-router-dom';

function UDoctors() {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();

  const onCloseModal = () => {
    setIsOpen(false);
  };

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
        <div className="mt-8 w-full overflow-x-scroll">
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
