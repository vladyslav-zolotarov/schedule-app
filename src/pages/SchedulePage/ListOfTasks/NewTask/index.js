import React from 'react';
import './style.scss';

export default function NewTask({ task, setTask }) {
  const handleAddTime = (e) => {
    setTask({ ...task, time: e.target.value });
  };

  const handleAddAction = (e) => {
    setTask({ ...task, action: e.target.value });
  };

  return (
    <form className="new-task-main-content">
      <div className="new-time-picker">
        <input
          value={task?.time || ''}
          onChange={handleAddTime}
          className="input-picker"
          type="time"
        />
      </div>
      <input
        value={task?.action || ''}
        onChange={handleAddAction}
        className="new-task-input"
        type="text"
        placeholder="Input task"
      />
    </form>
  );
}
