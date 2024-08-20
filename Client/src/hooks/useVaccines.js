import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Function to fetch vaccine data from the server
async function fetchData() {
  try {
    const response = await axios.get("http://localhost:5000/api/vaccines"); // API endpoint to get all vaccines
    return response.data; // Return the data from the response
  } catch (error) {
    console.error("Error fetching doctors:", error); // Log error if the request fails
    return []; // Return an empty array in case of an error
  }
}

// Custom hook to fetch and manage vaccine data
export const useVaccines = () => {
  // Use react-query's useQuery to fetch data and manage state
  return useQuery({
    queryKey: ["all_vaccines"], // Unique key for the query to manage caching and refetching
    queryFn: fetchData, // Function to fetch the data
  });
};
