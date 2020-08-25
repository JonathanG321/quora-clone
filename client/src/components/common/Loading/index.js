import React from 'react';
import Fa from '../Fa';
import './styles.css';

function Loading() {
  return (
    <div className="d-flex justify-content-center loading">
      <Fa kind="spinner" size="5x" pulse={true} />
    </div>
  );
}

export default Loading;
