import React from 'react';
import { Alert } from '../Alert';

const wrapper = {
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  right: '5%',
  bottom: '5%',
  zIndex: 9999,
};

const AlertBox = ({ alerts }) => {
  return (
    <div style={wrapper}>
      {alerts.map((a) => (
        <Alert key={a.id} id={a.id} title={a.title} type={a.type} />
      ))}
    </div>
  );
};

export default AlertBox;