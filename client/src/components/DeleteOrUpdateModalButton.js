import React from 'react';

const DeleteOrUpdateModalButton = (props) => {
  const { children, className, onClick } = props;

  return (
    <button
      type="button"
      className={className}
      id="save-changes-modal"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default DeleteOrUpdateModalButton;
