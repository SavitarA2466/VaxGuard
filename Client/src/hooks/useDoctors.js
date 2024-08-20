import { useQuery } from "@tanstack/react-query"; 
import axios from "axios"; 

// Function to fetch doctor data from the API
async function fetchData() {
  try {
    const response = await axios.get("http://localhost:5000/api/doctors"); // Make a GET request to the API endpoint for doctors
    return response.data; // Return the data from the response
  } catch (error) {
    console.error("Error fetching doctors:", error); // Log any errors to the console
    return []; // Return an empty array in case of error
  }
}

// Custom hook to fetch and manage doctor data
export const useDoctors = () => {
  return useQuery({
    queryKey: ["all_doctors"], // Unique key to identify the query
    queryFn: fetchData, // Function to fetch data
  });
};

