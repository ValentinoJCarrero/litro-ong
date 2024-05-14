import React, { useState } from 'react';
import { Field, ErrorMessage } from 'formik';
import warningIcon from '../../assets/IconWarrning.svg';
interface CustomFieldProps {
  name: string;
  placeholder: string;
  type?: string;
  errors: Record<string, string | undefined>;
  touched: Record<string, boolean | undefined>;
}
const CustomField: React.FC<CustomFieldProps> = ({ name, placeholder, type = 'text', errors, touched }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="font-medium my-2">{placeholder}</label>
      <div className="flex w-full relative">
        <Field
          type={type}
          name={name}
          placeholder={placeholder}
          className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline focus-visible:text-textTertiary ${errors[name] && touched[name] ? 'border-warningBorder text-warningText font-medium focus-visible:outline-warningBorder focus-visible:border-warningBorder' : ''} ${isFocused ? ' border-[1.5px]' : ''}`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <div className={`flex justify-center items-center rounded-r-md px-4 bg-white border-backgroundGrey border border-l-transparent ${errors[name] && touched[name] ? 'border-warningBorder text-warningText font-medium ' : ''} ${isFocused ? ' outline-warningBorder border-[1.5px]' : ''}`}>
          <img src={warningIcon.src} alt="warningIcon" className={`${errors[name] && touched[name] ? 'block' : 'hidden'}`} />
        </div>
      </div>
      <ErrorMessage name={name} component="span" className="text-warning" />
    </div>
  );
};

export default CustomField;