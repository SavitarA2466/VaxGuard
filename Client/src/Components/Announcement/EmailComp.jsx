import React from 'react';
// Importing necessary components and libraries
import { Button, Input, Select, Textarea } from '../Form';
import { BiChevronDown } from 'react-icons/bi';
import Uploder from '../Uploader';
import { toast } from 'react-hot-toast';

// Initial data for the "Send To" dropdown
const sendToData = [
  {
    id: 1,
    name: 'All Patients',
    value: 'all',
  },
];

// Main functional component
function EmailComp({ data }) {
  // State variables for the component
  const [sendTo, setSendTo] = React.useState(sendToData[0].name);
  const [image, setImage] = React.useState(null);

  // useEffect to update state if `data` prop changes
  React.useEffect(() => {
    if (data?.id) {
      setSendTo(data.sendTo);
      setImage(data.image);
    }
  }, [data]); // Dependency array includes `data`

  return (
    <div className="flex flex-col gap-4 w-full mt-6">
      {/* Input field for the announcement title */}
      <Input
        label="Announcement Title"
        color={true}
        placeholder={data?.id && data?.title}
      />
      
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Dropdown for selecting "Send To" option */}
        <div className="flex flex-col w-full gap-3">
          <p className="text-sm">Send To</p>
          <Select
            selectedPerson={sendTo}
            setSelectedPerson={setSendTo}
            datas={sendToData}
          >
            {/* Display selected option with dropdown icon */}
            <div className="h-14 w-full text-xs text-main rounded-md bg-white border border-border px-4 flex items-center justify-between">
              <p>{sendTo}</p>
              <BiChevronDown className="text-xl" />
            </div>
          </Select>
        </div>
        
        {/* Input field for email subject */}
        <Input
          label="Email subject"
          color={true}
          placeholder={data?.id && data?.action?.subject}
        />
      </div>
      
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Input field for header */}
        <Input
          label="Header"
          color={true}
          placeholder={data?.id && data?.action?.header}
        />
        
        {/* Input field for sub-header */}
        <Input
          label="Sub-header"
          color={true}
          placeholder={data?.id && data?.action?.subHeader}
        />
      </div>
      
      {/* Textarea for message body */}
      <Textarea
        label="Message"
        placeholder={
          data?.id ? data?.action?.message : 'Dear patient ....'
        }
        color={true}
        rows={5}
      />
      
      {/* Uploader for optional image */}
      <div className="flex gap-3 flex-col col-span-6">
        <p className="text-sm">Image (option)</p>
        <Uploder />
      </div>
      
      {/* Send button, shows error toast when clicked */}
      {!data?.id && (
        <Button
          label={'Send Announcement'}
          onClick={() => {
            toast.error('This feature is not available yet');
          }}
        />
      )}
    </div>
  );
}

export default EmailComp;
