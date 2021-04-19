import React from 'react';
import './Loading.css';

const Loading = () => (
  <div className="container d-flex justify-content-center spinner-container">
    <div className="row">
      <div
        className="spinner-border"
        style={{ width: '3rem', height: '3rem' }}
        role="status"
      />
    </div>
  </div>
);

export default Loading;
