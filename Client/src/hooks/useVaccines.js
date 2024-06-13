import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchData() {
  try {
    const response = await axios.get("http://localhost:5000/api/vaccines");
    return response.data;
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return [];
  }
}

export const useVaccines = () => {
  return useQuery({
    queryKey: ["all_vaccines"],
    queryFn: fetchData,
  });
};
