import { HiOutlineHome, HiOutlineMail,} from 'react-icons/hi';
import {
  TbCalendar,
  TbChartHistogram,
  TbLockAccess,
  TbUsers,
} from 'react-icons/tb';
import { FaRegCalendarAlt} from 'react-icons/fa';
import {
  RiFileList3Line,
  RiHeartLine,
  RiImageLine,
  RiLockPasswordLine,
  RiMedicineBottleLine,
  RiMoneyDollarCircleLine,
  RiStethoscopeLine,
  RiUserHeartLine,
  RiUserLine,
} from 'react-icons/ri';
import {
  MdOutlineCampaign,
  MdOutlineInventory2,
} from 'react-icons/md';
import { AiOutlineSetting } from 'react-icons/ai';
import { BiCalendar, BiUserPlus } from 'react-icons/bi';

export const AMenuDatas = [
    {
      title: 'Dashboard',
      path: '/adminDashboard',
      icon: HiOutlineHome,
    },
    {
      title: 'Patients',
      path: '/A.patients',
      icon: TbUsers,
    },
    {
      title: 'Doctors',
      path: '/A.doctors',
      icon: RiUserHeartLine,
    },
  
    {
      title: 'Appointments',
      path: '/A.appointments',
      icon: FaRegCalendarAlt,
    },
    {
      title: 'Services',
      path: '/A.services',
      icon: MdOutlineInventory2,
    },
    {
      title: 'Vaccine',
      path: '/A.vaccine',
      icon: RiMedicineBottleLine,
    },
    {
      title: 'Announcement',
      path: '/A.Announcement',
      icon: MdOutlineCampaign,
    },
    {
      title: 'Settings',
      path: '/A.settings',
      icon: AiOutlineSetting,
    },
  ];

  export const DMenuDatas = [
    {
      title: 'Dashboard',
      path: '/doctordashboard',
      icon: HiOutlineHome,
    },
    {
      title: 'Patients',
      path: '/D.patients',
      icon: TbUsers,
    },
  
    {
      title: 'Appointments',
      path: '/D.appointments',
      icon: FaRegCalendarAlt,
    },
    {
      title: 'Announcement',
      path: '/D.Announcement',
      icon: MdOutlineCampaign,
    },
    {
      title: 'Settings',
      path: '/D.settings',
      icon: AiOutlineSetting,
    },
  ];

  export const UMenuDatas = [
    {
      title: 'Dashboard',
      path: '/userdashboard',
      icon: HiOutlineHome,
    },
    {
      title: 'Childs',
      path: '/Child',
      icon: TbUsers,
    },
    {
      title: 'Doctors',
      path: '/U.doctors',
      icon: RiUserHeartLine,
    },
  
    {
      title: 'Appointments',
      path: '/U.appointments',
      icon: FaRegCalendarAlt,
    },
    {
      title: 'Announcements',
      path: '/U.Announcement',
      icon: MdOutlineCampaign,
    },
    {
      title: 'Settings',
      path: '/U.settings',
      icon: AiOutlineSetting,
    },
  ];

  export const memberData = [
    {
      id: 1,
      title: 'Hugo Lloris',
      image: '/images/user1.png',
      admin: false,
      email: 'hugolloris@gmail.com',
      phone: '+94 456 789 17',
      age: 25,
      gender: 'Male',
      blood: 'A+',
      totalAppointments: 5,
      date: '20 Aug 2021',
    },
    {
      id: 2,
      title: 'Mauris auctor',
      image: '/images/user2.png',
      admin: false,
      email: 'maurisauctor@gmail.com',
      phone: '+94 456 789 17',
      age: 34,
      gender: 'Female',
      blood: 'B+',
      totalAppointments: 3,
      date: '22 Nov 2023',
    },
    {
      id: 3,
      title: 'Michael Owen',
      image: '/images/user3.png',
      admin: false,
      phone: '+94 456 789 17',
      email: 'michaelowen@gmail.com',
      age: 45,
      gender: 'Male',
      blood: 'O+',
      totalAppointments: 26,
      date: '12 Jan 2020',
    },
    {
      id: 4,
      title: 'Amina Smith',
      image: '/images/user4.png',
      admin: true,
      phone: '+94 456 789 17',
      email: 'aminasmith@gmail.com',
      age: 28,
      gender: 'Female',
      blood: 'AB+',
      totalAppointments: 17,
      date: '07 Feb 2001',
    },
    {
      id: 5,
      title: 'Minahil Khan',
      image: '/images/user5.png',
      admin: false,
      phone: '+94 456 789 17',
      email: 'minahilkhan@gmail.com',
      age: 35,
      gender: 'Female',
      blood: 'A+',
      totalAppointments: 9,
      date: '30 Dec 2019',
    },
    {
      id: 6,
      title: 'Alex Morgan',
      image: '/images/user6.png',
      admin: false,
      phone: '+94 456 789 17',
      email: 'alexmorgan@gmail.com',
      age: 29,
      gender: 'Male',
      blood: 'B+',
      totalAppointments: 34,
      date: '12 Jan 2020',
    },
    {
      id: 7,
      title: 'John Doe',
      image: '/images/user7.png',
      admin: false,
      phone: '+94 456 789 17',
      email: 'johndoe@gmail.com',
      age: 32,
      gender: 'Male',
      blood: 'O-',
      totalAppointments: 12,
      date: '18 Mar 2023',
    },
    {
      id: 8,
      title: 'David Beckham',
      image: '/images/user8.png',
      admin: false,
      phone: '+94 456 789 17',
      email: 'davidbackham@gmail.com',
      age: 27,
      gender: 'Female',
      blood: 'AB+',
      totalAppointments: 70,
      date: '01 June 2018',
    },
  ];

  export const sortsDatas = {
    status: [
      {
        id: 1,
        name: 'Status...',
      },
      {
        id: 2,
        name: 'Pending',
      },
      {
        id: 3,
        name: 'Approved',
      },
      {
        id: 4,
        name: 'Cancelled',
      },
    ],
    medicine: [
      {
        id: 1,
        name: 'Select Medicine',
      },
      {
        id: 2,
        name: 'Bacillus Calmette-Guérin (BCG)',
      },
      {
        id: 3,
        name: 'Oral Polio Vaccine (OPV)',
      },
      {
        id: 4,
        name: 'Pentavalent',
      },
      {
        id: 5,
        name: 'Fractional Inactivated Polio Vaccine (fIPV)',
      },
      {
        id: 6,
        name: 'MMR (Measles, Mumps, and Rubella)',
      },
      {
        id: 7,
        name: 'Live JE',
      },
      {
        id: 8,
        name: 'DPT Vaccine',
      },
      {
        id: 9,
        name: 'DT Vaccine',
      },
      {
        id: 10,
        name: 'Human Papillomavirus (HPV)',
      },
      {
        id: 11,
        name: 'adult Tetanus and Diphtheria (aTd)',
      },
    ],
    stocks: [
      {
        id: 1,
        name: 'All',
      },
      {
        id: 2,
        name: 'Available',
      },
      {
        id: 3,
        name: 'Out of Stock',
      },
    ],
    service: [
      {
        id: 1,
        name: 'All',
      },
      {
        id: 2,
        name: 'Enabled',
      },
      {
        id: 3,
        name: 'Disabled',
      },
    ],
    title: [
      {
        id: 1,
        name: 'Dr.',
      },
      {
        id: 2,
        name: 'Mr.',
      },
      {
        id: 3,
        name: 'Mrs.',
      },
      {
        id: 4,
        name: 'Ms.',
      },
      {
        id: 5,
        name: 'Miss.',
      },
      {
        id: 6,
        name: 'Master.',
      },
    ],
    filterPatient: [
      {
        id: 1,
        name: 'Sort by...',
      },
      {
        id: 2,
        name: 'Newest Patients',
      },
      {
        id: 3,
        name: 'Oldest Patients',
      },
    ],
    genderFilter: [
      {
        id: 1,
        name: 'Gender...',
      },
      {
        id: 2,
        name: 'Female',
      },
      {
        id: 3,
        name: 'Male',
      },
    ],
    bloodTypeFilter: [
      {
        id: 1,
        name: 'Blood Type...',
      },
      {
        id: 2,
        name: 'A+',
      },
      {
        id: 3,
        name: 'A-',
      },
      {
        id: 4,
        name: 'B+',
      },
      {
        id: 5,
        name: 'B-',
      },
      {
        id: 6,
        name: 'AB+',
      },
      {
        id: 7,
        name: 'AB-',
      },
      {
        id: 8,
        name: 'O+',
      },
      {
        id: 9,
        name: 'O-',
      },
    ],
  };

  export const announcementData = [
    {
      id: 1,
      title: 'Dear Patients',
      date: '3 days ago',
      type: 'email',
      sendTo: 'All Patients',
      action: {
        subject: 'Delight patients ',
        message:
          'Dear Patient, ',
        subHeader: '',
        header: '',
        footer: '',
      },
    },
  ];

  export const servicesData = [
    {
      id: 1,
      name: 'Select service.. ',
    },
    {
      id: 2,
      name: '0 - 4 Weeks',
      date: '23 June, 2021',
      status: true,
    },
    {
      id: 3,
      name: '2 Months Completed',
      date: '12 Jan, 2022',
      status: true,
    },
    {
      id: 4,
      name: '4 Months Completed',
      date: '11 April, 2023',
      status: false,
    },
    {
      id: 5,
      name: '6 Months Completed',
      date: '10 Agst, 2021',
      status: true,
    },
    {
      id: 6,
      name: '9 Months Completed',
      date: '23 June, 2021',
      status: false,
    },
    {
      id: 7,
      name: '12 Months Completed',
      date: '09 Dec, 2023',
      status: false,
    },
    {
      id: 8,
      name: '18 Months Completed',
      date: '05 Feb, 2019',
      status: true,
    },
    {
      id: 9,
      name: '3 Years Completed',
      date: '16 Nov, 2022',
      status: true,
    },
    {
      id: 10,
      name: '5 Years Completed',
      date: '02 Jun, 2022',
      status: false,
    },
    {
      id: 11,
      name: '10 Years Completed',
      date: '23 June, 2021',
      status: true,
    },
    {
      id: 12,
      name: '11 Years Completed',
      date: '23 June, 2021',
      status: true,
    },
  ];

  export const appointmentsData = [
    {
      id: 1,
      time: '2 hrs later',
      user: memberData[4],
      from: '10:00 AM',
      to: '12:00 PM',
      hours: 2,
      status: 'Pending',
      doctor: memberData[0],
      date: 'Jun 12, 2021',
    },
    {
      id: 2,
      time: '1 hrs ago',
      user: memberData[5],
      from: '13:00 Pm',
      to: '18:00 PM',
      hours: 5,
      status: 'Cancel',
      doctor: memberData[1],
      date: 'Feb 24, 2021',
    },
    {
      id: 3,
      time: '2 hrs ago',
      user: memberData[6],
      from: '10:00 AM',
      to: '12:00 PM',
      hours: 2,
      status: 'Approved',
      doctor: memberData[2],
      date: 'Mar 12, 2023',
    },
    {
      id: 4,
      time: '3 hrs later',
      user: memberData[7],
      from: '06:00 AM',
      to: '08:00 AM',
      hours: 3,
      status: 'Pending',
      doctor: memberData[3],
      date: 'Apr 06, 2023',
    },
    {
      id: 5,
      time: '4 hrs ago',
      user: memberData[3],
      from: '10:00 AM',
      to: '12:00 PM',
      hours: 7,
      status: 'Approved',
      doctor: memberData[4],
      date: 'May 18, 2023',
    },
  ];
  
  export const dashboardCards = [
    {
      id: 1,
      title: 'Total Patients',
      icon: TbUsers,
      value: 1600,
      percent: 45.06,
      color: ['bg-subMain', 'text-subMain', '#66B5A3'],
      datas: [92, 80, 45, 15, 49, 77, 70, 51, 110, 20, 90, 60],
    },
    {
      id: 2,
      title: 'Appointments',
      icon: TbCalendar,
      value: 130,
      percent: 25.06,
      color: ['bg-yellow-500', 'text-yellow-500', '#F9C851'],
      datas: [20, 50, 75, 15, 108, 97, 70, 41, 50, 20, 90, 60],
    },
    
  ];
  
  export const notificationsData = [
    {
      id: 1,
      action: 1,
      user: memberData[0],
      time: '2 hours ago',
    },
    {
      id: 2,
      action: 2,
      user: memberData[1],
      time: '2 days ago',
    },
    {
      id: 3,
      action: 1,
      user: memberData[2],
      time: '3 days ago',
    },
    {
      id: 4,
      action: 2,
      user: memberData[3],
      time: '4 days ago',
    },
  ];
  
  export const shareData = [
    {
      id: 1,
      icon: HiOutlineMail,
      title: 'Email',
      description: 'Send to patient email address',
    },
  ];
  
  export const medicineData = [
    {
      id: 1,
      name: 'Bacillus Calmette-Guérin (BCG)',
      stock: 500,
      status: 'Available',
    },
    {
      id: 2,
      name: 'Pentavalent ',
      stock: 200,
      status: 'Available',
    },
    {
      id: 3,
      name: 'Oral Polio Vaccine (OPV)',
      stock: 0,
      status: 'Out of stock',
    },
    {
      id: 4,
      name: 'Fractional Inactivated Polio Vaccine (fIPV)',
      stock: 370,
      status: 'Available',
    },
    {
      id: 5,
      name: 'MMR (Measles, Mumps, and Rubella)',
      stock: 0,
      status: 'Out of stock',
    },
    {
      id: 6,
      name: 'Live JE',
      stock: 123,
      status: 'Available',
    },
    {
      id: 7,
      name: 'DTP Vaccine',
      stock: 1,
      status: 'Available',
    },
    {
      id: 8,
      name: 'DT Vaccine',
      stock: 0,
      status: 'Out of stock',
    },
    {
      id: 9,
      name: ' Human Papillomavirus (HPV)',
      stock: 0,
      status: 'Out of stock',
    },
    {
      id: 10,
      name: 'adult Tetanus and Diphtheria (aTd)',
      stock: 0,
      status: 'Out of stock',
    },
  ];

  export const ApatientTab = [
    {
      id: 1,
      title: 'Medical Records',
      icon: TbChartHistogram,
    },
    {
      id: 2,
      title: 'Appointments',
      icon: BiCalendar,
    },
    {
      id: 3,
      title: 'Images',
      icon: RiImageLine,
    },
    {
      id: 4,
      title: 'Patient Information',
      icon: RiUserLine,
    },
    {
      id: 5,
      title: 'Health Information',
      icon: RiHeartLine,
    },
  ];

  export const AdoctorTab = [
    {
      id: 1,
      title: 'Patients',
      icon: BiUserPlus,
    },
    {
      id: 2,
      title: 'Appointments',
      icon: BiCalendar,
    },
    {
      id: 3,
      title: 'Change Password',
      icon: RiLockPasswordLine,
    },
  ];

  export const DpatientTab = [
    {
      id: 1,
      title: 'Medical Records',
      icon: TbChartHistogram,
    },
    {
      id: 2,
      title: 'Appointments',
      icon: BiCalendar,
    },
  ];
  
  export const DdoctorTab = [
    {
      id: 1,
      title: 'Personal Information',
      icon: RiUserLine,
    },
    {
      id: 2,
      title: 'Patients',
      icon: BiUserPlus,
    },
    {
      id: 3,
      title: 'Appointments',
      icon: BiCalendar,
    },
    {
      id: 4,
      title: 'Change Password',
      icon: RiLockPasswordLine,
    },
  ];

  export const UpatientTab = [
    {
      id: 1,
      title: 'Medical Records',
      icon: TbChartHistogram,
    },
    {
      id: 2,
      title: 'Appointments',
      icon: BiCalendar,
    },
    {
      id: 3,
      title: 'Images',
      icon: RiImageLine,
    },
  ];
  

  export const doctorsData = [
    {
      id: 1,
      user: memberData[0],
      title: 'Dr.',
    },
    {
      id: 2,
      user: memberData[1],
      title: 'Dr.',
    },
    {
      id: 3,
      user: memberData[2],
      title: 'Dr.',
    },
    {
      id: 4,
      user: memberData[3],
      title: 'Dr.',
    },
  ];
  export const UImmunizationChartData = [
    {
      id: 1,
      name: servicesData[1].name,
      date: servicesData[1].date,
      status: 'Approved',
    },
    {
      id: 2,
      name: servicesData[2].name,
      date: servicesData[2].date,
      status: 'Pending',
    },
    {
      id: 3,
      name: servicesData[3].name,
      date: servicesData[3].date,
      status: 'Pending',
    },
    {
      id: 4,
      name: servicesData[4].name,
      date: servicesData[4].date,
      status: 'Pending',
    },
    {
      id: 5,
      name: servicesData[5].name,
      date: servicesData[5].date,
      status: 'Pending',
    },
    {
      id: 6,
      name: servicesData[6].name,
      date: servicesData[6].date,
      status: 'Pending',
    },
    {
      id: 7,
      name: servicesData[7].name,
      date: servicesData[7].date,
      status: 'Pending',
    },
    {
      id: 8,
      name: servicesData[8].name,
      date: servicesData[8].date,
      status: 'Pending',
    },
    {
      id: 9,
      name: servicesData[9].name,
      date: servicesData[9].date,
      status: 'Pending',
    },
    {
      id: 10,
      name: servicesData[10].name,
      date: servicesData[10].date,
      status: 'Pending',
    },
    {
      id: 11,
      name: servicesData[11].name,
      date: servicesData[11].date,
      status: 'Pending',
    },
  ];

  export const medicalRecodData = [
    {
      id: 1,
      date: '13, Jan 2021',
      data: [
        {
          id: 1,
          title: 'Doctor',
          value: '.......',
        },
        {
          id: 2,
          title: 'Service',
          value: '0 - 4 Weeks',
        },
        {
          id: 4,
          title: 'Description',
          value: '..',
        },
      ],
    },
  ];
  
  