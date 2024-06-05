import React, { useState, useEffect } from 'react';
import { MdOutlineCloudDownload } from 'react-icons/md';
import { toast } from 'react-hot-toast';
import { BiPlus } from 'react-icons/bi';
import Layout from '../../Layout/AdminLayout/A.index';
import { Button } from '../../Components/Form';
import { ADoctorsTable } from '../../Components/Tables';
import { useNavigate } from 'react-router-dom';
import AAddDoctorModal from '../../Components/Modals/A.AddDoctorModal';
import axios from 'axios';

function ADoctors() {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);

  const onCloseModal = () => {
    setIsOpen(false);
  };

  const preview = (data) => {
    navigate(`/A.doctors/preview/${data.id}`);
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/doctors');
        setDoctors(response.data);
      } catch (error) {
        toast.error('Error fetching doctors');
      }
    };

    fetchDoctors();
  }, []);

  return (
    <Layout>
      {
        // add doctor modal
        isOpen && (
          <AAddDoctorModal
            closeModal={onCloseModal}
            isOpen={isOpen}
            doctor={true}
            datas={null}
          />
        )
      }
      {/* add button */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-16 animate-bounce h-16 border border-border z-50 bg-subMain text-white rounded-full flex-colo fixed bottom-8 right-12 button-fb"
      >
        <BiPlus className="text-2xl" />
      </button>
      {/*  */}
      <h1 className="text-xl font-semibold">Doctors</h1>
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="100"
        data-aos-offset="200"
        className="bg-white my-8 rounded-xl border-[1px] border-border p-5"
      >
        {/* datas */}

        <div className="grid md:grid-cols-6 sm:grid-cols-2 grid-cols-1 gap-2">
          <div className="md:col-span-5 grid lg:grid-cols-4 items-center gap-6">
            <input
              type="text"
              placeholder='Search'
              className="h-14 w-full text-sm text-main rounded-md bg-dry border border-border px-4"
            />
          </div>

          {/* export */}
          <Button
            label="Export"
            Icon={MdOutlineCloudDownload}
            onClick={() => {
              toast.error('Exporting is not available yet');
            }}
          />
        </div>
        <div className="mt-8 w-full overflow-x-scroll">
          <ADoctorsTable
            doctor={true}
            data={doctors}
            functions={{
              preview: preview,
            }}
          />
        </div>
      </div>
    </Layout>
  );
}

export default ADoctors;
