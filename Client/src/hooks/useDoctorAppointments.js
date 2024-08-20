import { useQuery } from "@tanstack/react-query"; 
import axios from "axios"; 
import useGlobalStore from "../globalStore"; 
import moment from "moment"; 

// Function to transform appointment data for display
const eventsModifier = (a) => {
  return {
    id: a._id, // Unique identifier for the appointment
    start: moment({ // Start date and time for the event
      date: new Date(a.dateOfVisit).getDate(), // Extract day of the month
      hour: new Date(a.startTime).getHours(), // Extract hour of the day
    }).toDate(), // Convert moment object to JavaScript Date object
    allDay: true, // Mark the event as an all-day event
    end: moment({ date: new Date(a.dateOfVisit).getDate() }).toDate(), // End date for the event (just the day, no specific time)
    color: "#FB923C", // Color for the event display
    title: a.child.fullName, // Title of the event (child's full name)
    message: a.doctor.fullName, // Message for the event (doctor's full name)
    service: { // Service information related to the appointment
      id: a.purposeOfVisit._id, // Unique identifier for the service
      name: a.purposeOfVisit.name, // Name of the service
    },
    shareData: { // Sharing options for the appointment
      email: true, // Allow sharing via email
      sms: true, // Allow sharing via SMS
      whatsapp: false, // Do not allow sharing via WhatsApp
    },
  };
};

// Custom hook to fetch and format doctor appointments
export const useDoctorAppointments = () => {
  const { user } = useGlobalStore(); // Access the current user from the global store

  // Function to fetch appointment data from the API
  async function fetchData() {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/appointments/doctor/" + user._id // Fetch appointments for the current user (doctor)
      );
      return response.data.map((d) => eventsModifier(d)); // Map the data to the desired format using eventsModifier
    } catch (error) {
      console.error("Error fetching doctors:", error); // Log any errors
      return []; // Return an empty array in case of error
    }
  }

  // Use the useQuery hook to fetch and manage the appointment data
  return useQuery({
    queryKey: ["doctor_appointments"], // Unique key to identify the query
    queryFn: fetchData, // Function to fetch data
  });
};
