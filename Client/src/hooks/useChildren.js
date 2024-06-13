import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useChildren = () => {
  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:5000/api/children/");
      return response.data.map((d) => ({
        ...d,
        age: calculateAge(d.dateOfBirth),
      }));
    } catch (error) {
      console.error("Error fetching doctors:", error);
      return [];
    }
  }

  return useQuery({
    queryKey: ["all_children"],
    queryFn: fetchData,
  });
};
