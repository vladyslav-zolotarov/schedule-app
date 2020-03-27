import React from 'react';
import {
  ALERT_SUCCESS,
  ALERT_DEFAULT,
  ALERT_ERROR,
} from '../../utils/alertContext';

const style = {
  color: 'white',
  borderRadius: 5,
  padding: '1rem',
  marginTop: '0.5rem',
};

export const Alert = ({ title, type }) => {
  if (type === ALERT_SUCCESS) {
    return <div style={{ backgroundColor: 'green', ...style }}>{title}</div>;
  }

  if (type === ALERT_ERROR) {
    return <div style={{ backgroundColor: 'red', ...style }}>{title}</div>;
  }

  if (type === ALERT_DEFAULT) {
    return <div style={{ backgroundColor: 'gray', ...style }}>{title}</div>;
  }

  throw new TypeError('Provided type to Alert component is wrong');
};
