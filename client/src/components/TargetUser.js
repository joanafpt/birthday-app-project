import React from 'react';
import './TargetUser.css';

const TargetUser = (props) => {
  const { children } = props;

  return (
    <div className="row target-user-identification">
      <div className="col">{children}</div>
    </div>
  );
};

export default TargetUser;
