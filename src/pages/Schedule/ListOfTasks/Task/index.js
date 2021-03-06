import React, { useContext, useEffect, useState } from 'react';
import './style.scss';
import 'components/TimePicker/style.scss';
import CustomModal from '../../../../components/CustomModal';
import {
  FaTrashAlt,
  FaPen,
  IoIosCheckmarkCircle,
  IoIosCloseCircle,
} from 'react-icons/all';

import { userContext } from 'utils/context';
import { v4 } from 'uuid';
import { ALERT_SUCCESS } from '../../../../utils/alertContext';

export default function Task({ id, task }) {
  const [actionValue, setActionValue] = useState('');
  const [timeValue, setTimeValue] = useState('');
  const [edit, setEdit] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const {
    removeTask,
    updateNewTask,
    alertFunctions: { createAlert },
  } = useContext(userContext);

  const time = task?.time;
  const action = task?.action;

  useEffect(() => {
    if (time && action) {
      setTimeValue(time);
      setActionValue(action);
    }
    //eslint-disable-next-line
  }, []);

  const alertShow = (title) => {
    return createAlert({
      id: v4(),
      title,
      alertType: ALERT_SUCCESS,
    });
  };

  const onUpdate = () => {
    updateNewTask(id, timeValue, actionValue);
    setEdit(false);
    alertShow('Successful update task');
  };

  const onRemove = (e) => {
    setModalOpen(true);
  };

  const handleCancel = () => {
    setActionValue(action);
    setTimeValue(time);
    setEdit(false);
  };

  const updateAndDelete = () => {
    return (
      <div className="action-butt-group-2">
        <button
          type="button"
          className="task-butt"
          onClick={() => setEdit(true)}
        >
          <FaPen />
        </button>
        <button
          type="submit"
          className="task-butt"
          onClick={(e) => onRemove(e)}
        >
          <FaTrashAlt />
        </button>
      </div>
    );
  };

  const acceptAndDelete = () => {
    return (
      <div className="action-butt-group-1">
        <button type="button" className="task-butt" onClick={onUpdate}>
          <IoIosCheckmarkCircle />
        </button>
        <button type="submit" className="task-butt" onClick={handleCancel}>
          <IoIosCloseCircle />
        </button>
      </div>
    );
  };

  if (edit) {
    return (
      <form className="task-main-content">
        <div className="time-picker">
          <input
            value={timeValue}
            onChange={(e) => setTimeValue(e.target.value)}
            className="input-picker"
            type="time"
          />
        </div>
        <input
          value={actionValue}
          onChange={(e) => setActionValue(e.target.value)}
          className="task-input"
          type="text"
          placeholder="Input task"
        />
        {acceptAndDelete()}
      </form>
    );
  }
  return (
    <div className="task-main-content">
      <div className="task-time-value">{timeValue}</div>
      <div className="task-action-value">{actionValue}</div>
      {updateAndDelete()}
      <CustomModal
        open={isModalOpen}
        id={id}
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        nameFunction={removeTask}
        title={'Successful delete task'}
      />
    </div>
  );
}
