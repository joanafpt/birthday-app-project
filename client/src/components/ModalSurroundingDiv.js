import React from 'react';

const ModalSurroundingDiv = (props) => {
  const { children, id } = props;
  return (
    <div
      className="modal fade"
      id={id}
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      {children}
    </div>
  );
};

export default ModalSurroundingDiv;
