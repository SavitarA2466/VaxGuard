import React from "react";
import Layout from "../Layout/AdminLayout/A.index";
import {
  BsArrowDownLeft,
  BsArrowDownRight,
  BsArrowUpRight,
  BsCheckCircleFill,
  BsClockFill,
  BsXCircleFill,
} from "react-icons/bs";
import { DashboardBigChart, DashboardSmallChart } from "../Components/Charts";
import {
  appointmentsData,
  dashboardCards,
  memberData,
  medicineData,
} from "../Components/Datas";
import { VaccineTable } from "../Components/Tables/VaccineTable";
import { Link } from "react-router-dom";
import { useRecentPatient } from "../hooks/useRecentPatient";

function AdminDashboard() {
  const { data: recent_children } = useRecentPatient();
  return (
    <Layout>
      {/* boxes */}
      <div className="grid w-full grid-cols-1 gap-6 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2">
        {dashboardCards.map((card, index) => (
          <div
            key={card.id}
            className=" bg-white rounded-xl border-[1px] border-border p-5"
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-10 h-10 flex-colo bg-opacity-10 rounded-md ${card.color[1]} ${card.color[0]}`}
              >
                <card.icon />
              </div>
              <h2 className="text-sm font-medium">{card.title}</h2>
            </div>
            <div className="grid items-center grid-cols-8 gap-4 px-8 py-5 mt-4 bg-dry rounded-xl">
              <div className="col-span-5">
                {/* statistc */}
                <DashboardSmallChart data={card.datas} colors={card.color[2]} />
              </div>
              <div className="flex flex-col col-span-3 gap-4">
                <h4 className="font-medium text-md">
                  {card.value}
                  {
                    // if the id === 4 then add the $ sign
                    card.id === 4 ? "$" : "+"
                  }
                </h4>
                <p className={`text-sm flex gap-2 ${card.color[1]}`}>
                  {card.percent > 50 && <BsArrowUpRight />}
                  {card.percent > 30 && card.percent < 50 && (
                    <BsArrowDownRight />
                  )}
                  {card.percent < 30 && <BsArrowDownLeft />}
                  {card.percent}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid w-full grid-cols-1 gap-6 my-6 xl:grid-cols-8">
        <div className="w-full xl:col-span-6">
          <div className="bg-white rounded-xl border-[1px] border-border p-5">
            <div className="gap-2 flex-btn">
              <h2 className="text-sm font-medium">Total Patients Reports</h2>
              <p className="flex items-center gap-4 text-sm">
                5.44%{" "}
                <span className="px-2 py-1 text-xs text-white bg-subMain rounded-xl">
                  +2.4%
                </span>
              </p>
            </div>
            {/* Earning Reports */}
            <div className="mt-4">
              <DashboardBigChart />
            </div>
          </div>
          {/* Vaccine Availability */}
          <div className="mt-6 bg-white rounded-xl border-[1px] border-border p-5">
            <div className="gap-2 flex-btn">
              <h2 className="text-sm font-medium">Vaccine Availability</h2>
            </div>
            {/* table */}
            <div className="w-full mt-8 overflow-x-scroll">
              <VaccineTable data={medicineData} />
            </div>
          </div>
        </div>
        {/* side 2 */}
        <div
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-delay="10"
          data-aos-offset="200"
          className="grid gap-6 xl:col-span-2 xl:block sm:grid-cols-2"
        >
          {/* recent patients */}
          <div className="bg-white rounded-xl border-[1px] border-border p-5">
            <h2 className="text-sm font-medium">Recent Patients</h2>
            {recent_children &&
              recent_children.map((member, index) => (
                <Link
                  to={`/A.patients/preview/${member.id}`}
                  key={index}
                  className="gap-4 pb-4 mt-6 border-b flex-btn border-border"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col gap-1">
                      <h3 className="text-xs font-medium">{member.name}</h3>
                      <p className="text-xs text-gray-400">{member.phone}</p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
          {/* today apointments */}
          <div className="bg-white rounded-xl border-[1px] border-border p-5 xl:mt-6">
            <h2 className="mb-4 text-sm font-medium">Today Appointments</h2>
            {appointmentsData.map((appointment, index) => (
              <div
                key={appointment.id}
                className="grid items-center grid-cols-12 gap-2"
              >
                <p className="text-textGray text-[12px] col-span-3 font-light">
                  {appointment.time}
                </p>
                <div className="relative col-span-2 flex-colo">
                  <hr className="w-[2px] h-20 bg-border" />
                  <div
                    className={`w-7 h-7 flex-colo text-sm bg-opacity-10
                   ${
                     appointment.status === "Pending" &&
                     "bg-orange-500 text-orange-500"
                   }
                  ${
                    appointment.status === "Cancel" && "bg-red-500 text-red-500"
                  }
                  ${
                    appointment.status === "Approved" &&
                    "bg-green-500 text-green-500"
                  }
                   rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
                  >
                    {appointment.status === "Pending" && <BsClockFill />}
                    {appointment.status === "Cancel" && <BsXCircleFill />}
                    {appointment.status === "Approved" && <BsCheckCircleFill />}
                  </div>
                </div>
                <Link
                  to="/appointments"
                  className="flex flex-col col-span-6 gap-1"
                >
                  <h2 className="text-xs font-medium">
                    {appointment.user?.title}
                  </h2>
                  <p className="text-[12px] font-light text-textGray">
                    {appointment.from} - {appointment.to}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AdminDashboard;
