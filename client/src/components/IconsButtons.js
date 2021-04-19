import React from 'react';
import './IconsButtons.css';

const IconsButtons = (props) => {
  const { children, onClick, dataToggle, dataTarget } = props;
  return (
    <button
      type="button"
      className="button-class"
      onClick={onClick}
      data-toggle={dataToggle}
      data-target={dataTarget}
    >
      {children}
    </button>
  );
};

export default IconsButtons;
