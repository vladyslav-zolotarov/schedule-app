import React, { useContext } from 'react';
import Task from './Task';
import './style.scss';
import { userContext } from 'utils/context';
import NewTask from './NewTask';

export default function ListOfTasks({ task, setTask }) {
  const { selectedDay, tasks } = useContext(userContext);

  const gotTasks = tasks.gotTask;

  const content = gotTasks.map((task, index) => {
    if (task.date === selectedDay) {
      return (
        <li key={index}>
          <Task id={task.id} task={task} />
        </li>
      );
    } else return null;
  });

  return (
    <ul className="list-of-task-main-content">
      {content}
      <li>
        <NewTask task={task} setTask={setTask} />
      </li>
    </ul>
  );
}
