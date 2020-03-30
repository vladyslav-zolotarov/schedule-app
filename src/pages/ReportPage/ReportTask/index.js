import React, { useContext } from 'react';

import './style.scss';

import { userContext } from '../../../utils/context';
import TopBar from '../../../components/TopBar';
import { FaTrashAlt } from 'react-icons/all';

export default function ReportTask() {
  const { tasks, removeTask, selectedReportDay } = useContext(userContext);

  const gotTasks = tasks.gotTask;

  const contentTable = gotTasks?.map((tasks, index) => {
    if (
      tasks.date === selectedReportDay &&
      tasks.task.time !== '' &&
      tasks.task.action !== ''
    ) {
      return (
        <tr key={index}>
          <td>{tasks?.task?.time}</td>
          <td>{tasks?.task?.action}</td>
          <td>
            <button
              className="report-page-butt"
              onClick={() => removeTask(tasks.id)}
            >
              <FaTrashAlt />
            </button>
          </td>
        </tr>
      );
    } else return null;
  });

  return (
    <div className="report-page">
      <TopBar text={'ReportPage'} />
      <div className="report-task-main-content">
        <table className="report-table">
          <thead>
            <tr>
              <th colSpan="3">
                <h3>{selectedReportDay}</h3>
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
