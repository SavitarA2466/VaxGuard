import { useQuery } from "@tanstack/react-query"; 
import axios from "axios"; 
import moment from "moment"; 

// Function to modify and format appointment data
const eventsModifier = (a) => {
  return {
    id: a._id, // Unique identifier for the event
    start: moment({
      date: new Date(a.dateOfVisit).getDate(), // Extract the day of the month from dateOfVisit
      hour: new Date(a.startTime).getHours(), // Extract the hour from startTime
    }).toDate(), // Convert the moment object to a JavaScript Date object
    allDay: true, // Specify that the event lasts all day
    end: moment({ date: new Date(a.dateOfVisit).getDate() }).toDate(), // Set the end time to the end of the day
    color: "#FB923C", // Set the color for the event
    title: a.child.fullName, // Set the title of the event to the child's full name
    message: a.doctor.fullName, // Set the message to the doctor's full name
    service: {
      id: a.purposeOfVisit._id, // ID of the purpose of visit
      name: a.purposeOfVisit.name, // Name of the purpose of visit
    },
    shareData: {
      email: true, // Allow sharing via email
      sms: true, // Allow sharing via SMS
      whatsapp: false, // Disallow sharing via WhatsApp
    },
  };
};

// Custom hook to fetch and manage appointment data
export const useAppointments = () => {
  // Function to fetch appointment data
  async function fetchData() {
    try {
      // Make an HTTP GET request to fetch appointments
      const response = await axios.get(
        "http://localhost:5000/api/appointments/"
      );
      // Map through the response data to modify it using eventsModifier function
      return response.data.map((d) => eventsModifier(d));
    } catch (error) {
      // Log any errors that occur during the fetch
      console.error("Error fetching doctors:", error);
      return []; // Return an empty array in case of error
    }
  }

  // Use the useQuery hook to fetch data and manage its state
  return useQuery({
    queryKey: ["all_appointments"], // Query key to identify the query
    queryFn: fetchData, // Function to fetch data
  });
};
