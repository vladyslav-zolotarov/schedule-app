import React, { useContext, useState, useEffect } from 'react';
import { userContext } from 'utils/context';
import TopBar from 'components/TopBar';
import AddButton from 'components/AddButton';
import ListOfTasks from './ListOfTasks';

import './style.scss';
import { ALERT_ERROR, ALERT_SUCCESS } from '../../utils/alertContext';
import { v4 } from 'uuid';

export default function SchedulePage() {
  const {
    selectedDay,
    addNewTask,
    alertFunctions: { createAlert },
  } = useContext(userContext);
  const [task, setTask] = useState({ time: '', action: '' });

  const handleAdd = () => {
    if (!task.time) {
      return createAlert({
        id: v4(),
        title: 'You must provide task time',
        alertType: ALERT_ERROR,
      });
    }
    if (!task.action) {
      return createAlert({
        id: v4(),
        title: 'You must provide task action',
        alertType: ALERT_ERROR,
      });
    }
    createAlert({
      id: v4(),
      title: 'Task successfully created',
      alertType: ALERT_SUCCESS,
    });
    addNewTask(task.time, task.action);

    setTask({ time: '', action: '' });
  };

  return (
    <div className="schedule-page">
      <TopBar text={'SchedulePage'} />
      <div className="schedule-main-content">
        <div className="schedule-text">{selectedDay}</div>
        <ListOfTasks task={task} setTask={setTask} />
        <AddButton onClick={handleAdd} />
      </div>
    </div>
  );
}
