import React from 'react';
import Uploder from '../Uploader';
import { sortsDatas } from '../Datas';
import { Button, DatePickerComp, Input, Select } from '../Form';
import { BiChevronDown } from 'react-icons/bi';
import { toast } from 'react-hot-toast';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import { RiDeleteBin5Line } from 'react-icons/ri';

function APatientInfo({ titles, childFields }) {
  const [gender, setGender] = React.useState(sortsDatas.genderFilter[0]);
  const [childTitle, setChildTitle] = React.useState(sortsDatas.title[0]);
  const [parentTitle, setParentTitle] = React.useState(sortsDatas.title[0]);
  const [childDOB, setChildDOB] = React.useState(new Date());
  const [parentDOB, setParentDOB] = React.useState(new Date());

  return (
    <div className="flex-colo gap-4">
      {/* Profile Image */}
      <div className="flex gap-3 flex-col w-full col-span-6">
        <p className="text-sm">Profile Image</p>
        <Uploder />
      </div>

      {/* Child's Title */}
      {childFields && (
        <div className="flex w-full flex-col gap-3">
          <p className="text-black text-sm">Child's Title</p>
          <Select
            selectedPerson={childTitle}
            setSelectedPerson={setChildTitle}
            datas={sortsDatas.title}
          >
            <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
              {childTitle?.name} <BiChevronDown className="text-xl" />
            </div>
          </Select>
        </div>
      )}

      {/* Child's Full Name */}
      {childFields && <Input label="Child's Full Name" color={true} type="text" />}
      
      {/* Gender */}
      {!titles && (
        <div className="flex w-full flex-col gap-3">
          <p className="text-black text-sm">Gender</p>
          <Select
            selectedPerson={gender}
            setSelectedPerson={setGender}
            datas={sortsDatas.genderFilter}
          >
            <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
              {gender?.name} <BiChevronDown className="text-xl" />
            </div>
          </Select>
        </div>
      )}

      {/* Child's Date of Birth */}
      {childFields && (
        <DatePickerComp
          label="Child's Date of Birth"
          startDate={childDOB}
          onChange={(date) => setChildDOB(date)}
        />
      )}
      
      {/* Parents Title */}
      {childFields && (
        <div className="flex w-full flex-col gap-3">
          <p className="text-black text-sm">Parents Title</p>
          <Select
            selectedPerson={parentTitle}
            setSelectedPerson={setParentTitle}
            datas={sortsDatas.title}
          >
            <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
              {parentTitle?.name} <BiChevronDown className="text-xl" />
            </div>
          </Select>
        </div>
      )}

      {/* Parents Full Name */}
      {childFields && <Input label="Parents Full Name" color={true} type="text" />}

      {/* Parents' Date of Birth */}
      {childFields && (
        <DatePickerComp
          label="Parents' Date of Birth"
          startDate={parentDOB}
          onChange={(date) => setParentDOB(date)}
        />
      )}

      {/* Phone Number */}
      <Input label="Phone Number" color={true} type="number" />
      
      {/* Email */}
      <Input label="Email" color={true} type="email" />
      
      {/* Emergency Contact */}
      {!titles && <Input label="Emergency Contact" color={true} type="number" />}
      
      {/* Address */}
      {!titles && <Input label="Address" color={true} type="text" />}
      
      {/* Submit */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        <Button
          label={'Delete Account'}
          Icon={RiDeleteBin5Line}
          onClick={() => {
            toast.error('This feature is not available yet');
          }}
        />
        <Button
          label={'Save Changes'}
          Icon={HiOutlineCheckCircle}
          onClick={() => {
            toast.error('This feature is not available yet');
          }}
        />
      </div>
    </div>
  );
}

export default APatientInfo;
