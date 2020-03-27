import React, { useContext, useEffect } from 'react';
import './style.scss';
import { FaTrashAlt } from 'react-icons/all';
import { userContext } from '../../utils/context';
import { useHistory } from 'react-router-dom';

export default function Card({ task }) {
  const date = task?.date;
  const { onSelectReportDay, removeTasksOfDate } = useContext(userContext);
  const history = useHistory();

  const onShow = () => {
    history.push(`report-day/${date}`);
    onSelectReportDay(date);
  };

  const removeCard = () => {
    removeTasksOfDate(date);
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
