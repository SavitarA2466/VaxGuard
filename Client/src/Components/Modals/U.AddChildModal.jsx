import React from "react";
import { sortsDatas } from "../Datas";
import { Button, DatePickerComp, Input, Select } from "../../Components/Form";
import { BiChevronDown } from "react-icons/bi";
import { toast } from "react-hot-toast";
import { HiOutlineCheckCircle } from "react-icons/hi";
import axios from "axios";
import useGlobalStore from "../../globalStore";

function UAddChildModal({ titles }) {
  const [date, setDate] = React.useState(new Date());
  const [gender, setGender] = React.useState(sortsDatas.genderFilter[0]);
  const [bloodType, setBloodType] = React.useState(
    sortsDatas.bloodTypeFilter[0]
  );
  const [fullName, setFullName] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [address, setAddress] = React.useState("");

  const { user } = useGlobalStore();

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

  const handleSaveChanges = async () => {
    const childAge = calculateAge(date);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/children/" + user._id,
        {
          fullName,
          gender: gender.name,
          dateOfBirth: date,
          bloodType: bloodType.name,
          weight,
          address,
          age: childAge,
        }
      );

      if (response.status === 201) {
        toast.success("Child record created successfully");
      }
    } catch (error) {
      toast.error("Failed to create child record");
    }
  };

  return (
    <div className="gap-4 flex-colo">
      <Input
        label="Full Name"
        color={true}
        type="text"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />

      <div className="flex flex-col w-full gap-3">
        <p className="text-sm text-black">Gender</p>
        <Select
          selectedPerson={gender}
          setSelectedPerson={setGender}
          datas={sortsDatas.genderFilter}
        >
          <div className="w-full p-4 text-sm font-light border rounded-lg flex-btn text-textGray border-border focus:border focus:border-subMain">
            {gender?.name} <BiChevronDown className="text-xl" />
          </div>
        </Select>
      </div>

      <DatePickerComp
        label="Date of Birth"
        startDate={date}
        onChange={(date) => setDate(date)}
      />

      <div className="flex flex-col w-full gap-3">
        <p className="text-sm text-black">Blood Group</p>
        <Select
          selectedPerson={bloodType}
          setSelectedPerson={setBloodType}
          datas={sortsDatas.bloodTypeFilter}
        >
          <div className="w-full p-4 text-sm font-light border rounded-lg flex-btn text-textGray border-border focus:border focus:border-subMain">
            {bloodType?.name} <BiChevronDown className="text-xl" />
          </div>
        </Select>
      </div>

      <Input
        label="Weight"
        color={true}
        type="text"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />

      <Input
        label="Address"
        color={true}
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

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
