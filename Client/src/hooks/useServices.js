import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Function to fetch service data from the server
async function fetchData() {
  try {
    const response = await axios.get("http://localhost:5000/api/services"); // API endpoint to get all services
    return response.data; // Return the data from the response
  } catch (error) {
    console.error("Error fetching doctors:", error); // Log error if the request fails
    return []; // Return an empty array in case of an error
  }
}

// Custom hook to fetch and manage service data
export const useServices = () => {
  // Use react-query's useQuery to fetch data and manage state
  return useQuery({
    queryKey: ["all_services"], // Unique key for the query to manage caching and refetching
    queryFn: fetchData, // Function to fetch the data
  });
};

