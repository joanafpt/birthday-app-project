import React from 'react';

const ModalTitle = (props) => {
  const { children } = props;
  return (
    <h6 className="modal-title" id="exampleModalCenterTitle">
      {children}
    </h6>
  );
};
export default ModalTitle;
