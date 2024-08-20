import React from "react";
import Layout from "../Layout/AdminLayout/A.index";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { BiChevronLeft, BiChevronRight, BiPlus, BiTime } from "react-icons/bi";
import { HiOutlineViewGrid } from "react-icons/hi";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import AAddAppointmentModal from "../Components/Modals/A.AddApointmentModal";
import { useAppointments } from "../hooks/useAppointments";

// custom toolbar
const CustomToolbar = (toolbar) => {
  // today button handler
  const goToBack = () => {
    toolbar.date.setMonth(toolbar.date.getMonth() - 1);
    toolbar.onNavigate("prev");
  };

  // next button handler
  const goToNext = () => {
    toolbar.date.setMonth(toolbar.date.getMonth() + 1);
    toolbar.onNavigate("next");
  };

  // today button handler
  const goToCurrent = () => {
    toolbar.onNavigate("TODAY");
  };

  // month button handler
  const goToMonth = () => {
    toolbar.onView("month");
  };

  // week button handler
  const goToWeek = () => {
    toolbar.onView("week");
  };

  // day button handler
  const goToDay = () => {
    toolbar.onView("day");
  };

  // view button group
  const viewNamesGroup = [
    { view: "month", label: "Month" },
    { view: "week", label: "Week" },
    { view: "day", label: "Day" },
  ];

  return (
    <div className="flex flex-col gap-8 mb-8">
      <h1 className="text-xl font-semibold">Appointments</h1>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-12">
        <div className="flex items-center justify-center md:col-span-1 sm:justify-start">
          <button
            onClick={goToCurrent}
            className="px-6 py-2 border rounded-md border-subMain text-subMain"
          >
            Today
          </button>
        </div>
        {/* label */}
        <div className="gap-4 md:col-span-9 flex-rows">
          <button onClick={goToBack} className="text-2xl text-subMain">
            <BiChevronLeft />
          </button>
          <span className="text-xl font-semibold">
            {moment(toolbar.date).format("MMMM YYYY")}
          </span>
          <button onClick={goToNext} className="text-2xl text-subMain">
            <BiChevronRight />
          </button>
        </div>
        {/* filter */}
        <div className="grid grid-cols-3 border rounded-md md:col-span-2 border-subMain">
          {viewNamesGroup.map((item, index) => (
            <button
              key={index}
              onClick={
                item.view === "month"
                  ? goToMonth
                  : item.view === "week"
                  ? goToWeek
                  : goToDay
              }
              className={`border-l text-xl py-2 flex-colo border-subMain ${
                toolbar.view === item.view
                  ? "bg-subMain text-white"
                  : "text-subMain"
              }`}
            >
              {item.view === "month" ? (
                <HiOutlineViewGrid />
              ) : item.view === "week" ? (
                <HiOutlineCalendarDays />
              ) : (
                <BiTime />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

function AAppointments() {
  const localizer = momentLocalizer(moment);
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState({});

  // handle modal close
  const handleClose = () => {
    setOpen(!open);
    setData({});
  };

  const { data: events } = useAppointments();

  // onClick event handler
  const handleEventClick = (event) => {
    setData(event);
    setOpen(!open);
  };

  return (
    <Layout>
      {open && (
        <AAddAppointmentModal
          datas={data}
          isOpen={open}
          closeModal={() => {
            handleClose();
          }}
        />
      )}
      {/* calender */}
      <button
        onClick={handleClose}
        className="fixed z-50 w-16 h-16 text-white border rounded-full animate-bounce border-border bg-subMain flex-colo bottom-8 right-12 button-fb"
      >
        <BiPlus className="text-2xl" />
      </button>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{
          // height fix screen
          height: 900,
          marginBottom: 50,
        }}
        onSelectEvent={(event) => handleEventClick(event)}
        defaultDate={new Date()}
        timeslots={1}
        resizable
        step={60}
        selectable={true}
        // custom event style
        eventPropGetter={(event) => {
          const style = {
            backgroundColor: "#5ab2ff",

            borderRadius: "10px",
            color: "white",
            border: "1px",
            borderColor: "#F2FAF8",
            fontSize: "12px",
            padding: "5px 5px",
          };
          return {
            style,
          };
        }}
        // custom date style
        dayPropGetter={(date) => {
          const backgroundColor = "white";
          const style = {
            backgroundColor,
          };
          return {
            style,
          };
        }}
        // remove agenda view
        views={["month", "day", "week"]}
        // toolbar={false}
        components={{ toolbar: CustomToolbar }}
      />
    </Layout>
  );
}

export default AAppointments;
