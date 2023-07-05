import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface InputProps {
  label: string;
  value: any | Date;
  updateValue(value: any | Date): void;
}

interface CalendarInputProps {
    label: string;
    value: Date;
    updateValue: (date: Date) => void;
}

interface SelectProps {
    label: string;
    value: string;
    className: any;
    updateValue(value: any): void;

}

export const Input = ({ label, value, updateValue }: InputProps) => {
  return (
    <div className='standard-input'>
      <label>{label}</label>
      <input value={value} onChange={(e) => updateValue(e.target.value)} />
    </div>
  );
};

export const NumberInput = ({ label, value, updateValue }: InputProps) => {
  const NumberVerification = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/\D/g, '');
    updateValue(numericValue);
  };

  return (
    <div className='standard-input'>
      <label>{label}</label>
      <input value={value} onChange={NumberVerification} />
    </div>
  );
};

export const Select = ({ label, updateValue, className}: SelectProps) => {
  return (
    <div className={`${className}`}>
      <label>{label}</label>
      <select onChange={(e) => updateValue(e.target.value)}>
        <option value="" />
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="nonbinary">Non-binary</option>
        <option value="others">Others</option>
      </select>
    </div>
  );
};

export const CalendarInput: React.FC<CalendarInputProps> = ({
    label,
    value,
    updateValue,
  }) => {
    return (
      <div className="calendar-input">
        <label>{label}</label>
        <DatePicker
          selected={value}
          onChange={(date: any) => updateValue(date)}
          dateFormat="dd/MM/yyyy"
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
        />
      </div>
    );
  };