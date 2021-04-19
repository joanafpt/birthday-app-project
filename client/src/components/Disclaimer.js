import React from 'react';
import './Disclaimer.css';

const Disclaimer = (props) => {
  const { children } = props;
  return <article className="disclaimer">{children}</article>;
};

export default Disclaimer;
