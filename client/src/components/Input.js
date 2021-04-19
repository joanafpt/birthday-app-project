import React from 'react';
import './Input.css';

const Input = (props) => {
  const { type, placeholder, id, value, onChange, name } = props;
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="form-control mb-1"
      id={id}
      value={value}
      onChange={onChange}
      name={name}
    />
  );
};
export default Input;
