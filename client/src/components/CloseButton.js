import React from 'react';

const CloseButton = (props) => {
  const { children, className, onClick } = props;

  return (
    <button
      type="button"
      className={className}
      data-dismiss="modal"
      aria-label="Close"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default CloseButton;
