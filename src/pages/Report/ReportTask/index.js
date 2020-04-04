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

  const sortedTasks = tasks.sort((a, b) => {
    const newATime = a?.time.split(':');
    const newBTime = b?.time.split(':');

    const dateA = [
      new Date(a.date).getFullYear(),
      new Date(a.date).getMonth(),
      new Date(a.date).getDate(),
    ];
    const dateB = [
      new Date(b.date).getFullYear(),
      new Date(b.date).getMonth(),
      new Date(b.date).getDate(),
    ];

    return new Date(dateA[0], dateA[1], dateA[2], newATime[0], newATime[1]) >
      new Date(dateB[0], dateB[1], dateB[2], newBTime[0], newBTime[1])
      ? 1
      : -1;
  });

  const contentTable = sortedTasks?.map((tasks, index) => {
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
