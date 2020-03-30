import React, { useContext, useCallback } from 'react';
import Task from './Task';
import './style.scss';
import { userContext } from 'utils/context';
import NewTask from './NewTask';

export default function ListOfTasks({ task, setTask }) {
  const { selectedDay, tasks } = useContext(userContext);

  const content = useCallback(() => {
    return tasks?.map((task) => {
      if (task.date === selectedDay) {
        return (
          <li key={task.id}>
            <Task id={task.id} task={task} />
          </li>
        );
      }
    });
  }, [selectedDay, tasks]);

  return (
    <ul className="list-of-task-main-content">
      {content()}
      <li>
        <NewTask task={task} setTask={setTask} />
      </li>
    </ul>
  );
}
