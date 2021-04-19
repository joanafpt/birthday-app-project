import React from 'react';
import './SaveButton.css';

const SaveButton = (props) => {
  const { onClick, id, children } = props;
  return (
    <div className="container">
      <div className="row">
        <div className="col button-container">
          <button
            type="button"
            className="btn btn-primary"
            id={id}
            onClick={onClick}
          >
            {children}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveButton;
