import React from "react";
import { Button } from "../../Components/Form";
import { BiPlus } from "react-icons/bi";
import { FiEye } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { RiDeleteBin6Line } from "react-icons/ri";
import DMedicalRecodModal from "../../Components/Modals/D.MedicalRecodModal";
import { useNavigate, useParams } from "react-router-dom";
import { useDoctorsAll } from "../../hooks/useDocotorAll";

const medicalRecodData = [
  {
    id: 1,
    date: "13, Jan 2021",
    data: [
      {
        id: 1,
        title: "Doctor",
        value: ".......",
      },
      {
        id: 2,
        title: "Service",
        value: "0 - 4 Weeks",
      },
      {
        id: 4,
        title: "Description",
        value: "..",
      },
    ],
  },
];

function DMedicalRecord() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [datas, setDatas] = React.useState({});
  const navigate = useNavigate();

  const params = useParams();

  const { data } = useDoctorsAll();

  const child =
    data && data.map((d) => d.child).find((c) => c._id === params.id);

  return (
    <>
      {
        // Modal
        isOpen && (
          <DMedicalRecodModal
            closeModal={() => {
              setIsOpen(false);
              setDatas({});
            }}
            isOpen={isOpen}
            datas={datas}
          />
        )
      }
      <div className="flex flex-col gap-6">
        <div className="gap-4 flex-btn">
          <h1 className="hidden text-sm font-medium sm:block">
            Medical Record
          </h1>
          <div className="w-full sm:w-1/4">
            <Button
              label="New Record"
              Icon={BiPlus}
              onClick={() => {
                navigate(`/D.patients/visiting/${params.id}`);
              }}
            />
          </div>
        </div>
        {medicalRecodData.map((data) => (
          <div
            key={data.id}
            className="bg-dry items-start grid grid-cols-12 gap-4 rounded-xl border-[1px] border-border p-6"
          >
            <div className="col-span-12 md:col-span-2">
              <p className="text-xs font-medium text-textGray">{data.date}</p>
            </div>
            <div className="flex flex-col col-span-12 gap-2 md:col-span-6">
              {data?.data?.map((item, index) => (
                <p key={item.id} className="text-xs font-light text-main">
                  <span className="font-medium">{item?.title}:</span>{" "}
                  {
                    // if value character is more than 40, show only 40 characters
                    item?.value?.length > 40
                      ? `${item?.value?.slice(0, 40)}...`
                      : item?.value
                  }
                </p>
              ))}
            </div>
            {/* actions */}
            <div className="col-span-12 gap-2 md:col-span-2 flex-rows">
              <button
                onClick={() => {
                  setIsOpen(true);
                  setDatas(data);
                }}
                className="w-2/4 h-10 text-sm bg-white border rounded-md flex-colo text-subMain border-border md:w-10"
              >
                <FiEye />
              </button>
              <button
                onClick={() => {
                  toast.error("This feature is not available yet");
                }}
                className="w-2/4 h-10 text-sm text-red-600 bg-white border rounded-md flex-colo border-border md:w-10"
              >
                <RiDeleteBin6Line />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default DMedicalRecord;
