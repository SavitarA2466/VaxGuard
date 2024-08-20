import React, { useState } from 'react';
import Layout from '../../Layout/UserLayout/U.index';
import { memberData, sortsDatas } from '../../Components/Datas';
import { Link, useNavigate } from 'react-router-dom';
import { BiChevronDown, BiPlus, BiTime } from 'react-icons/bi';
import { BsCalendarMonth } from 'react-icons/bs';
import { MdFilterList, MdOutlineCalendarMonth } from 'react-icons/md';
import { toast } from 'react-hot-toast';
import { Button, FromToDate, Select } from '../../Components/Form';
import { UChildTable } from '../../Components/Tables/U.ChildTable';

function UPatients() {
  const [status, setStatus] = useState(sortsDatas.filterPatient[0]);
  const [gender, setGender] = useState(sortsDatas.genderFilter[0]);
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [startDate, endDate] = dateRange;
  const navigate = useNavigate();


  // preview
  const preview = (id) => {
    navigate(`/Child/profile/${id}`);
  };

  return (
    <Layout>
      {/* add button */}
      <Link
        to="/Child/create"
        className="w-16 animate-bounce h-16 border border-border z-50 bg-subMain text-white rounded-full flex-colo fixed bottom-8 right-12 button-fb"
      >
        <BiPlus className="text-2xl" />
      </Link>
      <h1 className="text-xl font-semibold">Childs</h1>
      {/* datas */}
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="10"
        data-aos-offset="200"
        className="bg-white my-8 rounded-xl border-[1px] border-border p-5"
      >
        <div className="mt-8 w-full overflow-x-scroll">
          <UChildTable
            data={memberData}
            functions={{
              preview:preview,
            }}
            used={false}
          />
        </div>
      </div>
    </Layout>
  );
}

export default UPatients;
