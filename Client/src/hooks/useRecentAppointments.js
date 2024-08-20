import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Function to fetch recent appointment data from the server
async function fetchData() {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/appointments/recent" // API endpoint to get recent appointments
    );
    return response.data; // Return the data from the response
  } catch (error) {
    console.error("Error fetching appointments:", error); // Log error if the request fails
    return []; // Return an empty array in case of an error
  }
}

// Custom hook to fetch and manage recent appointments data
export const useRecentAppointments = () => {
  // Use react-query's useQuery to fetch data and manage state
  return useQuery({
    queryKey: ["recent_appointments"], // Unique key for the query to manage caching and refetching
    queryFn: fetchData, // Function to fetch the data
  });
};
