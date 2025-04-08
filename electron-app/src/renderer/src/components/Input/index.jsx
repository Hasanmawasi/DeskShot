import React from 'react';
import "./style.css";

const InputField = ({ type = "text", placeholder, value, onChange,style ,label , container="" }) => {
    return (
    <div className={`flex flex-col justify-center align-center flex-start ${container}`}>
        <label className='label'>
         {label}
        </label>
     <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`input-field ${style}`}
    />
     </div>
    );
};



export default InputField;
