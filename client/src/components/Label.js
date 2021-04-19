import React from 'react';

const Label = (props) => {
  const { children } = props;
  return <p className="text-left">{children}</p>;
};

export default Label;
