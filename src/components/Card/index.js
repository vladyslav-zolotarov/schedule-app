import React, { useContext } from 'react';
import './style.scss';
import { FaTrashAlt } from 'react-icons/all';
import { userContext } from '../../utils/context';
import { useHistory } from 'react-router-dom';
import { v4 } from 'uuid';
import { ALERT_SUCCESS } from '../../utils/alertContext';

export default function Card({ task }) {
  const date = task?.date;
  const {
    onSelectReportDay,
    removeTasksOfDate,
    alertFunctions: { createAlert },
  } = useContext(userContext);
  const history = useHistory();

  const alertShow = (title) => {
    return createAlert({
      id: v4(),
      title,
      alertType: ALERT_SUCCESS,
    });
  };

  const onShow = () => {
    history.push(`report-day/${date}`);
    onSelectReportDay(date);
  };

  const removeCard = () => {
    removeTasksOfDate(date);
    alertShow('Successful delete card with tasks');
  };

  const content = () => {
    return (
      <div className="card">
        <div className="card-content">
          <h3 className="card-head">{date}</h3>
          <div>
            {/*<div>*/}
            {/*  <p>Tasks: 0</p>*/}
            {/*  <p style={{ color: 'grey', fontSize: '13px' }}>*/}
            {/*    From 07:00 to 22:00*/}
            {/*  </p>*/}
            {/*</div>*/}
          </div>
        </div>
        <div className="card-footer">
          <div className="card-butt-1">
            <button className="card-butt" onClick={onShow}>
              Show
            </button>
            <button className="card-butt">Print</button>
          </div>
          <div className="card-butt-2">
            <button className="card-butt-remove" onClick={removeCard}>
              <FaTrashAlt />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return <>{content()}</>;
}
