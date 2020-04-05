import React from 'react';
import { Alert } from '../Alert';

const wrapper = {
  display: 'flex',
  flexDirection: 'column',
  position: 'fixed',
  right: '5%',
  bottom: '5%',
  zIndex: 9999,
};

const AlertBox = ({ alerts }) => {
  const newAlerts = alerts.slice(0, 3);
  return (
    <div style={wrapper}>
      {newAlerts.map((a) => (
        <Alert key={a.id} id={a.id} title={a.title} type={a.type} />
      ))}
    </div>
  );
};

export default AlertBox;
