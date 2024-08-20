import { useQuery } from "@tanstack/react-query"; 
import axios from "axios"; 

// Custom hook to fetch and manage children data
export const useChildren = () => {
  // Function to calculate the age based on date of birth
  const calculateAge = (dob) => {
    const today = new Date(); // Get the current date
    const birthDate = new Date(dob); // Create a Date object from the date of birth
    let age = today.getFullYear() - birthDate.getFullYear(); // Calculate the initial age
    const monthDiff = today.getMonth() - birthDate.getMonth(); // Calculate the difference in months
    // Adjust age if the current date is before the birthday in the current year
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age; // Return the calculated age
  };

  // Function to fetch data from the API
  async function fetchData() {
    try {
      // Make an HTTP GET request to fetch children data
      const response = await axios.get("http://localhost:5000/api/children/");
      // Map through the response data to add an 'age' property
      return response.data.map((d) => ({
        ...d, // Spread existing properties
        age: calculateAge(d.dateOfBirth), // Add the calculated age
      }));
    } catch (error) {
      // Log any errors that occur during the fetch
      console.error("Error fetching doctors:", error);
      return []; // Return an empty array in case of error
    }
  }

  // Use the useQuery hook to fetch data and manage its state
  return useQuery({
    queryKey: ["all_children"], // Query key to identify the query
    queryFn: fetchData, // Function to fetch data
  });
};
