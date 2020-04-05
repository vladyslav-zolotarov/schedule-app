import React, { useContext, useState } from 'react';
import { userContext } from 'utils/context';
import { FaPlusCircle } from 'react-icons/fa';
import TopBar from 'components/TopBar';
import AddButton from 'components/AddButton';
import ListOfTasks from './ListOfTasks';

import './style.scss';
import { ALERT_ERROR, ALERT_SUCCESS } from '../../utils/alertContext';
import { v4 } from 'uuid';
import DateFilter from '../../components/DateFilter';

export default function SchedulePage() {
  const {
    selectedDay,
    addNewTask,
    alertFunctions: { createAlert },
  } = useContext(userContext);
  const [time, setTime] = useState('');
  const [action, setAction] = useState('');

  const handleAdd = () => {
    if (!action && !time) {
      return createAlert({
        id: v4(),
        title: 'You must provide task action and task time',
        alertType: ALERT_ERROR,
      });
    }
    if (!time) {
      return createAlert({
        id: v4(),
        title: 'You must provide task time',
        alertType: ALERT_ERROR,
      });
    }
    if (!action) {
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

    addNewTask(time, action);

    setTime('');
    setAction('');
  };

  return (
    <div className="schedule-page">
      <TopBar text={'SchedulePage'} />
      <div className="schedule-main-content">
        <DateFilter className="schedule-text" date={selectedDay} />
        <ListOfTasks
          action={action}
          time={time}
          setTime={setTime}
          setAction={setAction}
        />
        <AddButton leftIcon={<FaPlusCircle />} onClick={handleAdd}>
          Add new
        </AddButton>
      </div>
    </div>
  );
}
