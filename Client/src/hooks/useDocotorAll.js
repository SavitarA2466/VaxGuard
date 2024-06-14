import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useGlobalStore from "../globalStore";

export const useDoctorsAll = () => {
  const { user } = useGlobalStore();

  async function fetchData() {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/children/doctor/" + user._id
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching doctors:", error);
      return [];
    }
  }

  return useQuery({
    queryKey: ["doctors_data"],
    queryFn: fetchData,
  });
};
