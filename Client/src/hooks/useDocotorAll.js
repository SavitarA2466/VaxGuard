import { useQuery } from "@tanstack/react-query"; 
import axios from "axios"; 
import useGlobalStore from "../globalStore"; 

// Custom hook to fetch doctors data based on the current user's ID
export const useDoctorsAll = () => {
  // Access the current user from the global store
  const { user } = useGlobalStore();

  // Function to fetch data from the API
  async function fetchData() {
    try {
      // Make an HTTP GET request to fetch doctors data for the specific user
      const response = await axios.get(
        "http://localhost:5000/api/children/doctor/" + user._id
      );
      return response.data; // Return the fetched data
    } catch (error) {
      // Log any errors that occur during the fetch
      console.error("Error fetching doctors:", error);
      return []; // Return an empty array in case of error
    }
  }

  // Use the useQuery hook to fetch data and manage its state
  return useQuery({
    queryKey: ["doctors_data"], // Query key to identify the query
    queryFn: fetchData, // Function to fetch data
  });
};

