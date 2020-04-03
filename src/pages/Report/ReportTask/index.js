import React, { useContext, useEffect, useState } from 'react';

import './style.scss';

import { userContext } from '../../../utils/context';
import TopBar from '../../../components/TopBar';
import { FaTrashAlt } from 'react-icons/all';
import { useHistory } from 'react-router-dom';
import DateFilter from '../../../components/DateFilter';
import CustomModal from '../../../components/CustomModal';

export default function ReportTask() {
  const { tasks, removeTask, selectedReportDay } = useContext(userContext);
  const [isModalOpen, setModalOpen] = useState(false);
  const history = useHistory();

  const contentTable = tasks?.map((tasks, index) => {
    if (
      tasks?.date === selectedReportDay &&
      tasks?.time !== '' &&
      tasks?.action !== ''
    ) {
      return (
        <tr key={index}>
          <td>{tasks?.time}</td>
          <td>{tasks?.action}</td>
          <td>
            <button
              className="report-page-butt"
              onClick={() => setModalOpen(true)}
            >
              <FaTrashAlt />
            </button>
          </td>
          <CustomModal
            open={isModalOpen}
            id={tasks.id}
            isModalOpen={isModalOpen}
            setModalOpen={setModalOpen}
            nameFunction={removeTask}
            title={'Successful delete task'}
          />
        </tr>
      );
    } else return null;
  });

  useEffect(() => {
    if (contentTable.find((t) => t !== null) === undefined) {
      setTimeout(() => {
        return history.push('/report');
      }, 200);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks]);

  return (
    <div className="report-page">
      <TopBar text={'ReportPage'} />
      <div className="report-task-main-content">
        <table className="report-table">
          <thead>
            <tr>
              <th colSpan="3">
                <DateFilter date={selectedReportDay} />
              </th>
            </tr>
            <tr>
              <th>Time</th>
              <th>What to do</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{contentTable}</tbody>
        </table>
      </div>
    </div>
  );
}
