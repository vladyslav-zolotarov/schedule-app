import React, { useContext, useState } from 'react';
import { userContext } from 'utils/context';
import TopBar from 'components/TopBar';
import AddButton from 'components/AddButton';
import ListOfTasks from './ListOfTasks';

import './style.scss';

export default function SchedulePage() {
  const { selectedDay, addNewTask } = useContext(userContext);
  const [task, setTask] = useState({ time: '', action: '' });

  const handleAdd = () => {
    if (!task.time) {
      return console.log('puts time ');
    }
    if (!task.action) {
      return console.log('puts action ');
    }
    console.log(task.time, task.action);
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
