import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Function to fetch recent children data from the server
async function fetchData() {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/children/recent" // API endpoint to get recent children data
    );
    return response.data; // Return the data from the response
  } catch (error) {
    console.error("Error fetching doctors:", error); // Log error if the request fails
    return []; // Return an empty array in case of an error
  }
}

// Custom hook to fetch and manage recent children data
export const useRecentPatient = () => {
  // Use react-query's useQuery to fetch data and manage state
  return useQuery({
    queryKey: ["recent_children"], // Unique key for the query to manage caching and refetching
    queryFn: fetchData, // Function to fetch the data
  });
};

