import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchData() {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/children/recent"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return [];
  }
}

export const useRecentPatient = () => {
  return useQuery({
    queryKey: ["recent_children"],
    queryFn: fetchData,
  });
};
