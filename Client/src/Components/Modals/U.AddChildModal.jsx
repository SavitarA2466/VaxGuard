import React from "react"; // Import React
import { sortsDatas } from "../Datas"; // Import static data for filters
import { Button, DatePickerComp, Input, Select } from "../../Components/Form"; // Import form components
import { BiChevronDown } from "react-icons/bi"; // Import dropdown icon
import { toast } from "react-hot-toast"; // Import toast for notifications
import { HiOutlineCheckCircle } from "react-icons/hi"; // Import check circle icon
import axios from "axios"; // Import axios for HTTP requests
import useGlobalStore from "../../globalStore"; // Import global store for user data

// Define UAddChildModal component
function UAddChildModal({ titles }) {
  // State variables
  const [date, setDate] = React.useState(new Date()); // State for child's date of birth
  const [gender, setGender] = React.useState(sortsDatas.genderFilter[0]); // State for selected gender
  const [bloodType, setBloodType] = React.useState(sortsDatas.bloodTypeFilter[0]); // State for selected blood type
  const [fullName, setFullName] = React.useState(""); // State for child's full name
  const [weight, setWeight] = React.useState(""); // State for child's weight
  const [address, setAddress] = React.useState(""); // State for child's address

  const { user } = useGlobalStore(); // Access current user from global store

  // Function to calculate age based on date of birth
  const calculateAge = (dob) => {
    const today = new Date(); // Get today's date
    const birthDate = new Date(dob); // Convert dob to Date object
    let age = today.getFullYear() - birthDate.getFullYear(); // Calculate age based on year difference
    const monthDiff = today.getMonth() - birthDate.getMonth(); // Calculate month difference
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--; // Adjust age if current date is before birthday in the year
    }
    return age;
  };

  // Function to handle saving changes
  const handleSaveChanges = async () => {
    const childAge = calculateAge(date); // Calculate child's age

    try {
      const response = await axios.post(
        "http://localhost:5000/api/children/" + user._id, // API endpoint with user ID
        {
          fullName, // Child's full name
          gender: gender.name, // Selected gender
          dateOfBirth: date, // Date of birth
          bloodType: bloodType.name, // Selected blood type
          weight, // Child's weight
          address, // Child's address
          age: childAge, // Calculated age
        }
      );

      if (response.status === 201) {
        toast.success("Child record created successfully"); // Success notification
      }
    } catch (error) {
      toast.error("Failed to create child record"); // Error notification
    }
  };

  return (
    <div className="gap-4 flex-colo">
      {/* Full name input */}
      <Input
        label="Full Name"
        color={true}
        type="text"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />

      {/* Gender selection */}
      <div className="flex flex-col w-full gap-3">
        <p className="text-sm text-black">Gender</p>
        <Select
          selectedPerson={gender}
          setSelectedPerson={setGender}
          datas={sortsDatas.genderFilter} // Data for gender options
        >
          <div className="w-full p-4 text-sm font-light border rounded-lg flex-btn text-textGray border-border focus:border focus:border-subMain">
            {gender?.name} <BiChevronDown className="text-xl" />
          </div>
        </Select>
      </div>

      {/* Date of birth picker */}
      <DatePickerComp
        label="Date of Birth"
        startDate={date}
        onChange={(date) => setDate(date)}
      />

      {/* Blood type selection */}
      <div className="flex flex-col w-full gap-3">
        <p className="text-sm text-black">Blood Group</p>
        <Select
          selectedPerson={bloodType}
          setSelectedPerson={setBloodType}
          datas={sortsDatas.bloodTypeFilter} // Data for blood type options
        >
          <div className="w-full p-4 text-sm font-light border rounded-lg flex-btn text-textGray border-border focus:border focus:border-subMain">
            {bloodType?.name} <BiChevronDown className="text-xl" />
          </div>
        </Select>
      </div>

      {/* Weight input */}
      <Input
        label="Weight"
        color={true}
        type="text"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />

      {/* Address input */}
      <Input
        label="Address"
        color={true}
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      {/* Save button */}
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-1">
        <Button
          label={"Save Changes"}
          Icon={HiOutlineCheckCircle}
          onClick={handleSaveChanges}
        />
      </div>
    </div>
  );
}

export default UAddChildModal;
