import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchData() {
  try {
    const response = await axios.get("http://localhost:5000/api/doctors");
    return response.data;
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return [];
  }
}

export const useDoctors = () => {
  return useQuery({
    queryKey: ["all_doctors"],
    queryFn: fetchData,
  });
};
