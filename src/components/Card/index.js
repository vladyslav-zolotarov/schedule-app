import React, { useContext, useState } from 'react';
import './style.scss';
import { FaTrashAlt } from 'react-icons/all';
import { userContext } from '../../utils/context';
import { useHistory } from 'react-router-dom';
import DateFilter from '../DateFilter';
import CustomModal from '../CustomModal';

export default function Card({ date }) {
  const { onSelectReportDay, removeTasksOfDate } = useContext(userContext);
  const history = useHistory();
  const [isModalOpen, setModalOpen] = useState(false);

  const onShow = () => {
    history.push(`report-day/${date}`);
    onSelectReportDay(date);
  };

  const removeCard = () => {
    setModalOpen(true);
  };

  const content = () => {
    return (
      <div className="card">
        <div className="card-content">
          <DateFilter date={date} className="card-head" />
          <div></div>
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
