import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useGlobalStore from "../globalStore";
import moment from "moment";

// Function to modify and format event data from the API response
const eventsModifier = (a) => {
  return {
    id: a._id, // Unique identifier for the event
    start: moment({
      date: new Date(a.dateOfVisit).getDate(), // Set the start date based on the dateOfVisit
      hour: new Date(a.startTime).getHours(), // Set the start time based on the startTime
    }).toDate(),
    allDay: true, // Indicates that the event lasts all day
    end: moment({ date: new Date(a.dateOfVisit).getDate() }).toDate(), // Set the end date to the same day as the start
    color: "#FB923C", // Color for the event display
    title: a.child.fullName, // Title of the event, using the child's full name
    message: a.doctor.fullName, // Additional message for the event, using the doctor's full name
    service: {
      id: a.purposeOfVisit._id, // Unique identifier for the purpose of the visit
      name: a.purposeOfVisit.name, // Name of the purpose of the visit
    },
    shareData: {
      email: true, // Indicates whether the event can be shared via email
      sms: true, // Indicates whether the event can be shared via SMS
      whatsapp: false, // Indicates whether the event can be shared via WhatsApp
    },
  };
};

// Custom hook to fetch and manage user-specific appointments
export const useMyAppointments = () => {
  const { user } = useGlobalStore(); // Accessing global store to get the current user

  // Function to fetch appointment data from the server
  async function fetchData() {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/appointments/mine/" + user._id // API endpoint to get appointments for the current user
      );
      // Map over the response data to format each appointment using eventsModifier
      return response.data.map((d) => eventsModifier(d));
    } catch (error) {
      console.error("Error fetching doctors:", error); // Log error if the request fails
      return []; // Return an empty array in case of an error
    }
  }

  // Use react-query's useQuery to fetch data and manage state
  return useQuery({
    queryKey: ["my_appointments"], // Unique key for the query to manage caching and refetching
    queryFn: fetchData, // Function to fetch the data
  });
};

