import React, { useState, useEffect } from 'react';
import Layout from '../../Layout/DoctorLayout/D.index';
import { Link } from 'react-router-dom';
import { IoArrowBackOutline } from 'react-icons/io5';
import { Button, Checkbox, Select, Textarea } from '../../Components/Form';
import { BiChevronDown, BiPlus } from 'react-icons/bi';
import { medicineData, memberData, servicesData } from '../../Components/Datas';
import { VaccineDosageTable } from '../../Components/Tables/VaccineDosageTable';
import { toast } from 'react-hot-toast';
import DMedicineDosageModal from '../../Components/Modals/D.MedicineDosage';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import axios from 'axios';

function DNewMedicalRecode() {
  const [doctors, setDoctors] = useState([]);
  const [services, setServices] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [treatmeants, setTreatmeants] = useState([]);
  const [doctor, setDoctor] = useState({});
  const [check, setCheck] = useState(false);
  const [description, setDescription] = useState('');
  const [medicalRecords, setMedicalRecords] = useState([]);

  // Fetch doctors and services from backend when component mounts
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/doctors'); 
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/services'); 
        setServices(response.data);

        // Set up initial state for treatmeants only if services is not empty
        if (response.data.length > 0) {
          setTreatmeants(response.data.map(item => ({ name: item.name, checked: false })));
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchDoctors();
    fetchServices();
  }, []);



  console.log(doctors);
  console.log(treatmeants)
  const doctorsData = doctors.map((item) => {
    return {
      id: item._id,
      name: item.fullName,
    };
  });

  // on change treatmean
  const onChangeTreatmeants = (e) => {
  const { name } = e.target;
    const newTreatmeants = treatmeants.map((item) => {
      if (item.name === name) {
        return {
          ...item,
          checked: !item.checked,
        };
      }
      return item;
    });
    setTreatmeants(newTreatmeants);
  };

  const handleSubmit = async () => {
    try {
      const selectedServices = treatmeants
        .filter((item) => item.checked)
        .map((item) => item.name);
      
      const newMedicalRecord = {
        doctor: doctor.id,
        services: selectedServices,
        description,
      };
console.log(newMedicalRecord);
      const response = await axios.post('http://localhost:5000/api/medicalRecords', newMedicalRecord);
      toast.success('Medical record saved successfully');
    } catch (error) {
      console.error('Error saving medical record:', error);
      toast.error('Error saving medical record');
    }
  };


  return (
    <Layout>
      {
        isOpen && (
          <DMedicineDosageModal
            isOpen={isOpen}
            closeModal={() => {
              setIsOpen(false);
            }}
          />
        )
      }
      <div className="flex items-center gap-4">
        <Link
          to={`/D.patients/preview/1`}
          className="bg-white border border-subMain border-dashed rounded-lg py-3 px-4 text-md"
        >
          <IoArrowBackOutline />
        </Link>
        <h1 className="text-xl font-semibold">New Medical Record</h1>
      </div>
      <div className=" grid grid-cols-12 gap-6 my-8 items-start">
        <div
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-delay="100"
          data-aos-offset="200"
          className="col-span-12 flex-colo gap-6 lg:col-span-4 bg-white rounded-xl border-[1px] border-border p-6 lg:sticky top-28"
        >
          <div className="gap-2 flex-colo">
            <h2 className="text-sm font-semibold">Amani Mmassy</h2>
            <p className="text-xs text-textGray">amanimmassy@gmail.com</p>
            <p className="text-xs">+254 712 345 678</p>
            <p className="text-xs text-subMain bg-text font-medium py-1 px-4 rounded-full border-[0.5px] border-subMain">
              45 yrs{' '}
            </p>
          </div>
        </div>
        {/* tab panel */}
        <div
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-delay="100"
          data-aos-offset="200"
          className="col-span-12 lg:col-span-8 bg-white rounded-xl border-[1px] border-border p-6"
        >
          <div className="flex w-full flex-col gap-5">
            {/* doctor */}
            <div className="flex w-full flex-col gap-2">
              <p className="text-black text-sm">Doctor</p>
              <Select
                selectedPerson={doctor}
                setSelectedPerson={setDoctor}
                datas={doctorsData}
              >
                <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                  {doctorsData.fullName} <BiChevronDown className="text-xl" />
                </div>
              </Select>
            </div>
            {/* Treatment */}
            <div className="flex w-full flex-col gap-4">
              <p className="text-black text-sm">Service</p>
              <div className="grid xs:grid-cols-2 md:grid-cols-3 gap-6 pb-6">
                {treatmeants?.slice(0, 100).map((item) => (
                  <Checkbox
                    label={item.name}
                    checked={
                      treatmeants.find((i) => i.name === item.name).checked
                    }
                    onChange={onChangeTreatmeants}
                    name={item.name}
                    key={item.id}
                  />
                ))}
              </div>
            </div>

            <div className="flex-colo gap-6">
              <Textarea
                label="Description"
                placeholder="Write description here..."
                color={true}
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* medicine */}
            <div className="flex w-full flex-col gap-4 mb-6">
              <p className="text-black text-sm">Vaccine</p>
              <div className="w-full overflow-x-scroll">
                <VaccineDosageTable
                  data={medicineData?.slice(0, 3)}
                  functions={{
                    delete: (id) => {
                      toast.error('This feature is not available yet');
                    },
                  }}
                  button={true}
                />
              </div>
              <button
                onClick={() => {
                  setIsOpen(true);
                }}
                className=" text-subMain flex-rows gap-2 rounded-lg border border-subMain border-dashed py-4 w-full text-sm"
              >
                <BiPlus /> Add Vaccine
              </button>
            </div>
            {/* submit */}
            <Button
              label={'Save'}
              Icon={HiOutlineCheckCircle}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default DNewMedicalRecode;
