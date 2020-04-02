import React from 'react';
import './style.scss';

export default function NewTask({ action, time, setTime, setAction }) {
  const handleAddTime = (e) => {
    setTime(e.target.value);
  };

  const handleAddAction = (e) => {
    setAction(e.target.value);
  };

  return (
    <form className="new-task-main-content">
      <div className="new-time-picker">
        <input
          value={time || ''}
          onChange={handleAddTime}
          className="input-picker"
          type="time"
        />
      </div>
      <input
        value={action || ''}
        onChange={handleAddAction}
        className="new-task-input"
        type="text"
        placeholder="Input task"
      />
    </form>
  );
}
