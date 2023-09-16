import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import InputMask from 'react-input-mask';
import "react-datepicker/dist/react-datepicker.css";
import { parse, format } from 'date-fns';

interface InputProps {
  label: string;
  value: any | Date;
  id?: string;
  type?: string;
  updateValue(value: any | Date): void;
  placeholder?: string;
  mask?: string;
  className: any;
}

interface CalendarInputProps {
    label: string;
    value: Date | string | null;
    updateValue: (any: any) => void;
}

interface SelectProps {
    label: string;
    value: string;
    className: any;
    id?: string;
    updateValue(value: any): void;

}

export const Input = ({ label, value, id, type, placeholder, mask, className, updateValue }: InputProps) => {
  return (
    <div className={className} id={id}>
      <label>{label}</label>
      {mask ? (
        <InputMask
          mask={mask}
          placeholder={placeholder}
          type={type}
          value={value} 
          onChange={(e) => updateValue(e.target.value)} 
        />
      ) : (
        <input
          placeholder={placeholder}
          type={type} 
          value={value} 
          onChange={(e) => updateValue(e.target.value)} 
        />
      )}
    </div>
  );
};

export const DateInput = ({ label, value, id, placeholder, className, mask, updateValue }: InputProps) => {

  const NumberVerification = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;
    const numericValue = rawValue.replace(/\D/g, "");

    // const formattedValue = numericValue.replace(/^(\d{2})(\d{2})(\d{4})$/, "$1/$2/$3");

    updateValue(numericValue);
  };

  return (
    <div className={className} id={id}>
      <label>{label}</label>
      {mask ? (
        <InputMask
          mask={mask}
          placeholder={placeholder}
          value={value} 
          onChange={(e) => updateValue(e.target.value)} 
        />
      ) : (
        <input
          placeholder={placeholder}
          maxLength={placeholder ? placeholder.length : undefined}
          value={value} 
          onChange={NumberVerification} 
        />
      )}
    </div>
  );
};

export const NumberInput = ({ label, value, id, mask, placeholder, className, updateValue }: InputProps) => {
  const NumberVerification = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/\D/g, '');
    updateValue(numericValue);
  };

  return (
    <div className={className} id={id}>
      <label>{label}</label>
      {mask ? (
        <InputMask
          placeholder={placeholder}
          mask={mask}
          value={value} 
          onChange={NumberVerification} 
        />
      ) : (
        <input
          placeholder={placeholder}
          value={value} 
          onChange={NumberVerification} 
        />
      )}
    </div>
  );
};

export const Select = ({ label, updateValue, id, className, value}: SelectProps) => {
  return (
    <div className={`${className}`} id={id}>
      <label>{label}</label>
      <select onChange={(e) => updateValue(e.target.value)} value={value}>
        <option value="" />
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="nonbinary">Non-binary</option>
        <option value="others">Others</option>
      </select>
    </div>
  );
};

export const DatePickerInput: React.FC<CalendarInputProps> = ({
    label,
    value,
    updateValue,
  }) => {
    const [birthdate, updateBirthDate] = useState< Date | null>(null);

    const handleDateChange = (selectedDate: Date | null) => {
      if (selectedDate) {
        const formattedDate = format(selectedDate, "yyyy-MM-dd");
        const parsedDate = parse(formattedDate, "yyyy-MM-dd", new Date());
        updateValue(parsedDate);
        updateBirthDate(parsedDate);
      }
    };
    return (
      <div className="calendar-input">
        <label>{label}</label>
        <DatePicker
          selected={birthdate}
          placeholderText='00/00/0000'
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
        />
      </div>
    );
  };
