import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useGlobalStore from "../globalStore";

// Custom hook to fetch and manage user-specific children data
export const useMyChildren = () => {
  const { user } = useGlobalStore(); // Accessing global store to get the current user

  // Function to calculate the age based on the date of birth
  const calculateAge = (dob) => {
    const today = new Date(); // Current date
    const birthDate = new Date(dob); // Date of birth
    let age = today.getFullYear() - birthDate.getFullYear(); // Calculate initial age
    const monthDiff = today.getMonth() - birthDate.getMonth(); // Difference in months
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--; // Adjust age if birthday hasn't occurred yet this year
    }
    return age;
  };

  // Function to fetch children data from the server
  async function fetchData() {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/children/mine/" + user._id // API endpoint to get children data for the current user
      );
      // Map over the response data to add age property to each child object
      return response.data.map((d) => ({
        ...d, // Spread the existing properties of the child
        age: calculateAge(d.dateOfBirth), // Calculate and add the age
      }));
    } catch (error) {
      console.error("Error fetching doctors:", error); // Log error if the request fails
      return []; // Return an empty array in case of an error
    }
  }

  // Use react-query's useQuery to fetch data and manage state
  return useQuery({
    queryKey: ["my_children"], // Unique key for the query to manage caching and refetching
    queryFn: fetchData, // Function to fetch the data
  });
};
