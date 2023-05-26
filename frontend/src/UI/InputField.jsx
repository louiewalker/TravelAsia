import React from 'react';

const InputField = ({
  value,
  type,
  placeholder,
  error,
  onHandleChange,
  name,
  helpertext,
  onBlur,
}) => {

  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onHandleChange}
        value={value}
        onBlur={onBlur}
        
      />
      
      {error && <small className="error">{helpertext}</small>}
    </>
  );
};

export default InputField;
