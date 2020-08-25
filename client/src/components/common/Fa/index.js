import React from 'react';
import classnames from 'classnames';

function Fa(props) {
  const { kind, spin = false, pulse = false, size = false, color = 'black' } = props;
  return (
    <i
      style={{ color: color }}
      className={classnames(`fa fa-${kind}`, {
        'fa-spin': spin,
        [`fa-${size}`]: size,
        'fa-pulse': pulse,
      })}
    ></i>
  );
}

export default Fa;
