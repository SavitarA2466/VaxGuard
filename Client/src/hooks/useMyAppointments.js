import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useGlobalStore from "../globalStore";
import moment from "moment";

const eventsModifier = (a) => {
  return {
    id: a._id,
    start: moment({
      date: new Date(a.dateOfVisit).getDate(),
      hour: new Date(a.startTime).getHours(),
    }).toDate(),
    allDay: true,
    end: moment({ date: new Date(a.dateOfVisit).getDate() }).toDate(),
    color: "#FB923C",
    title: a.child.fullName,
    message: a.doctor.fullName,
    service: {
      id: a.purposeOfVisit._id,
      name: a.purposeOfVisit.name,
    },
    shareData: {
      email: true,
      sms: true,
      whatsapp: false,
    },
  };
};

export const useMyAppointments = () => {
  const { user } = useGlobalStore();

  async function fetchData() {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/appointments/mine/" + user._id
      );
      return response.data.map((d) => eventsModifier(d));
    } catch (error) {
      console.error("Error fetching doctors:", error);
      return [];
    }
  }

  return useQuery({
    queryKey: ["my_appointments"],
    queryFn: fetchData,
  });
};
