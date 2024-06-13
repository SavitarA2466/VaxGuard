import { Listbox, Menu, Switch } from "@headlessui/react";
import React from "react";
import { BiLoaderCircle } from "react-icons/bi";
import DatePicker from "react-datepicker";
import { FaCheck } from "react-icons/fa";

export function Input({
  label,
  name,
  type,
  color,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div className="w-full text-sm">
      <label
        className={`${
          color ? "text-black text-sm" : "text-white font-semibold"
        } `}
      >
        {label}
      </label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full bg-transparent text-sm mt-3 p-4 border ${
          color ? "border-border font-light" : "border-white text-white"
        } rounded-lg focus:border focus:border-subMain`}
      />
    </div>
  );
}

// button

export function Button({ label, onClick, loading, Icon }) {
  return (
    <button
      disabled={loading}
      onClick={onClick}
      className={`w-full flex-rows gap-4 hover:opacity-80 transitions bg-subMain text-white text-sm font-medium px-2 py-4 rounded`}
    >
      {loading ? (
        <BiLoaderCircle className="text-2xl text-white animate-spin" />
      ) : (
        <>
          {label}
          {Icon && <Icon className="text-xl text-white" />}
        </>
      )}
    </button>
  );
}

// select

export function MenuSelect({ children, datas, item }) {
  return (
    <div className="relative w-full text-sm">
      <Menu>
        <Menu.Button>{children}</Menu.Button>
        <Menu.Items className="absolute left-0 z-50 flex flex-col gap-4 px-6 py-4 bg-white rounded-md shadow-lg ring-1 ring-border focus:outline-none">
          {datas.map((menuItem, index) => (
            <button
              onClick={() => item && item.id && menuItem.onClick(item.id)} // Check if item is defined and has an id property before accessing it
              key={index}
              className={`flex gap-4 items-center hover:text-subMain`}
            >
              {menuItem.icon && (
                <menuItem.icon className="text-md text-subMain" />
              )}
              {menuItem.title}
            </button>
          ))}
        </Menu.Items>
      </Menu>
    </div>
  );
}

// select 2

export function Select({
  children,
  selectedPerson,
  setSelectedPerson,
  datas = [],
}) {
  // Ensure datas is an array
  const options = Array.isArray(datas) ? datas : [];

  return (
    <div className="relative w-full text-sm">
      <div className="w-full">
        <Listbox value={selectedPerson} onChange={setSelectedPerson}>
          <Listbox.Button className="w-full px-3 py-2 text-left bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            {selectedPerson ? selectedPerson.name : "Select an option"}
          </Listbox.Button>
          <Listbox.Options className="absolute left-0 z-50 flex flex-col w-full gap-2 px-4 py-2 bg-white rounded-md shadow-lg top-10 ring-1 ring-black ring-opacity-5 focus:outline-none">
            {options.map((person) => (
              <Listbox.Option
                className={({ active }) =>
                  `cursor-pointer select-none relative py-2 pl-10 pr-4 ${
                    active ? "bg-blue-100 text-blue-900" : "text-gray-900"
                  }`
                }
                key={person.id}
                value={person}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {person.name}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                        ✓
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
      </div>
    </div>
  );
}

// switch

export function Switchi({ checked, onChange }) {
  return (
    <Switch
      checked={checked}
      onChange={onChange}
      className={`${checked ? "bg-subMain" : "bg-border"}
        relative inline-flex p-[2px] w-12 cursor-pointer rounded-full transitions`}
    >
      <span
        aria-hidden="true"
        className={`${checked ? "translate-x-5" : "translate-x-0"}
          pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg  transitions`}
      />
    </Switch>
  );
}

// textarea

export function Textarea({ label, name, placeholder, rows, value, onChange }) {
  return (
    <div className="w-full text-sm">
      <label className={"text-black text-sm"}>{label}</label>
      <textarea
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`focus:border-subMain w-full bg-transparent text-sm mt-3 p-4 border border-border rounded font-light 
         `}
      />
    </div>
  );
}

// date picker

export function DatePickerComp({ label, startDate, onChange }) {
  return (
    <div className="w-full text-sm">
      <label className={"text-black text-sm"}>{label}</label>
      <DatePicker
        selected={startDate}
        onChange={onChange}
        className="w-full p-4 mt-3 text-sm font-light bg-transparent border rounded-lg border-border focus:border focus:border-subMain"
      />
    </div>
  );
}

// time picker

export function TimePickerComp({ label, startDate, onChange }) {
  return (
    <div className="w-full text-sm">
      <label className={"text-black text-sm"}>{label}</label>
      <DatePicker
        selected={startDate}
        onChange={onChange}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={30}
        timeCaption="Time"
        dateFormat="h:mm aa"
        className="w-full p-4 mt-3 text-sm font-light bg-transparent border rounded-lg border-border focus:border focus:border-subMain"
      />
    </div>
  );
}

// checkbox

export function Checkbox({ label, name, onChange, checked }) {
  return (
    <div className="flex flex-row items-center w-full text-sm">
      {/* design checkbox */}
      <label className="relative cursor-pointer flex-colo">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          className="absolute w-0 h-0 opacity-0"
        />
        <span
          className={` border rounded  w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 ${
            checked ? "border-subMain bg-subMain" : "border-gray-300 bg-white"
          }`}
        >
          <FaCheck
            className={`text-[10px] ${checked ? "block text-white" : "hidden"}`}
          />
        </span>
      </label>

      {label && <p className={"text-black text-xs ml-2"}>{label}</p>}
    </div>
  );
}

// from to date picker

export function FromToDate({ label, startDate, onChange, endDate, bg }) {
  return (
    <div className="flex flex-col w-full gap-2 text-sm">
      {label && <label className={"text-black text-sm"}>{label}</label>}
      <DatePicker
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={onChange}
        className={`w-full ${
          bg ? bg : "bg-transparent"
        }  text-xs px-4 h-14 border border-border text-main font-normal rounded-lg focus:border focus:border-subMain`}
      />
    </div>
  );
}
