import React, { useContext, useState } from 'react';
import './style.scss';
import { FaTrashAlt } from 'react-icons/all';
import { userContext } from '../../utils/context';
import { useHistory } from 'react-router-dom';
import { v4 } from 'uuid';
import { ALERT_SUCCESS } from '../../utils/alertContext';
import DateFilter from '../DateFilter';
import CustomModal from '../CustomModal';

export default function Card({ date }) {
  const {
    onSelectReportDay,
    removeTasksOfDate,
    alertFunctions: { createAlert },
  } = useContext(userContext);
  const history = useHistory();
  const [isModalOpen, setModalOpen] = useState(false);

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
    setModalOpen(true);

    // removeTasksOfDate(date);
    // alertShow('Successful delete card with tasks');
  };

  const content = () => {
    return (
      <div className="card">
        <div className="card-content">
          <DateFilter date={date} className="card-head" />
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

  return (
    <>
      {content()}
      <CustomModal
        open={isModalOpen}
        id={date}
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        nameFunction={removeTasksOfDate}
        title={'Successful delete card of date'}
      />
    </>
  );
}
